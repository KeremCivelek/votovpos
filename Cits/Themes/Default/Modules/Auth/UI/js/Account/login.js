
var data = App.Data;
var computed = App.Computed;
var methods = App.Methods;



data.login = new Models.Auth.LoginViewModel();
computed.returnUrl = function () {
    return Global.QueryStrings['ReturnUrl'] || '/';
};



methods.cmd_login = function () {
    var th = this;
    var isValid = th.$refs.frmLogin.validate();
    if (!isValid) {
        return;
    }
    var url = Global.Urls.Auth.api2.AccountApi.Login;
    var mdl = th.login;

    showLoading();

    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            window.location.href = th.returnUrl;
        } else {
            hideLoading();
        }
        console.log({ d, r: th.returnUrl });
    }, function (e) {
        console.log(e);
        hideLoading();
    });

};



App.BeforeMount = function () {
    var th = this;
};