using MC.Core;
using MC.WebApp.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public class UserViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

        public static explicit operator User(UserViewModel model)
        {
            if (model.IsNull()) return default;
            var result = new User();
            model.CopyTo(result);
            return result;
        }

        public static implicit operator UserViewModel(User model)
        {
            if (model.IsNull()) return null;
            var result = new UserViewModel();
            model.CopyTo(result);
            return result;
        }
    }
}