using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public enum eBankCode
    {
        [Description("str_ziraatbankasi")]
        ZiraatBankasi    = 10,

        [Description("str_halk_bankasi")]
        HalkBankasi      = 12,

        [Description("str_vakif_bankasi")]
        VakifBankasi     = 15,

        [Description("str_ekonomi_bankasi")]
        EkonomiBankasi   = 32,

        [Description("str_akbank")]
        Akbank           = 46,

        [Description("str_seker_bank")]
        SekerBank        = 59,

        [Description("str_garanti_bankasi")]
        GarantiBankasi    = 62,

        [Description("str_is_bankasi")]
        IsBankasi         = 64,

        [Description("str_yapi_kredi_bankasi")]
        YapiKrediBankasi  = 67,

        [Description("str_city_bank")]
        CityBank          = 92,

        [Description("str_turkish_bank")]
        TurkishBank       = 96,

        [Description("str_ing_bank")]
        IngBank           = 99,

        [Description("str_millennium_bank")]
        MillenniumBank    = 103,

        [Description("str_turk_land")]
        TurkLand          = 108,

        [Description("str_finans_bank")]
        FinansBank        = 111,

        [Description("str_hsbc")]
        Hsbc              = 123,

        [Description("str_euro_bank")]
        EuroBank          = 125,

        [Description("str_deniz_bank")]
        DenizBank         = 134,

        [Description("str_anadolu_bank")]
        AnadoluBank       = 135,

        [Description("str_al_baraka")]
        AlBaraka          = 203,

        [Description("str_kuveyt_turk")]
        KuveytTurk        = 205,


        [Description("str_finans_katilim_bankasi")]
        FinansKatilim     = 206,
        [Description("str_garanti_tami")]
        Tami = 207,
    }
}