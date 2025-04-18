using FluentScheduler;
using MC.Core;
using MC.WebApp.Core;
using MC.WebApp.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class SapJobRegistry : Registry
    {
        #region Consts
        public const string SAP_JOB_TIMER_KEY = "vpossystem_sap_job_timer";
        #endregion
        #region Instance
        private static object _lock = new object();
        private static volatile bool _isInited = false;
        public static void Init()
        {
            if (_isInited) return;
            lock (_lock)
            {
                if (_isInited) return;
                var registry = new SapJobRegistry();
                JobManager.Initialize(registry);
                _isInited = true;
            }
        }
        #endregion
        public SapJobRegistry()
        {
            var timer = VposSystemModule.Settings
                                           .GetInt(SAP_JOB_TIMER_KEY)
                                           .If(i => !i.HasValue, x => x = 8 * 60)
                                           .If(i => i < 60, x => x = 8 * 60)
                                           .Value;

            Schedule(saveSapData).ToRunNow()
                                 .AndEvery(timer)
                                 .Minutes();
        }

        public void saveSapData()
        {
            #region Sap Settings Kontrolü
            var settings = SettingsManager.GetSettings(VposSystemModule.ModuleCodeName);
            bool IsSapActive = settings.GetBool("key_module_sap_update") ?? true;
            if (!IsSapActive) return;
            #endregion

            SapManager.Instance.GetSapCustomers((customers) =>
            {
                //UserList
                var userList = DbManager.CustomerManager.GetUsers();

                Parallel.ForEach(customers, user =>
                {
                    //User ve UserProfile Kaydı
                    DbManager.CustomerManager.SapCustomerControlAndAdd(userList.Response, user);
                });
            });
        }


    }
}