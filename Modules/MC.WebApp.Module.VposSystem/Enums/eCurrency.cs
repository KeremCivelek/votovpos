using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public enum eCurrency
    {
        [Description("TRY")]
        TRY         = 949,
        [Description("USD")]
        USD         = 840,
        [Description("EUR")]
        EUR         = 978,
        [Description("GBP")]
        GBP         = 826,
        [Description("JPY")]
        JPY         = 392,
        [Description("RUB")]
        RUB         = 643,
    }
}