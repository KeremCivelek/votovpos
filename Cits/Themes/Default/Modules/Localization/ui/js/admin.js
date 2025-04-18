
var data = App.Data;
var methods = App.Methods;

data.loading = false;
data.search = '';
data.headers = [
    {
        text: Lang.str_language_id,
        align: 'start',
        sortable: true,
        value: 'LanguageId',
    },
    {
        text: Lang.str_flag,
        align: 'start',
        sortable: true,
        value: 'Flag',
    },
    {
        text: Lang.str_language_code,
        align: 'start',
        sortable: true,
        value: 'LanguageCode',
    },
    {
        text: Lang.str_language_name,
        align: 'start',
        sortable: true,
        value: 'LanguageName',
    },
    {
        text: Lang.str_is_active,
        align: 'start',
        sortable: true,
        value: 'IsActive',
    },
    {
        text: Lang.str_is_default,
        align: 'start',
        sortable: true,
        value: 'IsDefault',
    },
    {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'fld_manage',
    }
];
data.itemList = [];
data.editMode = false;
data.editItem = {};



data.wordsLoading = false;
data.wordSearch = '';
data.wordsHeaders = [
    {
        text: Lang.str_word_id,
        align: 'start',
        sortable: true,
        value: 'LanguageWordId',
    },
    {
        text: Lang.str_word_code,
        align: 'start',
        sortable: true,
        value: 'WordCode',
    },
    {
        text: Lang.str_word_result,
        align: 'start',
        sortable: true,
        value: 'WordResult',
    },
    {
        text: '#',
        align: 'center',
        sortable: false,
        value: 'fld_manage',
    }
];
data.wordList = [];
data.wordsTitle = '';


methods.cmd_load_languages = function () {
    var th = this;
    var url = urls.Localization.api2.AdminApi.GetAllLanguages;
    th.itemList = [];
    th.loading = true;
    axios.get(url).then(function (r) {
        var d = r.data;
        if (d.isSuccess) {
            th.itemList = d.Response;
        }
        th.loading = false;
    }).catch(function (e) {
        console.log(e);
    })
};
methods.cmd_add_language = function () {
    var th = this;
    th.editItem = new Models.Localization.LanguageViewModel();
    th.editMode = true;
};
methods.cmd_edit_language = function (item) {
    var th = this;
    th.editItem = Object.assign(new Models.Localization.LanguageViewModel(), item);
    th.editMode = true;
};
methods.cmd_delete_language = function (item) {
    var th = this;
    var id = '/' + item.LanguageId;
    var url = urls.Localization.api2.AdminApi.DeleteLanguage.replace('/0', id);
    Swal.fire({
        title: Lang.str_language_delete_title,
        icon: 'question',
        html: Lang.str_language_delete_message,
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
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
                th.cmd_load_languages();
                hideLoading();
            }).catch(function (e) {
                console.log(e);
                hideLoading();
            });
        }
    });
};
methods.cmd_refresh_language_cache = function () {
    var th = this;
    var url = urls.Localization.api2.AdminApi.RebuildLanguageCache;
    showLoading();
    axios.post(url).then(function (r) {
        hideLoading();
    }).catch(function (e) {
        hideLoading();
        console.log(e);
    });
};


methods.cmd_back = function () {
    var th = this;
    var th = this;
    th.editMode = false;
};

methods.cmd_saveLanguage = function () {
    var th = this;
    if (!th.$refs.frmLanguage.validate()) {
        return;
    }
    var url = urls.Localization.api2.AdminApi.AddLanguage;
    var mdl = th.editItem;
    if (mdl.LanguageId > 0) {
        url = urls.Localization.api2.AdminApi.UpdateLanguage;
    }
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

        if (d.isSuccess) {
            th.cmd_load_languages();
            th.cmd_back();
        }

    }).catch(function (e) {
        hideLoading();
    })

};



methods.cmd_getwords = function (item) {
    var th = this;
    th.wordsTitle = item.LanguageName

    var id = '/' + item.LanguageId;
    var url = urls.Localization.api2.AdminApi.GetLanguageWords.replace('/0', id);
    th.wordList = [];
    th.wordsLoading = true;
    axios.get(url).then(function (r) {
        var d = r.data;
        if (d.isSuccess) {
            th.wordList = d.Response;
        } else {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                title: Lang.str_system_operation,
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
        th.wordsLoading = false;
    }).catch(function (e) {
        th.wordsLoading = false;
        console.log(e);
    });
};
methods.cmd_save_word = function (item) {
    var th = this;
    var url = urls.Localization.api2.AdminApi.SaveLanguageWord;
    th.wordsLoading = true;
    axios.post(url, item).then(function (r) {
        th.wordsLoading = false;
    }).catch(function (e) {
        console.log(e);
    });

};

App.BeforeMount = function () {
    var th = this;
    th.cmd_load_languages();
};