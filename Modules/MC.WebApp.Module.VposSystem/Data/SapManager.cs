using MC.Core;
using MC.WebApp.Common;
using MC.WebApp.Core;
using MC.WebApp.Models;
using MC.WebApp.Module.VposSystem.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http.Results;
using System.Xml;

namespace MC.WebApp.Module.VposSystem
{
    public class SapManager
    {
        #region Instance
        private static object _lock = new object();
        private static SapManager _instance;
        public static SapManager Instance
        {
            get
            {
                if (_instance != null) return _instance;
                lock (_lock)
                {
                    if (_instance != null) return _instance;
                    _instance = new SapManager();
                }
                return _instance;
            }
        }
        #endregion
        #region Consts
        private const string _xmlTemplate = @"
                                 <soapenv:Envelope xmlns:soapenv=""http://schemas.xmlsoap.org/soap/envelope/"" xmlns:urn=""urn:sap-com:document:sap:rfc:functions"">
                                   <soapenv:Header/>
                                   <soapenv:Body>
                                      <urn:ZINF_VPOS_FM_CPI_2_ERP>
                                         <!--Optional:-->
                                           <I_REQ_JSON>{0}</I_REQ_JSON>
                                      </urn:ZINF_VPOS_FM_CPI_2_ERP>
                                   </soapenv:Body>
                                </soapenv:Envelope>";

        #endregion
        #region Private Fields
        private string _userName = string.Empty;
        private string _password = string.Empty;
        private string _authToken = string.Empty;
        private string _serviceUrl = string.Empty;
        private string _requestCode = string.Empty;
        private string _bukrsCode = string.Empty;
        private string _invoiceRequestCode = string.Empty;
        private string _provisionRequestCode = string.Empty;
        #endregion
        #region Constructor
        public SapManager()
        {
            var settings = SettingsManager.GetSettings(VposSystemModule.ModuleCodeName);
            _requestCode = settings.GetString("str_sap_request_code", "1002");
            _bukrsCode = settings.GetString("str_sap_bukrs_code", "YY01");
            _serviceUrl = settings.GetString("str_sap_service_url", "https://vceaa-dev-cloud.it-cpi018-rt.cfapps.eu10-003.hana.ondemand.com/cxf/ZVPOS_CPI_2_ERP");
            _userName = settings.GetString("str_sap_username", "arda.berkman@inforama.com.tr");
            _password = settings.GetString("str_sap_password", "Cits2022*");
            _authToken = Convert.ToBase64String($"{_userName}:{_password}".ToUtf8Bytes());
            _invoiceRequestCode = settings.GetString("str_invoice_request_code", "1001"); ; ;
            _provisionRequestCode = settings.GetString("str_provision_request_code", "1003"); ;
        }
        #endregion
        #region Private Methods
        private HttpClient getHttpClient()
        {
            var _cli = new HttpClient();
            _cli.DefaultRequestHeaders.Add("Accept", "text/xml");
            _cli.DefaultRequestHeaders.Add("Authorization", $"Basic {_authToken}");
            return _cli;
        }
        #endregion
        #region Public Methods
        public async void GetSapCustomers(Action<List<SapCustomerViewModel>> then = null)
        {
            try
            {
                using (var cli = getHttpClient())
                {
                    var request = new SapRequestViewModel()
                    {
                        RequestCode = _requestCode,
                        RequestData = JsonConvert.SerializeObject(new
                        {
                            I_BUKRS = _bukrsCode
                        }),
                    };
                    var requestStr = request.ToJsonString();
                    var xml = string.Format(_xmlTemplate, requestStr);
                    var stringContent = new StringContent(xml, Encoding.UTF8, "text/xml");
                    var post = await cli.PostAsync(_serviceUrl, stringContent);
                    var response = await post.Content.ReadAsStringAsync();
                    XmlDocument doc = new XmlDocument();
                    doc.LoadXml(response);
                    var resStc = doc.GetElementsByTagName("E_RES_STC")[0];
                    if (resStc.IsNull())
                        return;

                    var jsonNode = resStc.SelectNodes("JSON_STRING")[0];
                    var jsonString = jsonNode.InnerText;
                    var listData = JsonConvert.DeserializeObject<SapETRECSResponseViewModel<List<SapCustomerViewModel>>>(jsonString);
                    then.IfNotNullDo((y) => y(listData.ET_RECS));
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
            }
        }

        public ResultViewModel<List<SapInvoicesViewModel>> GetInvoinces(string customerCode = "")
        {
            ResultViewModel<List<SapInvoicesViewModel>> result = new ResultViewModel<List<SapInvoicesViewModel>>();

            try
            {
                SapInvoicesViewModel model = new SapInvoicesViewModel();
                model.Amount = 53;
                model.CustomerCode = "0001000029";
                model.CompanyCode = "YY01";
                model.CompanyName = "KC GROUP";
                model.Currency = "TRY";
                model.ProvAmount = 51;
                result.Response.Add(model);
                result.isSuccess = true;
                return result;
                //using (var cli = getHttpClient())
                //{
                //    customerCode = customerCode.PadLeft(10, '0');
                //    var request = new SapRequestViewModel()
                //    {
                //        RequestCode = _invoiceRequestCode,
                //        RequestData = JsonConvert.SerializeObject(new
                //        {
                //            CUSTOMER_CODE = customerCode
                //        }),
                //    };
                //    var requestStr = request.ToJsonString();
                //    var xml = string.Format(_xmlTemplate, requestStr);
                //    var stringContent = new StringContent(xml, Encoding.UTF8, "text/xml");
                //    var postTask = cli.PostAsync(_serviceUrl, stringContent);
                //    postTask.Wait();
                //    var post = postTask.Result;
                //    var responseTask = post.Content.ReadAsStringAsync();
                //    responseTask.Wait();
                //    var response = responseTask.Result;
                //    XmlDocument doc = new XmlDocument();
                //    doc.LoadXml(response);
                //    var resStc = doc.GetElementsByTagName("E_RES_STC")[0];


                //    if (resStc.IsNull())
                //        return result;


                //    var jsonNode = resStc.SelectNodes("JSON_STRING")[0];
                //    var jsonString = jsonNode.InnerText;
                //    var listData = JsonConvert.DeserializeObject<SapETRECSResponseViewModel<List<SapInvoicesViewModel>>>(jsonString);
                //    result.Response = listData.ET_RECS.ToList();
                //    result.isSuccess = true;
                //    return result;
                //}
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex);
                result.isSuccess = false;
                result.Message = ex.Message;
                result.MessageData = ex.StackTrace;
                return result;
            }
        }

