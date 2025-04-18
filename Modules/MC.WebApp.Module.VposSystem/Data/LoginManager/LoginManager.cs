using MC.Core;
using MC.Data;
using MC.WebApp.Core;
using MC.WebApp.Models.Auth;
using System;
using System.Web.UI.WebControls;


namespace MC.WebApp.Module.VposSystem
{
    public class LoginManager
    {
        public ResultViewModel Login(string idNumber,  IMCController controller, string token, string lang = "")
        {
            var result = new ResultViewModel();
            try
            {
                var setting = SettingsManager.GetSettings("key_module_vpossystem");
                var authToken = setting.GetString("str_auth_token", "34e9f042-4c2d-437e-932e-38b625e09db6").Trim().ToLower();
                if (!string.Equals(authToken,token.Trim().ToLower()))
                {
                    result.isSuccess = false;
                    result.Message = LanguageManager.Localize("msg_invalid_token", lang);
                    return result;
                }

                using (var db = new MCDb())
                {
                    var user = db.GetWhere<User>(new { UserName = SecurityUtil.Encrypt(idNumber) });
                    if (user.IsNull())
                    {
                        result.isSuccess = false;
                        result.Message = LanguageManager.Localize("msg_user_not_found", lang);
                        return result;
                    }


                    var loginModel = new LoginModel();
                    loginModel.UserName = SecurityUtil.Decrypt(user.UserName);
                    loginModel.Password = SecurityUtil.Decrypt(user.UserPassword);
                    var response = AuthManager.Login(loginModel);
                    result.isSuccess = response.isSuccess;
                    result.Message = response.Message;
                    return result;
                }
            }
            catch (Exception ex)
            {
                LogManager.LogError(ex, controller.LogData);
                result.isSuccess = false;
                result.Message = "Server Error";
                return result;
            }
        }
    }
}