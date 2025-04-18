using MC.Core;
using MC.WebApp.Common;
using MC.WebApp.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
namespace MC.WebApp.Module.VposSystem.Controllers
{
    public class InvoincesApiController : aBaseApiController
    {
        [HttpGet]
        public object GetAllOnvoinces(string lang, string customerCode)
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            return SapManager.Instance.GetInvoinces(customerCode);
        }
    }
}