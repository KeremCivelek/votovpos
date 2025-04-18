using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web;
using System.Web.Razor.Tokenizer;
using System.Reflection;
using MC.WebApp.Core;
using MC.WebApp.Module.VposSystem.Data.PaymentEntegrations;

namespace MC.WebApp.Module.VposSystem
{
    public class AkBankManager : aBankFactory
    {

        #region Private Fields
        private static string _url3Dtest = "https://apigateuat.akbank.com/api/StandartOnlineBTSInterfaceService";
        private static string _url3DLive = "";
        #endregion

        #region Methods
        public override PaymentResponseViewModel Payment3D(PaymentRequestViewModel request , string lang , IMCController controller)
        {
            PaymentResponseViewModel response = new PaymentResponseViewModel();

            VirtualPosAuthViewModel auth = new VirtualPosAuthViewModel();

            string installment = request.saleInfo.installment > 1 ? request.saleInfo.installment.ToString() : "";
            Dictionary<string, string> param = new Dictionary<string, string>()
            {
                { "pan", request.saleInfo.CardNumber },
                { "cv2", request.saleInfo.CardCvv },
                { "Ecom_Payment_Card_ExpDate_Year", request.saleInfo.CardYear.ToString().Substring(2) },
                { "Ecom_Payment_Card_ExpDate_Month", request.saleInfo.CardMonth.ToString("00") },
                { "clientid", auth.MerchantId },
                { "amount", request.saleInfo.amount.ToString("N2", CultureInfo.GetCultureInfo("tr-TR")).Replace(".", "").Replace(",", ".") },
                //{ "oid", "" },
                { "okUrl", "https://localhost:44398/TR/VposSystem/Default/Success3D" },
                { "failUrl","https://localhost:44398/TR/VposSystem/Default/Fail3D" },
                { "rnd", "1"},
                { "hash", "" },
                { "storetype", auth.Model },
                { "lang", "tr" },
                { "currency", ((int)request.saleInfo.currency).ToString() },
                { "installment", installment },
                { "taksit", installment },
                { "islemtipi", "Auth" },

                 { "cardType", "1" }, // setlenecek
            };

            string hash = GetHash(param["clientid"]?.ToString()
                                     //+ param["oid"]?.ToString()
                                     + param["amount"]?.ToString()
                                     + param["okUrl"]?.ToString()
                                     + param["failUrl"]?.ToString()
                                     + param["islemtipi"]?.ToString()
                                     + param["installment"]?.ToString()
                                     + param["rnd"]?.ToString()
                                     + auth.MerchantStorekey
                                    );

            param["hash"] = hash;

            string resp = Request(param, auth.PostUrl);

            Dictionary<string, object> form = getFormParams(resp);

            response.PrivateResponse = form;
            response.OrderNumber = request.orderNumber;

            if (form?.ContainsKey("Response") == true && (form["Response"]?.ToString() == "Error" || form["Response"]?.ToString() == "Decline"))
            {
                response.Status = eSaleResponseStatus.Error;
                response.Message = form.ContainsKey("ErrMsg") ? form["ErrMsg"]?.ToString() : "İşlem sırasında bir hata oluştu.";
            }
            else
            {
                response.Status = eSaleResponseStatus.RedirectHTML;
                response.Message = resp;
            }

            return response;
        }

        public override PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller)
        {
            throw new NotImplementedException();
        }

        #endregion
    }
}