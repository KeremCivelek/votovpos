using MC.Core;
using MC.WebApp.Common;
using MC.WebApp.Core;
using MC.WebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MC.WebApp.Module.VposSystem.Controllers
{
    public class BankApiController : aBaseApiController
    {
        [HttpGet]
        public object GetBankBinNumbers(string lang)
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            return DbManager.BankManager.GetBankBinNumbers(lang,this);
        }

        [HttpPost]
        public object AddBankBinNumber(BankBinNumberViewModel model ,string lang)
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            if (!ModelState.IsValid)
            {
                return new ResponseViewModel
                {
                    isSuccess = false,
                    Message = LanguageManager.Localize("Model eksik gönderildi", lang)
                };
            }
            return DbManager.BankManager.AddBankBinNumber(model,lang, this);
        }

        [HttpPost]
        public object UpdateBankBinNumber(BankBinNumberViewModel model, string lang)
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            if (!ModelState.IsValid)
            {
                return new ResponseViewModel
                {
                    isSuccess = false,
                    Message = LanguageManager.Localize("Model eksik gönderildi",lang)
                };
            }
            return DbManager.BankManager.UpdateBankBinNumber(model, lang, this);
        }

        [HttpPost]
        public object DeleteBankBinNumber(int bankBinNumberId, string lang)
        {
            lang = lang.IfNone(Managers.LanguageManager.DefaultLanguageCode);
            if (bankBinNumberId == 0)
            {
                return new ResponseViewModel
                {
                    isSuccess = false,
                    Message = LanguageManager.Localize("Bank Bin Number Id eksik gönderildi", lang)

                };
            }
            return DbManager.BankManager.DeleteBankBinNumber(bankBinNumberId, lang, this);
        }
    }
}