using MC.WebApp.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem.Models
{
    public class SapInvoicesViewModel:IViewModel
    {
        [JsonProperty("COMP_CODE")]
        public string CompanyCode { get; set; }
        [JsonProperty("CUSTOMER_CODE")]
        public string CustomerCode { get; set; }
        [JsonProperty("CURRENCY")]
        public string Currency { get; set; }
        [JsonProperty("DEBIT_AMOUNT")]
        public decimal Amount { get; set; }
        [JsonProperty("PROV_AMOUNT")]
        public decimal ProvAmount { get; set; }

        [JsonProperty("COMP_NAME")]
        public string CompanyName { get; set; }

    }
}