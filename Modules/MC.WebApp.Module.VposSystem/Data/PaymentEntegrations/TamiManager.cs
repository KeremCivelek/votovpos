using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Web.UI.WebControls.WebParts;
using System.Globalization;
using MathNet.Numerics.Statistics;
using NPOI.SS.Formula.Functions;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using NPOI.POIFS.Crypt;
using HtmlAgilityPack;
using Org.BouncyCastle.Utilities.Encoders;
using System.Web.Http.Results;
using System.Text.Json;
using MC.WebApp.Core;

namespace MC.WebApp.Module.VposSystem.Data.PaymentEntegrations
{
    public class Payment3DRequest
    {
        //public object RequestData { get; set; }
        public object ShippingAddress { get; set; }
        public object BillingAddress { get; set; }
        public object Basket { get; set; }
        public object Buyer { get; set; }
        public object Card { get; set; }
        public string CallbackUrl { get; set; }
        public string paymentGroup { get; set; }
        public double amount { get; set; }
        public string orderId { get; set; }
        public string currency { get; set; }
        public int installmentCount { get; set; }
        public bool motoInd { get; set; }
        public string securityHash { get; set; }
        public string paymentChannel { get; set; }
    }
    public class JWKResource
    {
        public string Kty { get; set; } = "oct";
        public string Use { get; set; } = "sig";
        public string Kid { get; set; }
        public string K { get; set; }
        public string Alg { get; set; } = "HS512";
        public JWKResource() { }
        public JWKResource(string kid, string k)
        {
            Kid = kid;
            K = k;
        }
    }
    public class TamiManager : aBankFactory
    {
        //private static readonly HttpClient _httpClient = new HttpClient();
        private const string Auth3DUrl = "https://sandbox-paymentapi.tami.com.tr/payment/auth"; // Tami test API adresi
        private const long MerchantId = 77006950;
        private const long TerminalId = 84006953;
        private const string SecretKey = "0edad05a-7ea7-40f1-a80c-d600121ca51b";
        private const string FixedKidValue = "00ff6ea8-3511-4d04-946c-ba569208306f";
        private const string FixedKValue = "87919a8f-957b-427b-ae12-167622ab52b5";

        #region PROD
        //private const string Auth3DUrl = "https://paymentapi.tami.com.tr/payment/auth";
        //private const long MerchantId = 77006714;
        //private const long TerminalId = 84006716;
        //private const string SecretKey = "9d18823c-297c-4fa7-b519-5ddace729479"; 
        #endregion

