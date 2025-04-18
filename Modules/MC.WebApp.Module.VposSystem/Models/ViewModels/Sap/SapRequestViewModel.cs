using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class SapRequestViewModel
    {
        [JsonProperty("REQUEST_CODE")]
        public string RequestCode { get; set; }
        [JsonProperty("JSON_STRING")]
        public string RequestData { get; set; }
    }
}