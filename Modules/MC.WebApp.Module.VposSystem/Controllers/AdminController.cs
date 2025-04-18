using MC.WebApp.Common;
using MC.WebApp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    [Admin]
    public class AdminController : aBaseController
    {
        [MCAuthorize(VposSystemModule.PERMISSION_DASHBOARD,ePermission.Read)]
        public ActionResult Index(string lang)
        {
            return View();
        }
    }
}