        public override PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller)
        {
            PaymentResponseViewModel responseModel = new PaymentResponseViewModel();

            try
            {
                string authToken = GenerateAuthToken(MerchantId, TerminalId, SecretKey);
                //request.securityHash = "authToken";
                request.paymentGroup = "PRODUCT";
                request.amount = 12.5;
                request.orderId = Guid.NewGuid().ToString("N");
                request.currency = "TRY";
                request.installmentCount = 1;
                request.paymentChannel = "WEB";
                request.motoInd = false;
                //request.securityHash = @"eyJraWQiOiJncnc3Y3lTd3ByYm0zM0RicWxWV1BrL0lyM0ppbFB1RkZsa3ZsQXhidGxNWmNCRkI2VnE4M3pkdW1Sc3lrQmROdnAybHREU3JEcGRpM2p0blZ3V1VmZz09IiwidHlwIjoiSldUIiwiYWxnIjoiSFM1MTIifQ.ew0KICAgICJhbW91bnQiOiAxMCwNCiAgICAib3JkZXJJZCI6ICJ0YW1kc3Rrc3RzMzA4IiwNCiAgICAiY3VycmVuY3kiOiAiVFJZIiwNCiAgICAiaW5zdGFsbG1lbnRDb3VudCI6IDEsDQogICAgImNhcmQiOiB7DQogICAgICAgICJob2xkZXJOYW1lIjogIlRhbWkgRGVzdGVrIiwNCiAgICAgICAgImN2diI6ICIxMTIiLA0KICAgICAgICAiZXhwaXJlTW9udGgiOiAwOCwNCiAgICAgICAgImV4cGlyZVllYXIiOiAyMDI3LA0KICAgICAgICAibnVtYmVyIjogIjU0OTk5NzY1MzczODIwMTAiDQogICAgfSwNCiAgICAiYmlsbGluZ0FkZHJlc3MiOiB7DQogICAgICAgICJlbWFpbEFkZHJlc3MiOiAiZW1haWxAZW1haWwuY29tIiwNCiAgICAgICAgImFkZHJlc3MiOiAiTmlzYmV0aXllIEJhcmJhcm9zIEJ1bHZhcsSxIEJvdWxldmFyZCwgTm86OTYsIDM0MzQwIEJlxZ9pa3RhxZ8vxLBzdGFuYnVsIiwNCiAgICAgICAgImNpdHkiOiAixLBzdGFuYnVsIiwNCiAgICAgICAgImNvbXBhbnlOYW1lIjogIlNpcmtldCBBZMSxIiwNCiAgICAgICAgImNvdW50cnkiOiAiVMO8cmtpeWUiLA0KICAgICAgICAiZGlzdHJpY3QiOiAiQmViZWsgTWFoLiIsDQogICAgICAgICJjb250YWN0TmFtZSI6ICLEsHNpbSBTb3lpc2ltIiwNCiAgICAgICAgInBob25lTnVtYmVyIjogIjA1MzY0NjA0MDE2IiwNCiAgICAgICAgInppcENvZGUiOiAiMzQzNDAwIg0KICAgIH0sDQogICAgInNoaXBwaW5nQWRkcmVzcyI6IHsNCiAgICAgICAgImVtYWlsQWRkcmVzcyI6ICJlbWFpbEBlbWFpbC5jb20iLA0KICAgICAgICAiYWRkcmVzcyI6ICJOaXNiZXRpeWUgQmFyYmFyb3MgQnVsdmFyxLEgQm91bGV2YXJkLCBObzo5NiwgMzQzNDAgQmXFn2lrdGHFny_EsHN0YW5idWwiLA0KICAgICAgICAiY2l0eSI6ICLEsHN0YW5idWwiLA0KICAgICAgICAiY29tcGFueU5hbWUiOiAiU2lya2V0IEFkxLEiLA0KICAgICAgICAiY291bnRyeSI6ICJUw7xya2l5ZSIsDQogICAgICAgICJkaXN0cmljdCI6ICJMZXZlbnQiLA0KICAgICAgICAiY29udGFjdE5hbWUiOiAixLBzaW0gU295aXNpbSIsDQogICAgICAgICJwaG9uZU51bWJlciI6ICIwNTM0NjQ4NDc3NyIsDQogICAgICAgICJ6aXBDb2RlIjogIjM0MzQyMjEiDQogICAgfSwNCiAgICAiYnV5ZXIiOiB7DQogICAgICAgICJpcEFkZHJlc3MiOiAiMTkyLjE2OC4xLjcwIiwNCiAgICAgICAgImJ1eWVySWQiOiAiNjc4NjU0IiwNCiAgICAgICAgIm5hbWUiOiAiQWTEsSIsDQogICAgICAgICJzdXJOYW1lIjogIlNveWFkxLEiLA0KICAgICAgICAiaWRlbnRpdHlOdW1iZXIiOiAyODYyOTE2MDM3NCwNCiAgICAgICAgImNpdHkiOiAixLBzdGFuYnVsIiwNCiAgICAgICAgImNvdW50cnkiOiAiVMO8cmtpeWUiLA0KICAgICAgICAiemlwQ29kZSI6ICIzNDgyMjIiLA0KICAgICAgICAiZW1haWxBZGRyZXNzIjogImVtYWlsQGVtYWlsLmNvbSIsDQogICAgICAgICJwaG9uZU51bWJlciI6ICIwNTM2NDYwOTk2MyIsDQogICAgICAgICJyZWdpc3RyYXRpb25BZGRyZXNzIjogIk9ydGFrw7Z5IE1haC4gVWx1cyBTb2suIEJlxZ9pa3RhxZ8iLA0KICAgICAgICAibGFzdExvZ2luRGF0ZSI6ICIyMDIyLTExLTA1VDEzOjM5OjExLjMzMiIsDQogICAgICAgICJyZWdpc3RyYXRpb25EYXRlIjogIjIwMjItMTAtMTFUMTI6NTk6MTEuMzMyIg0KICAgIH0sDQogICAgImJhc2tldCI6IHsNCiAgICAgICAgImJhc2tldElkIjogInNlcGV0MSIsDQogICAgICAgICJiYXNrZXRJdGVtcyI6IFsNCiAgICAgICAgICAgIHsNCiAgICAgICAgICAgICAgICAiaXRlbUlkIjogIjY3Mzk5OTk0OSIsDQogICAgICAgICAgICAgICAgIm5hbWUiOiAiWWFwYm96IiwNCiAgICAgICAgICAgICAgICAiaXRlbVR5cGUiOiAiUEhZU0lDQUwiLA0KICAgICAgICAgICAgICAgICJjYXRlZ29yeSI6ICJveXVuY2FrIiwNCiAgICAgICAgICAgICAgICAic3ViQ2F0ZWdvcnkiOiAiYWx0IG95dW5jYWsiLA0KICAgICAgICAgICAgICAgICJudW1iZXJPZlByb2R1Y3RzIjogMTAsDQogICAgICAgICAgICAgICAgInRvdGFsUHJpY2UiOiAxMCwNCiAgICAgICAgICAgICAgICAidW5pdFByaWNlIjogMQ0KICAgICAgICAgICAgfQ0KICAgICAgICBdDQogICAgfSwNCiAgICAicGF5bWVudEdyb3VwIjogIlBST0RVQ1QiLA0KICAgICJjYWxsYmFja1VybCI6ICJodHRwczovL2didHVuZWxlbXVsYXRvci1kLmZ3LmdhcmFudGliYnZhLmNvbS50ci9zZWN1cmUzZCIsDQogICAgInNlY3VyaXR5SGFzaCI6IiINCn0.RRFBDVJIWfcvlqt9Q8VSqTi3YD8OFU3A_bjAHiIIsb7lFlSu-_YrMVa-1ALcRuHS9tUdAOQZ9_jtGGhg_9OSLg";

                // string jsonData = JsonConvert.SerializeObject(request);
                // string securityHash = GenerateJWKSignature(MerchantId, TerminalId, SecretKey, jsonData, FixedKidValue, FixedKValue);


                string requestObject = JsonConvert.SerializeObject(
                     request,
                     new JsonSerializerSettings()
                     {
                         Converters = { new IsoDateTimeConverter { DateTimeFormat = "yyyy-MM-ddTHH:mm:ss.fff" } },
                         NullValueHandling = NullValueHandling.Ignore,
                         ContractResolver = new CamelCasePropertyNamesContractResolver()
                     }
                );

                request.securityHash = GenerateJWKSignature(MerchantId, 
                    TerminalId, 
                    SecretKey, 
                    requestObject, 
                    FixedKidValue, 
                    FixedKValue);

                string jsonData = JsonConvert.SerializeObject(request);
                string responseString = string.Empty;
                using (HttpClient _httpClient = new HttpClient())
                {
                    HttpContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    _httpClient.DefaultRequestHeaders.Clear();
                    _httpClient.DefaultRequestHeaders.Add("Accept-Language", "tr");
                    _httpClient.DefaultRequestHeaders.Add("PG-Api-Version", "v2");
                    // _httpClient.DefaultRequestHeaders.Add("PG-Auth-Token", $"77006954:84006957:dqsUwmHemimt6q6NEsFSxd+Kl+1UYUvaHRR6jQsv0ec=");
                    _httpClient.DefaultRequestHeaders.Add("PG-Auth-Token", $"{MerchantId}:{TerminalId}:{GetPagoHash(MerchantId.ToString() + TerminalId.ToString() + SecretKey)}");
                    _httpClient.DefaultRequestHeaders.Add("correlationId", Guid.NewGuid().ToString("N"));

                    HttpResponseMessage response = _httpClient.PostAsync(Auth3DUrl, content).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        responseString = response.Content.ReadAsStringAsync().Result;
                    }
                    else 
                    {
                        responseString = response.Content.ReadAsStringAsync().Result;
                        throw new Exception($"Tami Auth3D API hatası: {response.StatusCode}");
                    }
                }


                

                HtmlDocument doc=new HtmlDocument();

                using (JsonDocument jdoc = JsonDocument.Parse(responseString))
                {
                    JsonElement root = jdoc.RootElement;
                    string name = root.GetProperty("threeDSHtmlContent").GetString();
                    byte[] JdecodedBytes = Convert.FromBase64String(name);
                    string JdecodedText = Encoding.UTF8.GetString(JdecodedBytes);
                    responseModel.Status = eSaleResponseStatus.RedirectHTML;
                    responseModel.Message= JdecodedText;
                    return responseModel;
                    
                }

                //dynamic jsonDatam = JsonConvert.DeserializeObject(responseString);
                //byte[] decodedBytes = Convert.FromBase64String(jsonDatam.threeDSHtmlContent);
                //string decodedText = Encoding.UTF8.GetString(decodedBytes);
                //doc.LoadHtml(decodedText);

                return responseModel;
            }
            catch (Exception ex)
            {
                throw new Exception("Auth3D işlemi sırasında hata oluştu.", ex);
            }
        }
        public static string GetPagoHash(string input)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                string sha256Base64 = Convert.ToBase64String(hash);
                return sha256Base64;
            }

        }
        private static string GenerateAuthToken(long merchantId, long terminalId, string secretKey)
        {
            string input = merchantId.ToString() + terminalId.ToString() + secretKey;
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                string base64Hash = Convert.ToBase64String(hashBytes);
                return merchantId + ":" + terminalId + ":" + base64Hash;
                //return base64Hash;
            }
        }

        public static string GenerateJWKSignature(long merchantId, long terminalNumber, string secretKey, string requestJson, string fixedKidValue, string fixedKValue)
        {
            var jwkResource = GetJWKResource(merchantId, terminalNumber, secretKey, fixedKidValue, fixedKValue);

            var header = new Dictionary<string,object>
                            {
                                { "kid", jwkResource.Kid },
                                { "typ", "JWT" },
                                { "alg", "HS512" }
                            };

            //var headerBytes = Encoding.UTF8.GetBytes(JsonSerializer.Serialize(header));
            var headerJson= JsonConvert.SerializeObject(header);
            var headerBase64 = Base64UrlEncoder.Encode(headerJson);

            var payloadBase64 = Base64UrlEncoder.Encode(Encoding.UTF8.GetBytes(requestJson));

            var dataToSign = $"{headerBase64}.{payloadBase64}";
            var signature = ComputeHmacSha512(
                Convert.FromBase64String(jwkResource.K),
                Encoding.UTF8.GetBytes(dataToSign)
            );
            var signatureBase64 = Base64UrlEncoder.Encode(signature);

            return $"{headerBase64}.{payloadBase64}.{signatureBase64}";
        }
        private static byte[] ComputeHmacSha512(byte[] key, byte[] data)
        {
            using (var hmac = new HMACSHA512(key))
                return hmac.ComputeHash(data);
        }
        private static string GenerateKidValue(string secretKey, string fixedKidValue)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                string input = secretKey + fixedKidValue;
                byte[] hash = sha512.ComputeHash(Encoding.UTF8.GetBytes(input));
                return Convert.ToBase64String(hash);
            };

        }
        private static JWKResource GetJWKResource(long merchantNumber, long terminalNumber, string secretKey, string fixedKidValue, string fixedKValue)
        {
            return new JWKResource
            {
                Kid = GenerateKidValue(secretKey, fixedKidValue),
                K = GenerateKValue(merchantNumber, terminalNumber, secretKey, fixedKValue)
            };
        }
        private static string GenerateKValue(long merchantNumber, long terminalNumber, string secretKey, string fixedKValue)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                var input = secretKey + fixedKValue + merchantNumber + terminalNumber;
                byte[] hash = sha512.ComputeHash(Encoding.UTF8.GetBytes(input));
                return Convert.ToBase64String(hash);
            }
        }
     
        public static object GetShippingAddress() => new { Address = "Deneme adresi", City = "İstanbul", CompanyName = "Deneme Firması", ContactName = "Oğuzhan Okur", Country = "Türkiye", District = "Maltepe", PhoneNumber = "07505555555", ZipCode = "34846" };

        public static object GetBillingAddress() => new { Address = "Deneme adresi", City = "İstanbul", CompanyName = "Deneme Firması", ContactName = "Oğuzhan Okur", Country = "Türkiye", District = "Maltepe", PhoneNumber = "07505555555", ZipCode = "34846" };

        public static object GetExampleBasket() => new { BasketId = Guid.NewGuid().ToString("N"), BasketItems = new List<object> { new { Category = "Oyuncak", SubCategory = "Çocuk Oyunu", ItemType = "PHYSICAL", ItemId = "4388002", Name = "Lego", NumberOfProducts = 1, TotalPrice = 1, UnitPrice = 1 } } };

        public static object GetExampleBuyer() => new { EmailAddress = "destek@garantibbva.com.tr", IpAddress = "127.0.0.1", RegistrationAddress = "Maltepe", BuyerId = Guid.NewGuid().ToString("N"), City = "İstanbul", Country = "Türkiye", IdentityNumber = 11111111111, LastLoginDate = DateTime.Now, Name = "Oğuzhan", SurName = "Okur", PhoneNumber = "07325555555", RegistrationDate = DateTime.Now.AddDays(-10), ZipCode = "34846" };

        //Test
        //public static object GetExampleCard() => new { Cvv = "423", ExpireMonth = 4, ExpireYear = 2027, Number = "5406697543211173", HolderName = "Mesut Sarıtaş" };
        //Canlı
        public static object GetExampleCard() => new { Cvv = "7777", ExpireMonth = 10, ExpireYear = 2025, Number = "5193240530517406", HolderName = "Kerem Civelek" };

        public override PaymentResponseViewModel Payment3D(PaymentRequestViewModel request, string lang, IMCController controller)
        {
            throw new NotImplementedException();
        }
    }
}