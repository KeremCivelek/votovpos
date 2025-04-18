using MC.WebApp.Core;
using MC.WebApp.Module.VposSystem.Data.PaymentEntegrations;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Data
{
    public class FinansBankManager : aBankFactory
    {
        #region Private Fields
        private static string _url3Dtest = "https://vpostest.qnbfinansbank.com/Gateway/Default.aspx";
        private static string _url3DLive = "https://vpos.qnbfinansbank.com/Gateway/Default.aspx";
        #endregion
        public override PaymentResponseViewModel Payment3D(PaymentRequestViewModel request, string lang, IMCController controller)
        {
            try
            {
                PaymentResponseViewModel response = new PaymentResponseViewModel();

                #region Parameters
                request.saleInfo.currency = eCurrency.TRY;
                request.saleInfo.installment = 1;
                request.customerIpAddress = controller.LogData.Ip;
                #endregion
                #region Auth
                var auth = GetAuthModel(request.IsTest);
                #endregion

                Dictionary<string, string> req = new Dictionary<string, string> {
                {"MbrId", "5" },
                {"MerchantId", auth.MerchantId },
                {"UserCode", auth.MerchantUser },
                {"UserPass", auth.MerchantPassword },
                {"PurchAmount", request.saleInfo.amount.ToString("N2", CultureInfo.GetCultureInfo("tr-TR")).Replace(".", "").Replace(",", ".") },
                {"Currency", ((int)request.saleInfo.currency).ToString() },
                {"OrderId", request.orderNumber },
                {"OrgOrderId", request.orderNumber },
                {"OkUrl", auth.SuccessUrl },
                {"FailUrl", auth.ErrorUrl },
                {"TxnType", "Auth" },
                {"InstallmentCount", (request.saleInfo.installment > 1 ? request.saleInfo.installment.ToString() : "0") },
                {"SecureType", auth.Model },
                {"Pan", request.saleInfo.CardNumber},
                {"Cvv2",request.saleInfo.CardCvv},
                {"Expiry",/*"0150"*/ request.saleInfo.CardMonth.ToString("00") + request.saleInfo.CardYear.ToString().Substring(2)},
                {"Rnd", DateTime.Now.Ticks.ToString()},
                {"Lang", "TR"},
                {"CompCode",request.saleInfo.CompCode},
                {"CustomerCode",request.saleInfo.CustomerCode},
                {"BankCode",request.saleInfo.BankCode.ToString()}
            };

                string hashText = SHA1Base64(req["MbrId"] + req["OrderId"] + req["PurchAmount"] + req["OkUrl"] + req["FailUrl"] + req["TxnType"] + req["InstallmentCount"] + req["Rnd"] + auth.MerchantStorekey);

                req.Add("Hash", hashText);

                string res = this.Request(req, auth.PostUrl);

                var dic = getFormParams(res);

                response.PrivateResponse = dic;

                if (dic?.ContainsKey("ErrMsg") == true || dic?.ContainsKey("ErrorCode") == true)
                {
                    string errorMsg = $"{(dic?.ContainsKey("ErrorCode") == true ? dic["ErrorCode"]?.ToString() : "")} - {(dic?.ContainsKey("ErrMsg") == true ? dic["ErrMsg"]?.ToString() : "")}";

                    response.Status = eSaleResponseStatus.Error;
                    response.Message = errorMsg;
                }
                else
                {
                    response.Status = eSaleResponseStatus.RedirectHTML;
                    response.Message = res;
                }

                return response;
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                throw;
            }

        }

        public override PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller)
        {
            throw new NotImplementedException();
        }


        #region Private Variables
        private VirtualPosAuthViewModel GetAuthModel(bool isTest)
        {
            var settings = SettingsManager.GetSettings(VposSystemModule.ModuleCodeName);

            VirtualPosAuthViewModel auth = new VirtualPosAuthViewModel()
            {
                MerchantId = settings.GetString("str_finansbank_merchant_id", "085300000009597"),
                MerchantUser = settings.GetString("str_finansbank_merchant_user", "QNB_ISYERI_KULLANICI"),
                MerchantPassword = settings.GetString("str_finansbank_merchant_password", "FwCX2"),
                MerchantStorekey = settings.GetString("str_finansbank_merchant_store_key", "12345678"),
                PostUrl = settings.GetString("str_finansbank_payment_service_url", "https://vpostest.qnbfinansbank.com/Gateway/Default.aspx"),
                SuccessUrl = settings.GetString("str_bank_return_success_url", "https://localhost:44398/TR/VposSystem/Default/Success3D"),
                ErrorUrl = settings.GetString("str_bank_return_error_url", "https://localhost:44398/TR/VposSystem/Default/Fail3D"),
                Model = "3DPay",
            };

            return auth;

        }
        #endregion
    }
}