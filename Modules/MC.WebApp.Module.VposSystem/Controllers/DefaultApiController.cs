using MC.Core;
using MC.WebApp.Core;
using MC.WebApp.Module.VposSystem.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    public class DefaultApiController : aBaseApiController
    {

        [HttpPost]
        public object Payment3D(string lang , PaymentRequestViewModel model)
        {
            model.saleInfo.BankCode = eBankCode.FinansBank.As<int>();
            model.IsTest = true;

            var factory = BankFactory.Factory(model.saleInfo.BankCode);
            return factory.Payment3D(model, lang,this).Message;
        }
    }
}