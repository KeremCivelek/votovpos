
var data = App.Data;
var computed = App.Computed;
var methods = App.Methods;
var watch = App.Watch;


data.activate = new Models.Auth.ActivateViewModel();







methods.cmd_activate = function () {
    var th = this;
    var url = Global.Urls.Auth.api2.AccountApi.ResetPassword;
    var mdl = th.activate;
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





