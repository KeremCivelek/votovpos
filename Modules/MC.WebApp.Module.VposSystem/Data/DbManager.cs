using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    public static class DbManager
    {
        public static BankManager BankManager { get; private set; } = new BankManager();
        public static CustomerManager CustomerManager { get; private set; } = new CustomerManager();
        public static LoginManager LoginManager { get; private set; } = new LoginManager();
    }
}