var methods = App.Methods;
var data = App.Data;

methods.Logout = function () {
    var th = this;

    Swal.fire({
        title: Global.Lang.str_exit_operation,
        icon: 'question',
        html: Global.Lang.str_exit_message,
        showCancelButton: true,
        confirmButtonText: Global.Lang.str_yes,
        cancelButtonText: Global.Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            axios.get(Global.Urls.Admin.api2.DefaultApi.Logout).then(function (d) {
                var data = d.data;
                window.location.href = data.Url;
            }).catch(function (e) {
                hideLoading();
            });
        }
    })
}

