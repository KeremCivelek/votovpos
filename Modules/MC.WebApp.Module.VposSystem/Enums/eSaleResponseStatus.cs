using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public enum eSaleResponseStatus
    {
        Error           = 0,
        Success         = 1,
        RedirectURL     = 2,
        RedirectHTML    = 3,
    }
}