


var data = App.Data;
var methods = App.Methods;
var watch = App.Watch;

data.loading = false;

data.themes = {
    loading: false,
    items: [],
    selected: null
};

data.modules = {
    loading: false,
    items: [],
    selected: null
};


data.views = {
    loading: false,
    items: [],
    selected: {}
};

methods.cmd_get_themes = function () {
    var th = this;
    var url = urls.ViewEditor.api2.AdminApi.GetViewThemes;
    th.themes.items = [];
    th.themes.loading = true;
    axios.get(url).then(function (r) {
        var d = r.data;
        if (!d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
        th.themes.items = d.Response;
        th.themes.loading = false;
    }).catch(function (e) {
        console.log(e);
        th.themes.loading = false;
    });
};
methods.cmd_get_modules = function () {
    var th = this;
    th.modules.items = [];
    th.modules.loading = true;
    if (th.themes.selected) {
        var url = urls.ViewEditor.api2.AdminApi.GetViewModules + '&theme=' + th.themes.selected;
        axios.get(url).then(function (r) {
            var d = r.data;
            if (!d.isSuccess) {
                Swal.fire({
                    icon: d.isSuccess ? 'success' : 'error',
                    text: d.Message,
                    confirmButtonText: Lang.str_ok,
                });
            }
            th.modules.items = d.Response;
            th.modules.loading = false;
        }).catch(function (e) {
            console.log(e);
            th.modules.loading = false;
        });
    }

};
methods.cmd_get_views = function () {
    var th = this;
    var url = urls.ViewEditor.api2.AdminApi.GetViews + '&theme=' + th.themes.selected + '&module=' + th.modules.selected;
    th.views.loading = true;
    th.views.items = [];
    axios.get(url).then(function (r) {
        var d = r.data;
        if (!d.isSuccess) {
            Swal.fire({
                icon: d.isSuccess ? 'success' : 'error',
                text: d.Message,
                confirmButtonText: Lang.str_ok,
            });
        }
        th.views.items = d.Response;
        th.views.loading = false;
    }).catch(function (e) {
        console.log(e);
        th.views.loading = false;
    })
};
methods.cmd_edit_view = function (item) {
    var th = this;
    th.views.selected = item;
    window.mcEditor.setValue(item.ViewContent);
};
methods.cmd_save_view = function () {
    var th = this;
    var url = urls.ViewEditor.api2.AdminApi.SaveView;
    var mdl = th.views.selected;
    mdl.ViewContent = window.mcEditor.getValue();
    th.loading = true;
    axios.post(url, mdl).then(function (r) {
        var d = r.data;
        Swal.fire({
            icon: d.isSuccess ? 'success' : 'error',
            title: Lang.str_view_save_title,
            text: d.Message,
            confirmButtonText: Lang.str_ok,
        });
        th.views.selected = {};
        th.loading = false;
    }).catch(function (e) {
        th.loading = false;
        th.views.selected = {};
    });
};
methods.cmd_restore_view = function () {
    var th = this;
    var originalData = th.views.selected.DefaultViewContent;
    window.mcEditor.setValue(originalData);
};


watch['themes.selected'] = function (n, o) {
    var th = this;
    if (n) {
        th.cmd_get_modules();
    } else {

    }
};
watch['modules.selected'] = function (n, o) {
    var th = this;
    if (n) {
        th.cmd_get_views();
    }

};


methods.cmd_create_editor = function (type, content, dispose) {
    var th = this;
    th.$refs.editor.style = '';
    if (window.mcEditor) {
        window.mcEditor.dispose();
        window.mcEditor = undefined;
    }
    if (dispose) {
        return;
    }
    type = type || 'razor';
    var editorDiv = th.$refs.editor;
    window.mcEditor = monaco.editor.create(editorDiv, {
        value: '',
        language: type,
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        theme: 'vs-dark',///"vs" | "vs-dark" | "hc-black"
    });

    if (content) {
        window.mcEditor.setValue(content);
    }
    //////TODO : ilerde component yaparken gerekecek. 
    //window.mcEditor.getModel().onDidChangeContent(function (e, t, i) {
    //    console.clear();
    //    console.log(window.mcEditor.getValue());
    //});

};







App.Methods.OnLoadComplete = function () {
    var th = this;
    th.cmd_create_editor('razor', '', false);
};

App.BeforeMount = function () {
    var th = this;
    th.cmd_get_themes();
};
