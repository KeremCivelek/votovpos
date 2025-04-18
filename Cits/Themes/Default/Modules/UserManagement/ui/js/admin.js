
var data = App.Data;
var methods = App.Methods;


data.role = {
    loading: false,
    search: '',
    headers: [
        {
            text: Lang.str_role_id,
            align: 'start',
            sortable: true,
            value: 'RoleId',
        },
        {
            text: Lang.str_role_name,
            align: 'start',
            sortable: true,
            value: 'RoleName',
        },
        {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'fld_manage',
        }
    ],
    itemList: [],
    editMode: false,
    editItem: {},
    detailMode: false,
    detailItems: [],
    detailheaders: [
        {
            text: Lang.str_permission_name,
            align: 'start',
            sortable: true,
            value: 'PermissionDisplayName',
        },
        {
            text: Lang.str_create,
            align: 'start',
            sortable: true,
            value: 'Create',
        },
        {
            text: Lang.str_read,
            align: 'start',
            sortable: true,
            value: 'Read',
        },
        {
            text: Lang.str_update,
            align: 'start',
            sortable: true,
            value: 'Update',
        },
        {
            text: Lang.str_delete,
            align: 'start',
            sortable: true,
            value: 'Delete',
        },

    ],
    detailsearch: ''
};

data.group = {
    loading: false,
    search: '',
    headers: [
        {
            text: Lang.str_group_id,
            align: 'start',
            sortable: true,
            value: 'GroupId',
        },
        {
            text: Lang.str_group_name,
            align: 'start',
            sortable: true,
            value: 'GroupName',
        },
        {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'fld_manage',
        }
    ],
    itemList: [],
    editMode: false,
    editItem: {},
    detailMode: false,
    detailItems: [],
};

data.user = {
    loading: false,
    search: '',
    headers: [
        {
            text: Lang.str_user_id,
            align: 'start',
            sortable: true,
            value: 'UserId',
        },
        {
            text: Lang.str_user_guid,
            align: 'start',
            sortable: true,
            value: 'UserGuid',
        },
        {
            text: Lang.str_username,
            align: 'start',
            sortable: true,
            value: 'UserName',
        },
        {
            text: Lang.str_active,
            align: 'start',
            sortable: true,
            value: 'IsActive',
        },
        {
            text: '#',
            align: 'center',
            sortable: false,
            value: 'fld_manage',
        }
    ],
    itemList: [],
    editMode: false,
    editItem: {},
    detailItems: [],
};





methods.cmd_load_roles = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.GetRoles;
    th.role.loading = true;
    th.role.itemList = [];
    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.role.itemList = d.Response;
        }
        th.role.loading = false;
    }, function (e) {
        console.log(e);
        th.role.loading = false;
    });
};
methods.cmd_load_groups = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.GetGroups;
    th.group.loading = true;
    th.group.itemList = [];
    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.group.itemList = d.Response;
        }
        th.group.loading = false;
    }, function (e) {
        console.log(e);
        th.group.loading = false;
    });
};
methods.cmd_load_users = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.GetUsers;
    th.user.loading = true;
    th.user.itemList = [];

    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.user.itemList = d.Response;
        }
        th.user.loading = false;
    }, function (e) {
        console.log(e);
        th.user.loading = false;
    });
};

methods.cmd_add_role = function () {
    var th = this;
    th.role.editItem = new Models.UserManagement.RoleViewModel();
    th.role.editItem.editmode = false;///Yeni Ekleme Modu
    th.role.editMode = true;
};
methods.cmd_add_group = function () {
    var th = this;
    th.group.editItem = new Models.UserManagement.GroupViewModel();
    th.group.editItem.editmode = false;///Yeni Ekleme Modu
    th.group.editMode = true;
};
methods.cmd_add_user = function () {
    var th = this;
    th.user.editItem = new Models.UserManagement.UserViewModel();
    th.user.editItem.editmode = false;///Yeni Ekleme Modu
    th.user.editMode = true;
};

methods.cmd_edit_role = function (item) {
    var th = this;
    th.role.editItem = Object.assign(new Models.UserManagement.RoleViewModel(), item);
    th.role.editItem.editmode = true;///düzenleme Modu
    th.role.editMode = true;
};
methods.cmd_edit_group = function (item) {
    var th = this;
    th.group.editItem = Object.assign(new Models.UserManagement.GroupViewModel(), item);
    th.group.editItem.editmode = true;///düzenleme Modu
    th.group.editMode = true;
};
methods.cmd_edit_user = function (item) {
    var th = this;
    th.user.editItem = Object.assign(new Models.UserManagement.UserViewModel(), item);
    th.user.editItem.editmode = true;///düzenleme Modu
    th.user.editMode = true;
};

