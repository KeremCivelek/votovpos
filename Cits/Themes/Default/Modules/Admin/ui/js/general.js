


App.Methods.Logout = function () {
    var th = this;

    Swal.fire({
        title: Lang.str_exit_operation,
        icon: 'question',
        html: Lang.str_exit_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            axios.get(urls.Admin.api2.DefaultApi.Logout).then(function (d) {
                var data = d.data;
                window.location.href = data.Url;
            }).catch(function (e) {
                hideLoading();
            });
        }
    })
}
App.Methods.RestartSystem = function () {
    var th = this;
    var url = urls.Admin.api2.DefaultApi.RestartSystem;

    Swal.fire({
        title: Lang.str_system_operation,
        icon: 'question',
        html: Lang.str_system_restart_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            axios.post(url).then(function (d) {
                var data = d.data;
                window.location.href = data.Url;
            }).catch(function (e) {
                hideLoading();
            });
        }
    });
};
