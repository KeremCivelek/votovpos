using MC.WebApp.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class PaymentRequestViewModel
    {
        /// <summary>
        /// Sipariş Numarası
        /// </summary>
        [Required(ErrorMessage = "orderNumber alanı zorunludur")]
        [StringLength(maximumLength: 150, MinimumLength = 3, ErrorMessage = "orderNumber alanı {2}-{1} karakter olabilir")]
        public string orderNumber { get; set; }

        /// <summary>
        /// Ödeme işlemi yapan client IP adresi
        /// </summary>
        public string customerIpAddress { get; set; }

        /// <summary>
        /// Satış Bilgisi
        /// </summary>
        [Required(ErrorMessage = "saleInfo alanı zorunludur")]
        public SaleInfoViewModel saleInfo { get; set; }

        /// <summary>
        /// Fatura Adresi Bilgisi
        /// </summary>
        [Required(ErrorMessage = "invoiceInfo alanı zorunludur")]
        public CustomerInfoViewModel invoiceInfo { get; set; }

        /// <summary>
        /// Teslimat Adresi Bilgisi
        /// </summary>
        [Required(ErrorMessage = "shippingInfo alanı zorunludur")]
        public CustomerInfoViewModel shippingInfo { get; set; }

        public bool IsTest { get; set; }
    }
}