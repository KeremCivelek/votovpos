

var data = App.Data;
var methods = App.Methods;


data.ChangePasswordData = {
    ShowPassword: false,
    CurrentPassword: '',
    NewPassword1: '',
    NewPassword2: '',
};
methods.cmd_change_password = function () {
    var th = this;
    var url = urls.Admin.api2.SettingsApi.ChangePassword;
    var mdl = th.ChangePasswordData;
    showLoading();
    axios.post(url, mdl).then(function (r) {
        var d = r.data;
        Swal.fire({
            icon: d.isSuccess ? 'success' : 'error',
            title: Lang.str_system_operation,
            text: d.Message,
            confirmButtonText: Lang.str_ok,
        });
        hideLoading();
    }).catch(function (e) {
        hideLoading();
        console.error(e);
    });
};



data.editItem = {};

methods.cmd_load_settings = function () {
    var th = this;
    var url = urls.Admin.api2.SettingsApi.GetSettings;
    axios.get(url).then(function (r) {
        var d = r.data;
        if (d.isSuccess) {
            th.editItem = d.Response;
        } else {
            Swal.fire({
                icon: 'error',
                title: Lang.str_system_operation,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
    }).catch(function (e) {
        console.log(e);
    });
};
methods.cmd_save_settings = function () {
    var th = this;
    var url = urls.Admin.api2.SettingsApi.SaveSettings;
    var mdl = th.editItem;

    showLoading();
    axios.post(url, mdl).then(function (r) {
        var d = r.data;
        Swal.fire({
            icon: d.isSuccess ? 'success' : 'error',
            title: Lang.str_system_operation,
            text: d.Message,
            confirmButtonText: Lang.str_ok,
        });
        hideLoading();
    }).catch(function (e) {
        hideLoading();
        console.log(e);
    });
};



App.BeforeMount = function () {
    var th = this;
    th.cmd_load_settings();
};

