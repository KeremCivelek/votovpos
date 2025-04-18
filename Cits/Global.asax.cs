using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using MC.WebApp.Core;

[assembly: PreApplicationStartMethod(typeof(Cits.Global), "PreInitialize")]

namespace Cits
{
    public class Global : aHttpApplication
    {
        public static void PreInitialize()
        {
            ModuleManager.Init(typeof(Cits.Global).Assembly);
        }
    }
}