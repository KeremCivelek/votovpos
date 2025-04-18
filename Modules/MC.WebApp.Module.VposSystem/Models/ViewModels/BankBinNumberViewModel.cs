using MC.Core;
using MC.WebApp.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class BankBinNumberViewModel : IViewModel
    {
        public int BankBinNumberId { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BinNumber { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BankaKodu { get; set; }

        [Required(ErrorMessage = "str_required")]
        public string BankaAdi { get; set; }


        public static explicit operator BankBinNumber(BankBinNumberViewModel model)
        {
            if (model.IsNull()) return default;
            var result = new BankBinNumber();
            model.CopyTo(result);
            return result;
        }

        public static implicit operator BankBinNumberViewModel(BankBinNumber model)
        {
            if(model.IsNull()) return null;
            var result = new BankBinNumberViewModel();
            model.CopyTo(result);
            return result;
        }
    }
}