using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    [Table("BankBinNumbers",Schema = "VposSystem")]
    public class BankBinNumber
    {
        [Key]
        public int BankBinNumberId { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BinNumber { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BankaKodu { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BankaAdi { get; set; }
    }
}