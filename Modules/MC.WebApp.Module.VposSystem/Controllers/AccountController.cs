using MC.WebApp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    [AllowAnonymous]
    public class AccountController : aBaseController
    {
        public ActionResult Login(string sicil, string lang, string Id)
        {
            if (string.IsNullOrEmpty(sicil) || string.IsNullOrEmpty(Id))
                return RedirectToAction("LoginError", "Account",new { lang });
            var result = DbManager.LoginManager.Login(sicil, this, Id, lang);
            if (result.isSuccess)
                return RedirectToAction("Index", "Default", new { lang });
            else
                return RedirectToAction("LoginError", "Account", new { lang });

        }

        public ActionResult LoginError(string lang)
        {
            ViewBag.Lang = lang;    
            return View();
        }
    }
}