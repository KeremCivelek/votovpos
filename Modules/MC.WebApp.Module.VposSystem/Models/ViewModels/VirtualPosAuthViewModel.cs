using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class VirtualPosAuthViewModel
    {
        /// <summary>
        /// 4 haneli banka global EFT Kodu, Aktif banka listesine GetBankList methodundan ulaşılabilir
        /// </summary>
        [Required(ErrorMessage = "bankCode alanı zorunludur")]
        [StringLength(maximumLength: 4, MinimumLength = 4, ErrorMessage = "Banka kodu 4 haneden oluşmalıdır")]
        public string BankCode { get; set; }

        /// <summary>
        /// üye İşyeri Kodu
        /// </summary>
        [Required(ErrorMessage = "merchantID alanı zorunludur")]
        public string MerchantId { get; set; }

        /// <summary>
        /// Üye işyeri kullanıcı kodu
        /// </summary>
        [Required(ErrorMessage = "merchantUser alanı zorunludur")]
        public string MerchantUser { get; set; }

        /// <summary>
        /// Üye işyeri şifre
        /// </summary>
        [Required(ErrorMessage = "merchantPassword alanı zorunludur")]
        public string MerchantPassword { get; set; }

        /// <summary>
        /// Üye işyeri anahtarı, Bazı bankalarda 3D kullanabilmek için zorunludur (Nestpay)
        /// </summary>
        public string MerchantStorekey { get; set; }
        public string Model { get; set; }

        public string PostUrl { get; set; }

        public string SuccessUrl { get; set; }
        public string ErrorUrl { get; set; }
        public string TerminalId { get; set; }
    }
}