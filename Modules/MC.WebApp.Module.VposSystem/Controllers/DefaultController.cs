using MC.WebApp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    public class DefaultController : aBaseController
    {
        public ActionResult Index(string lang)
        {
            return View();
        }
        [ValidateInput(false), HttpPost]
        public ActionResult Redirect3D(string lang, Redirect3DViewModel mdl)
        {
            ViewBag.HTML3D = mdl.HTML;
            return View();
        }
        [AllowAnonymous]
        public ActionResult Success3D(string lang, Payment3DResponseViewModel model)
        {
            #region Sap Provision Gönderme || Provision tamamlama
            DbManager.BankManager.CompleteProvision(model, lang, this);
            #endregion
            return View(model);
        }
        [AllowAnonymous]
        public ActionResult Fail3D(string lang, Payment3DResponseViewModel model)
        {
            return View(model);
        }
    }
}