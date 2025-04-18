using MC.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Installer
{
    internal static class Install
    {
        internal static void InstallModule()
        {
            var sqlList = new List<string>()
            {
                v1_0_0.ToSql(),
            };


            using (var db = new MCDb())
            {
                foreach (var sql in sqlList)
                {
                    db.Execute(sql);
                }
            }
        }
        internal static void Upgrade(Version oldVersion, Version newVersion)
        {
            InstallModule();
        }
    }
}