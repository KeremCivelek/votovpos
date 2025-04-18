using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class SapCustomerViewModel
    {
        [JsonProperty("CUSTOMER_NAME")]
        public string CustomerName { get; set; }
        [JsonProperty("CUSTOMER_CODE")]
        public string CustomerCode { get; set; }
    }
}