        public ResultViewModel<SapInvoiceProvisionCompleteViewModel> SaveInvoiceProvision(SapInvoiceProvisionViewModel model, string lang, IMCController controller)
        {
            var result = new ResultViewModel<SapInvoiceProvisionCompleteViewModel>();
            try
            {
                using (var cli = getHttpClient())
                {
                    var request = new SapRequestViewModel
                    {
                        RequestCode = _provisionRequestCode,
                        RequestData = model.ToJsonString(),
                    };
                    var requestStr = request.ToJsonString();
                    var xml = string.Format(_xmlTemplate, requestStr);
                    var stringContent = new StringContent(xml, Encoding.UTF8, "text/xml");
                    var postTask = cli.PostAsync(_serviceUrl, stringContent);
                    postTask.Wait();
                    var post = postTask.Result;
                    var responseTask = post.Content.ReadAsStringAsync();
                    responseTask.Wait();
                    var response = responseTask.Result;
                    XmlDocument doc = new XmlDocument();
                    doc.LoadXml(response);
                    var resStc = doc.GetElementsByTagName("E_RES_STC")[0];
                    var xmlNode = resStc.SelectNodes("RESULT_STC")[0];

                    SapInvoiceProvisionCompleteViewModel sapResult = new SapInvoiceProvisionCompleteViewModel();
                    sapResult.SapStatus = xmlNode.FirstChild.InnerText;
                    sapResult.SapStatusText = xmlNode.LastChild.InnerText;

                    LogManager.LogAsync(sapResult,eLogType.Info, controller.LogData);

                    result.Response = sapResult;
                    result.isSuccess = sapResult.SapStatus == "S" ? true : false;
                    result.Message = sapResult.SapStatusText;
                    return result;
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = ex.Message;
                result.MessageData = ex.StackTrace;
                return result;
            }
        }
        #endregion
    }
}