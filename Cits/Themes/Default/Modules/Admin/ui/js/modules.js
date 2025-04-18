

var data = App.Data;
var methods = App.Methods;

data.loading = false;
data.itemList = [];
data.search = '';
data.headers = [
    {
        text: Lang.str_module_id,
        align: 'start',
        sortable: true,
        value: 'ModuleId',
    },
    {
        text: Lang.str_module_name,
        align: 'start',
        sortable: true,
        value: 'ModuleName',
    },
    {
        text: Lang.str_module_version,
        align: 'start',
        sortable: true,
        value: 'Version',
    },
    {
        text: Lang.str_module_direct_ref,
        align: 'center',
        sortable: false,
        value: 'IsDirectReferenced',
    },
    {
        text: Lang.str_module_auto_install,
        align: 'center',
        sortable: false,
        value: 'AutoInstall',
    },
    {
        text: Lang.str_module_installed,
        align: 'center',
        sortable: false,
        value: 'Installed',
    },
    {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'fld_manage',
    }
];

data.manageMode = false;
data.manageUrl = 'about:blank';
data.manageTitle = '';
data.manageLoading = false;

methods.fnk_module_install_uninstall = function (item, t) {
    var th = this;
    if (!item) {
        return true;
    }

    if (item.AutoInstall) {
        return true;
    }

    if (t == 'i' && !!item.Installed) {
        return true;
    }
    if (t == 'u' && !!!item.Installed) {
        return true;
    }
    return false;
}

methods.cmd_manage_module = function (item) {
    var th = this;
    if (item) {
        th.manageUrl = item.ManageUrl;
        th.manageTitle = item.ModuleName;
        th.manageLoading = true;
        th.manageMode = true;
    } else {
        th.manageMode = false;
        th.manageUrl = 'about:blank';
        th.manageTitle = '';
    }
};
methods.cmd_return_module_list = function () {
    var th = this;
    th.manageMode = false;
    th.manageUrl = 'about:blank';
};

methods.cmd_load_modules = function () {
    var th = this;
    var url = urls.Admin.api2.ModulesApi.GetModules;
    th.loading = true;
    axios.get(url).then(function (r) {
        th.itemList = r.data.Response;
        th.loading = false;
    }).catch(function (e) {
        console.log(e);
        th.loading = false;
    });
};
methods.cmd_install_module = function (item) {
    var th = this;
    var id = '/' + item.ModuleId;
    var url = urls.Admin.api2.ModulesApi.InstallModule.replace('/0', id);
    Swal.fire({
        title: Lang.str_module_operation,
        icon: 'question',
        html: Lang.str_module_install_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            axios.post(url).then(function (r) {
                var d = r.data;
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    title: Lang.str_module_operation,
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                hideLoading();
            }).catch(function (e) {
                hideLoading();
            });
        }
    });
};
methods.cmd_uninstall_module = function (item) {
    var th = this;
    var id = '/' + item.ModuleId;
    var url = urls.Admin.api2.ModulesApi.UninstallModule.replace('/0', id);
    Swal.fire({
        title: Lang.str_module_operation,
        icon: 'question',
        html: Lang.str_module_uninstall_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            showLoading();
            axios.post(url).then(function (r) {
                var d = r.data;
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    title: Lang.str_module_operation,
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                hideLoading();
            }).catch(function (e) {
                hideLoading();
            });
        }
    });
};


App.BeforeMount = function () {
    var th = this;
    th.cmd_load_modules();
};