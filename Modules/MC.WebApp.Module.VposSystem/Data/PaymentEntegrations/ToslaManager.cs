using MC.WebApp.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http.Headers;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json.Linq;
using System.Web.Helpers;
using System.Net;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using HtmlAgilityPack;

namespace MC.WebApp.Module.VposSystem.Data.PaymentEntegrations
{
    public class ToslaManager : aBankFactory
    {
        #region Private Field
        #endregion

        #region Essential Params
        private static string clientId = string.Empty;
        private static string apiUser = string.Empty;
        private static string apiPass = string.Empty;
        private static string rnd = string.Empty;
        private static string timeSpan = string.Empty;
        private static string Hash = string.Empty;
        private static string hashString = string.Empty;
        private static string testUrl = string.Empty;

        #endregion
        public ToslaManager()
        {
            clientId = "1000000494";
            apiUser = "POS_ENT_Test_001";
            apiPass = "POS_ENT_Test_001!*!*";
            testUrl = "https://prepentegrasyon.tosla.com/api/Payment/";
        }
        public override PaymentResponseViewModel Payment3D(PaymentRequestViewModel request, string lang, IMCController controller)
        {
            try
            {
                PaymentResponseViewModel responseModel = new PaymentResponseViewModel();
                string payResponse=string.Empty;
                #region threeDPayment
                CreateHash(apiPass);
                request.saleInfo.currency = eCurrency.TRY;
                string installment = request.saleInfo.installment > 1 ? request.saleInfo.installment.ToString() : "";
                if (string.IsNullOrEmpty(installment))
                    installment = "1";

                Dictionary<string, string> parameters = new Dictionary<string, string>()
            {
                {"clientId", clientId},
                {"apiUser", apiUser},
                {"rnd", rnd},
                {"timeSpan",timeSpan},
                {"hash",Hash },
                {"orderId", (string.IsNullOrEmpty(request.orderNumber)==true?string.Empty:request.orderNumber)},
                //{"orderId","12345678901234567890" },
                {"callbackUrl", "https://localhost:44398/TR/VposSystem/Default/Success3D"},
                {"description", string.Empty},
                {"echo", string.Empty},
                {"extraParameters", string.Empty},
                {"isCommission ","0"},
                {"amount",  request.saleInfo.amount.ToString("N2", CultureInfo.GetCultureInfo("tr-TR")).Replace(".", "").Replace(",", "")},
                //{"amount",  "53"},
                {"currency", ((int)request.saleInfo.currency).ToString()},
                {"installmentCount", installment}
            };
                //string resp = Request(parameters, testUrl + "threeDPayment");
                var response = threeDPaymentPost(testUrl + "threeDPayment", parameters, "application/json");
                #endregion
                JObject jObject = JObject.Parse(response.ToString());
                string threeDSessionId = jObject["ThreeDSessionId"].ToString();
                #region ProcessCardForm
                if (jObject["Code"].ToString() == "0")
                {
                    string cardYear = request.saleInfo.CardYear.ToString();
                    payResponse = ProcessCardForm(threeDSessionId,
                        request.saleInfo.CardName.ToString(),
                    request.saleInfo.CardNumber.ToString(),
                        request.saleInfo.CardMonth.ToString() + "/" + cardYear.Substring(cardYear.Length - 2),
                        request.saleInfo.CardCvv.ToString());
                    //var threeDresponse = Post(testUrl + "ProcessCardForm", paymentParameters, "multipart/form-data");
                }
                #endregion
                if (!string.IsNullOrEmpty(payResponse))
                {
                    HtmlDocument doc = new HtmlDocument();
                    doc.LoadHtml(payResponse);
                    var errorMessageNode = doc.DocumentNode.SelectSingleNode("//input[@name='errorMessage']");
                    if (errorMessageNode != null) {
                        string errorMessage = errorMessageNode.GetAttributeValue("value", "Hata mesajı bulunamadı.");
                        responseModel.Status = eSaleResponseStatus.Error;
                        responseModel.Message = errorMessage;
                        return responseModel;
                    }
                    responseModel.Status = eSaleResponseStatus.RedirectHTML;
                    responseModel.Message = payResponse;
                }
                return responseModel;
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                throw;
            }


        }

        private string CreateHash(string apiPass)
        {
            var randomGenerator = new Random();
            var ApiPass = apiPass;
            var ClientId = clientId;
            var ApiUser = apiUser;
            rnd = randomGenerator.Next(1, 1000000).ToString();
            timeSpan = DateTime.Now.ToString("yyyyMMddHHmmss");
            hashString = ApiPass + ClientId + ApiUser + rnd + timeSpan;
            System.Security.Cryptography.SHA512 sha = new System.Security.Cryptography.SHA512CryptoServiceProvider();
            byte[] bytes = Encoding.UTF8.GetBytes(hashString);
            byte[] hashingbytes = sha.ComputeHash(bytes);
            var hash = Convert.ToBase64String(hashingbytes);
            Hash = hash;
            return hash;
        }

        public static object threeDPaymentPost(string url, object data, string contentType)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var json = JsonConvert.SerializeObject(data);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var result = client.PostAsync(url, content).Result;

                if (result.IsSuccessStatusCode)
                {
                    var response = result.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<object>(response);
                }
                else
                {
                    return new { isSuccess = false, Message = "Hata oluştu: " + result.ReasonPhrase };
                }
            }
        }

        public static string ProcessCardForm(string threeDSessionId, string cardHolderName, string cardNo, string expireDate, string cvv)
        {
            // API Endpoint
            string endpoint = "ProcessCardForm";

            using (HttpClient _httpClient = new HttpClient())
            {
                // Form data (multipart/form-data) oluşturuluyor
                var formData = new MultipartFormDataContent();
                formData.Add(new StringContent(threeDSessionId), "ThreeDSessionId");
                formData.Add(new StringContent(cardHolderName), "CardHolderName");
                formData.Add(new StringContent(cardNo), "CardNo");
                formData.Add(new StringContent(expireDate), "ExpireDate");
                formData.Add(new StringContent(cvv), "Cvv");

                // POST isteği gönderiliyor
                HttpResponseMessage response = _httpClient.PostAsync(testUrl+endpoint, formData).Result;

                if (response.IsSuccessStatusCode)
                {
                    // Yanıt başarılıysa yanıt içeriği alınıyor
                    string responseData = response.Content.ReadAsStringAsync().Result;
                    return responseData;
                }
                else
                {
                    // Başarısız durumunda hata fırlatılıyor
                    throw new Exception($"API isteği başarısız oldu: {response.StatusCode}");
                }
            }
        }

        public override PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller)
        {
            throw new NotImplementedException();
        }
    }
}
