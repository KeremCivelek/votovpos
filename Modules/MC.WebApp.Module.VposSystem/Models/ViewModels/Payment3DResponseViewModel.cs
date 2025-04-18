using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class Payment3DResponseViewModel
    {
        public string RequestGuid { get; set; }
        public string TransactionDate { get; set; }
        public string MerchantID { get; set; }
        public string Hash { get; set; }
        public string Currency { get; set; }
        public string PurchAmount { get; set; }
        public string OrderId { get; set; }
        public string ProcReturnCode { get; set; }
        public string ErrMsg { get; set; }
        public string MD { get; set; }
        public string TxnResult { get; set; }
        public string BankCode { get; set; }

        public string CompCode { get; set; }
        public string CustomerCode { get; set; }
    }
}