methods.cmd_delete_role = function (item) {
    var th = this;
    var id = '/' + item.RoleId;
    var url = urls.UserManagement.api2.AdminApi.DeleteRole.replace('/0', id);
    Swal.fire({
        title: Lang.str_role_delete_title,
        icon: 'question',
        html: Lang.str_role_delete_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            th.role.loading = true;
            axios.post(url).then(function (r) {
                var d = r.data;
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    title: Lang.str_role_process_title,
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                th.cmd_load_roles();
            }).catch(function (e) {
                console.log(e);
                th.role.loading = false;
            });
        }
    })
};
methods.cmd_delete_group = function (item) {
    var th = this;
    var id = '/' + item.GroupId;
    var url = urls.UserManagement.api2.AdminApi.DeleteGroup.replace('/0', id);
    Swal.fire({
        title: Lang.str_group_delete_title,
        icon: 'question',
        html: Lang.str_group_delete_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            th.group.loading = true;
            axios.post(url).then(function (r) {
                var d = r.data;
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    title: Lang.str_group_process_title,
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                th.cmd_load_groups();
            }).catch(function (e) {
                console.log(e);
                th.group.loading = false;
            });
        }
    });
};
methods.cmd_delete_user = function (item) {
    var th = this;
    var id = '/' + item.UserId;
    var url = urls.UserManagement.api2.AdminApi.DeleteUser.replace('/0', id);
    Swal.fire({
        title: Lang.str_user_delete_title,
        icon: 'question',
        html: Lang.str_user_delete_message,
        showCancelButton: true,
        confirmButtonText: Lang.str_yes,
        cancelButtonText: Lang.str_no,
    }).then((result) => {
        if (result.isConfirmed) {
            th.user.loading = true;
            axios.post(url).then(function (r) {
                var d = r.data;
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    title: Lang.str_user_process_title,
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                th.cmd_load_users();
            }).catch(function (e) {
                console.log(e);
                th.user.loading = false;
            });
        }
    });
};

methods.cmd_save_role = function () {
    var th = this;
    if (!th.$refs.frmRole.validate()) {
        return;
    }
    var mdl = th.role.editItem;
    var url = urls.UserManagement.api2.AdminApi.AddRole;
    if (mdl.editmode == true) {
        url = urls.UserManagement.api2.AdminApi.UpdateRole;
    }

    ///Diyalog kapansın diye
    th.role.editMode = false;

    th.role.loading = true;

    mc.post(url, mdl, function (d) {
        th.role.loading = false;

        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_role_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
            th.cmd_load_roles();
        }
    }, function (e) {
        console.log(e);
        th.role.loading = false;
    });
};
methods.cmd_save_group = function () {
    var th = this;
    if (!th.$refs.frmGroup.validate()) {
        return;
    }
    var mdl = th.group.editItem;
    var url = urls.UserManagement.api2.AdminApi.AddGroup;
    if (mdl.editmode == true) {
        url = urls.UserManagement.api2.AdminApi.UpdateGroup;
    }

    ///Diyalog kapansın diye
    th.group.editMode = false;

    th.group.loading = true;

    mc.post(url, mdl, function (d) {
        th.group.loading = false;
        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_group_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
            th.cmd_load_groups();
        }
    }, function (e) {
        console.log(e);
        th.group.loading = false;
    });
};
methods.cmd_save_user = function () {
    var th = this;
    if (!th.$refs.frmUser.validate()) {
        return;
    }
    var mdl = th.user.editItem;
    var url = urls.UserManagement.api2.AdminApi.AddUser;
    if (mdl.editmode == true) {
        url = urls.UserManagement.api2.AdminApi.UpdateUser;
    }
    
    ///Diyalog kapansın diye
    th.user.editMode = false;
    th.user.loading = true;

    mc.post(url, mdl, function (d) {
        th.user.loading = false;
        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_user_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
            th.cmd_load_users();
        }
    }, function (e) {
        console.log(e);
        th.user.loading = false;
    });
};


methods.cmd_role_details = function (item) {
    var th = this;
    var id = '/' + item.RoleId;
    var url = urls.UserManagement.api2.AdminApi.GetRolePermissions.replace('/0', id);
    th.role.loading = true;
    th.role.detailItems = [];

    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.role.detailItems = d.Response;
            th.role.detailMode = true;
        }
        th.role.loading = false;
    }, function (e) {
        console.log(e);
        th.role.loading = false;
    });
};
methods.cmd_role_details_save = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.SaveRolePermissions;
    var mdl = th.role.detailItems;
    th.role.detailMode = false;
    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_role_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
    }, function (e) {
        console.log(e);
    });
};

methods.cmd_group_details = function (item) {
    var th = this;
    var id = '/' + item.GroupId;
    var url = urls.UserManagement.api2.AdminApi.GetGroupRoles.replace('/0', id);
    th.group.loading = true;
    th.group.detailItems = [];

    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.group.detailItems = d.Response;
            th.group.detailMode = true;
        }
        th.group.loading = false;
    }, function (e) {
        console.log(e);
        th.group.loading = false;
    });
};
methods.cmd_group_details_save = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.SaveGroupRoles;
    var mdl = th.group.detailItems;
    th.group.detailMode = false;
    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_group_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
    }, function (e) {
        console.log(e);
    });
};

methods.cmd_user_details = function (exp) {
    var th = this;
    if (!exp.value) {
        return;
    }
    var id = '/' + exp.item.UserId;
    var url = urls.UserManagement.api2.AdminApi.GetUserGroups.replace('/0', id);
    th.user.loading = true;
    th.user.detailItems = [];

    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.user.detailItems = d.Response;
            th.user.detailMode = true;
        }
        th.user.loading = false;
    }, function (e) {
        console.log(e);
        th.user.loading = false;
    });
};
methods.cmd_user_details_save = function () {
    var th = this;
    var url = urls.UserManagement.api2.AdminApi.SaveUserGroups;
    var mdl = th.user.detailItems;

    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_user_process_title,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
    }, function (e) {
        console.log(e);
    });
};


App.BeforeMount = function () {
    var th = this;
    th.cmd_load_roles();
    th.cmd_load_groups();
    th.cmd_load_users();
};



//