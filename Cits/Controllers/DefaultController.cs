using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MC.WebApp.Core;

namespace Cits.Controllers
{
    [AllowAnonymous]
    public class DefaultController : aBaseController
    {
        public ActionResult Index(int id = 0, string lang = "")
        {
            return View();
        }

        public PartialViewResult Header(string lang)
        {
            return PartialView();
        }

        public PartialViewResult Navbar(string lang)
        {
            return PartialView();      

        }

        public PartialViewResult Footer(string lang)
        {
            return PartialView();
        }

    }
}