using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MC.WebApp.Common;
using MC.WebApp.Core;
using MC.WebApp.Models.ModuleManager;

namespace MC.WebApp.Module.VposSystem
{
    public class VposSystemModule : aMCWebAppModule
    {
        #region Consts
        public const string ModuleCodeName = "key_module_vpossystem";
        public const string PERMISSION_DASHBOARD = "key_module_vpossystem_dashboard";
        #endregion
        #region Static Properties
        public static SettingsManager Settings { get; private set; }
        public static EnumerationManager Enumeration { get; private set; }
        public static ModuleModel ThisModule
        {
            get
            {
                var module = ModuleManager.Modules.FirstOrDefault(f => f.ModuleStarter.CodeName == ModuleCodeName);
                return module;
            }
        }
        #endregion
        #region Overrides
        public override bool AutoInstall => false;
        public override bool IsManageable => true;
        public override string CodeName => ModuleCodeName;
        public override string ModuleName => "Sanal POS Sistemi Modülü";
        #endregion
        #region Override Startup
        public override void Start()
        {
            Settings = SettingsManager.GetSettings(ModuleCodeName);
            Enumeration = EnumerationManager.GetManager(ModuleCodeName);
            SapJobRegistry.Init();
            base.Start();
        }
        #endregion

        #region Override Install / Upgrade / etc....
        public override void OnInstall()
        {
            Installer.Install.InstallModule();
            base.OnInstall();
        }

        public override void OnUpgrade(Version oldVersion, Version newVersion)
        {
            Installer.Install.Upgrade(oldVersion, newVersion);
            base.OnUpgrade(oldVersion, newVersion);
        }

        #endregion
        #region Localizations
        public override object LocalizationData
        {
            get
            {
                return new
                {
                    str_id = "Id",
                    str_required = "Gerekli",
                    key_module_vpossystem = "VPos Sistemi",
                    key_module_vpossystem_dashboard = "VPos sistemi anasayfa",
                    msg_invalid_token_or_id_number = "Token veya Sicil Numaraınız Boş veya Hatalı Olabilir, Lütfen Kontrol Ediniz.",
                    str_ziraatbankasi = "T.C. ZİRAAT BANKASI A.Ş.",
                    str_halk_bankasi = "T. HALK BANKASI A.Ş.",
                    str_vakif_bankasi = "T. VAKIFLAR BANKASI T.A.O.",
                    str_ekonomi_bankasi = "TÜRK EKONOMİ BANKASI A.Ş.",
                    str_akbank = "AKBANK T.A.Ş.",
                    str_seker_bank = "ŞEKERBANK T.A.Ş.",
                    str_garanti_bankasi = "T. GARANTİ BANKASI A.Ş.",
                    str_is_bankasi = "T. İŞ BANKASI A.Ş.",
                    str_yapi_kredi_bankasi = "YAPI ve KREDİ BANKASI A.Ş.",
                    str_city_bank = "CITIBANK A.Ş.",
                    str_turkish_bank = "TURKISH BANK A.Ş.",
                    str_ing_bank = "ING BANK A.Ş.",
                    str_millennium_bank = "MILLENNIUM BANK A.Ş.",
                    str_turk_land = "TURKLAND BANK A.Ş.",
                    str_finans_bank = "QNB FİNANS BANK A.Ş.",
                    str_hsbc = "HSBC BANK A.Ş.",
                    str_euro_bank = "EUROBANK TEKFEN A.Ş.",
                    str_deniz_bank = "DENİZBANK A.Ş.",
                    str_anadolu_bank = "ANADOLUBANK A.Ş.",
                    str_al_baraka = "ALBARAKA TÜRK KATILIM BANKASI A.Ş.",
                    str_kuveyt_turk = "KUVEYT TÜRK KATILIM BANKASI A.Ş.",
                    str_finans_katilim_bankasi = "TÜRKİYE FİNANS KATILIM BANKASI A.Ş.",
                };
            }
        }
        #endregion
    }
}