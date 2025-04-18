using MC.WebApp.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class Payment3DViewModel
    {
        /// <summary>
        /// 3D ödeme isteniyorsa true gönderilmelidir
        /// </summary>
        public bool confirm { get; set; }

        /// <summary>
        /// Başarılı veya başarısız ödeme ardından dönüş URL değeri.
        /// </summary>
        public string ReturnURL { get; set; }

        /// <summary>
        /// Masaüstünde kullanıyorsanız true yapmanız gerekir. Masaüstünde PORT açılır ve response beklenir. 
        /// </summary>
        public bool IsDesktop { get; set; }
    }
}