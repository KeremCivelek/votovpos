var data = App.Data;
var computed = App.Computed;
var methods = App.Methods;



data.forgot = new Models.Auth.ForgotPasswordViewModel();

methods.cmd_send = function () {
    var th = this;
    var valid = th.$refs.frmForgotPassword.validate();
    if (!valid) {
        return;
    }

    var url = Global.Urls.Auth.api2.AccountApi.ForgotPassword;
    var mdl = th.forgot;
    showLoading();
    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            Swal.fire({
                icon: 'success',
                text: d.Message
            }).then(function (r) {
                if (r.isConfirmed) {
                    showLoading();
                    window.location.href = Global.Urls.Auth.mvc.Default.Index;
                }
            });
        }
        hideLoading();
    }, function (e) {
        console.log(e);
        hideLoading();
    });
};