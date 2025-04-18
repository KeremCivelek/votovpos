using MC.WebApp.Core;
using MC.WebApp.Module.VposSystem.Data.PaymentEntegrations;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Data
{
    public class GarantiManager : aBankFactory
    {
        #region Private Fields
        private readonly string _url3Dtest = "https://sanalposprovtest.garanti.com.tr/servlet/gt3dengine";
        private readonly string _url3DLive = "https://sanalposprov.garanti.com.tr/servlet/gt3dengine";
        #endregion
        public override PaymentResponseViewModel Payment3D(PaymentRequestViewModel request , string lang , IMCController controller)
        {
            PaymentResponseViewModel response = null;

            VirtualPosAuthViewModel auth = new VirtualPosAuthViewModel();

            Dictionary<string, string> param = new Dictionary<string, string>
            {
                { "mode",  "TEST" },
                { "apiversion", "v0.01" },
                { "version", "v0.01" },
                { "secure3dsecuritylevel", "3D" },

                { "terminalprovuserid", "PROVAUT" },
                { "terminaluserid", "PROVAUT" },
                { "terminalmerchantid", auth.MerchantId },
                { "terminalid", auth.MerchantUser },

                { "txntype", "sales" },
                { "txnamount", request.saleInfo.amount.ToString("N2", CultureInfo.GetCultureInfo("en-US")).Replace(",", "").Replace(".", "")},
                { "txncurrencycode", ((int)request.saleInfo.currency).ToString() },
                { "txninstallmentcount", request.saleInfo.installment > 1 ? request.saleInfo.installment.ToString() : "" },


                { "customeripaddress", request.customerIpAddress },
                { "customeremailaddress", request.invoiceInfo.emailAddress },
                { "orderid", request.orderNumber },

                { "cardnumber", request.saleInfo.CardNumber },
                { "cardexpiredatemonth",  request.saleInfo.CardMonth.ToString("00")},
                { "cardexpiredateyear",  request.saleInfo.CardYear.ToString().Substring(2)},
                { "cardcvv2", request.saleInfo.CardCvv },


                //{ "successurl", request.payment3D.ReturnURL },
                //{ "errorurl", request.payment3D.ReturnURL },
                { "secure3dhash", "" }
            };


            string hashedPassword = SHA1Base64(auth.MerchantPassword + auth.MerchantUser).ToUpper();
            string hash = SHA1Base64(auth.MerchantUser +
                                  request.orderNumber +
                                  request.saleInfo.amount.ToString("N2", CultureInfo.GetCultureInfo("en-US")).Replace(",", "").Replace(".", "") +
                                  //request.payment3D.ReturnURL +
                                  //request.payment3D.ReturnURL +
                                  param["txntype"].ToString() +
                                  param["txninstallmentcount"].ToString() +
                                  auth.MerchantStorekey +
                                  hashedPassword).ToUpper();

            param["secure3dhash"] = hash;


            string resp = this.Request(param, _url3Dtest);

            string _orginalResp = resp;

            resp = resp.Replace(" value =\"", " value=\"");


            Dictionary<string, object> respdic = new Dictionary<string, object>();

            respdic.Add("originalResponseHTML", _orginalResp);

            Dictionary<string, object> dic = getFormParams(resp);

            foreach (var item in dic)
                respdic[item.Key] = item.Value.ToString().Split('"')[0];

            if (respdic == null)
            {
                response = new PaymentResponseViewModel
                {
                    Status = eSaleResponseStatus.Error,
                    Message = "İşlem sırasında hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
                    OrderNumber = request.orderNumber,
                    PrivateResponse = respdic

                };
            }
            else if (respdic.ContainsKey("response") && respdic["response"].ToString().ToLower() == "error")
            {
                response = new PaymentResponseViewModel
                {
                    Status = eSaleResponseStatus.Error,
                    Message = "İşlem sırasında hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
                    OrderNumber = request.orderNumber,
                    PrivateResponse = respdic
                };

                if (respdic.ContainsKey("errmsg"))
                    response.Message = respdic["errmsg"].ToString();
            }

            return response;
        }

        public override PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller)
        {
            throw new NotImplementedException();
        }
    }
}