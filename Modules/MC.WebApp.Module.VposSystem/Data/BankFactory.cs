using MC.WebApp.Module.VposSystem.Data.PaymentEntegrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Data
{
    public static class BankFactory
    {
        #region Factory Instance
        public static aBankFactory Factory(int bankCode)
        {
            aBankFactory bank = null;

            eBankCode bankEnum = (eBankCode)bankCode;

            switch (bankEnum)
            {
                case eBankCode.FinansBank:
                    bank = new FinansBankManager();
                    break;
                case eBankCode.Akbank:
                    //bank = new AkBankManager();
                    bank = new ToslaManager();
                    break;
                case eBankCode.GarantiBankasi:
                    bank = new GarantiManager();
                    break;
                default:
                    bank = new FinansBankManager();
                    break;
            }
            return bank;
        }

        #endregion
    }
}