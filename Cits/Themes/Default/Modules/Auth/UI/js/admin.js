
var data = App.Data;
var methods = App.Methods;


data.settings = {
    loading: false,
    editItem: {},
};



//methods.cmd_load_settings = function () {
//    var th = this;
//    var url = urls.Auth.api2.AdminApi.GetSettings;
//    th.settings.loading = true;
//    axios.get(url).then(function (r) {
//        var d = r.data;
//        if (d.isSuccess) {
//            th.settings.editItem = d.Response;
//        } else {
//            Swal.fire({
//                icon: d.isSuccess ? 'success' : 'error',
//                title: Lang.str_settings_action,
//                text: d.Message,
//                confirmButtonText: Lang.str_ok,
//            });
//        }
//        th.settings.loading = false;
//    }).catch(function (e) {
//        console.log(e);
//        th.settings.loading = false;
//    });
//};
//methods.cmd_save_settings = function () {
//    var th = this;
//    var url = urls.Auth.api2.AdminApi.SaveSettings;
//    var mdl = th.settings.editItem;
//    th.settings.loading = true;
//    axios.post(url, mdl).then(function (r) {
//        var d = r.data;
//        Swal.fire({
//            icon: d.isSuccess ? 'success' : 'error',
//            title: Lang.str_settings_action,
//            text: d.Message,
//            confirmButtonText: Lang.str_ok,
//        });
//        th.settings.loading = false;
//    }).catch(function (e) {
//        console.log(e);
//        th.settings.loading = false;
//    })
//};



//App.BeforeMount = function () {
//    var th = this;
//    th.cmd_load_settings();
//};

