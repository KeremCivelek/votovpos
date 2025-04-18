using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class SapETRECSResponseViewModel<T> where T : class
    {
        public T ET_RECS { get; set; }
    }
}