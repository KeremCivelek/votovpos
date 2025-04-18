using MC.Core;
using MC.WebApp.Common;
using MC.WebApp.Core;
using MC.WebApp.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    public class SettingsApiController : aBaseApiController
    {
        [HttpPost]
        public object ChangePassword(ChangePasswordModel model, string lang = "")
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            if (model == null) model = new ChangePasswordModel();
            model.UserId = User.UserId;
            model.UserGuid = User.UserGuid;

            var result = AuthManager.ChangePassword(model, lang);
            return result;
        }
    }
}