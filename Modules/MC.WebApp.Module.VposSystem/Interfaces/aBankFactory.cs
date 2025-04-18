using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web;
using System.Text;
using MC.WebApp.Core;
using Newtonsoft.Json;
using MC.WebApp.Module.VposSystem.Data.PaymentEntegrations;

namespace MC.WebApp.Module.VposSystem
{
    public abstract class aBankFactory
    {
        #region Common Methods
        public virtual Dictionary<string, object> getFormParams(string formhtml)
        {
            Dictionary<string, object> keyValues = new Dictionary<string, object>();

            if (string.IsNullOrEmpty(formhtml))
                return keyValues;

            System.Text.RegularExpressions.MatchCollection match = System.Text.RegularExpressions.Regex.Matches(formhtml, "<input.*name=\"(.*?)\".*value=\"(.*?)\".*>");

            if (match != null && match.Count > 0)
            {
                foreach (System.Text.RegularExpressions.Match item in match)
                {
                    if (!keyValues.ContainsKey(item.Groups[1].Value))
                        keyValues.Add(item.Groups[1].Value, item.Groups[2].Value);
                }
            }

            return keyValues;
        }
        public virtual string GetHash(string hashstr)
        {
            using (System.Security.Cryptography.SHA1 sha = new System.Security.Cryptography.SHA1CryptoServiceProvider())
            {
                byte[] inputbytes = sha.ComputeHash(System.Text.Encoding.GetEncoding("ISO-8859-9").GetBytes(hashstr));

                return Convert.ToBase64String(inputbytes);
            }
        }

        public virtual string Request(Dictionary<string, string> param, string link)
        {
            string responseString = "";

            ServicePointManager.SecurityProtocol = (System.Net.SecurityProtocolType)3072;
            ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
            System.Net.ServicePointManager.Expect100Continue = false;

            using (HttpClient client = new HttpClient())
            {
                var request = new FormUrlEncodedContent(param);
                request.Headers.ContentType.MediaType = "application/x-www-form-urlencoded";
                request.Headers.ContentType.CharSet = "utf-8";
               
                var response = client.PostAsync(link, request).Result;
                responseString = response.Content.ReadAsStringAsync().Result;
            }

            return responseString;
        }
        public virtual string Request(Dictionary<string, string> param, string link,string PG_AuthToken)
        {
            string responseString = "";

            ServicePointManager.SecurityProtocol = (System.Net.SecurityProtocolType)3072;
            ServicePointManager.ServerCertificateValidationCallback = delegate { return true; };
            System.Net.ServicePointManager.Expect100Continue = false;

            using (HttpClient client = new HttpClient())
            {
                var request = new FormUrlEncodedContent(param);
                request.Headers.ContentType.MediaType = "application/x-www-form-urlencoded";
                request.Headers.ContentType.CharSet = "utf-8";
                request.Headers.Add("PG-Auth-Token", PG_AuthToken);
                var response = client.PostAsync(link, request).Result;
                responseString = response.Content.ReadAsStringAsync().Result;
            }

            return responseString;
        }
        public virtual string SHA1Base64(string text)
        {
            System.Security.Cryptography.SHA1 sha = new System.Security.Cryptography.SHA1CryptoServiceProvider();
            byte[] bytes = Encoding.UTF8.GetBytes(text);
            byte[] hashingbytes = sha.ComputeHash(bytes);
            string hash = Convert.ToBase64String(hashingbytes);

            return hash;
        }
        #endregion

        #region Abstract Methods
        public abstract PaymentResponseViewModel Payment3D(PaymentRequestViewModel request, string lang , IMCController controller);
        public abstract PaymentResponseViewModel Payment3D(Payment3DRequest request, string lang, IMCController controller);

        #endregion
    }
}