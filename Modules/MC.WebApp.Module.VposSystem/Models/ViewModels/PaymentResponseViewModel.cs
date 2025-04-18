using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class PaymentResponseViewModel
    {
        /// <summary>
        /// İşlem başarılı mı?
        /// Error = 0,
        /// Success = 1,
        /// RedirectURL = 2,
        /// RedirectHTML = 3,
        /// </summary>
        public eSaleResponseStatus Status { get; set; }

        /// <summary>
        /// İşlem sonucu; Mesaj, link veya HTML döner
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        ///  Sipariş Numarası, (Sizin verdiğiniz)
        /// </summary>
        public string OrderNumber { get; set; }

        /// <summary>
        /// Banka tarafındaki işlem numarası. iptal, iade işlemlerinde kullanılır. İptal, iade yapabilmeniz için kaydetmeniz gerekir.
        /// </summary>
        public string TransactionId { get; set; }

        /// <summary>
        /// Bankalardan verilen cevapların ham datası
        /// </summary>
        public Dictionary<string, object> PrivateResponse { get; set; }
    }
}