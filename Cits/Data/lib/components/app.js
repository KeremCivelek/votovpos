
var hideLoading = function () {
    var dv = document.getElementById('loadingDiv');
    dv.classList.add('hide');
};

var showLoading = function () {
    var dv = document.getElementById('loadingDiv');
    dv.classList.remove('hide');
};

var Localize = function (key) {
    return Global.Lang[key] || key;
};

var GUID = {
    Empty: '00000000-0000-0000-0000-000000000000',
    NewGuid: function (u) {
        var _getBlock = function (q) {
            var block = (Math.random().toString(16) + '000000000').substr(2, 8);
            if (u) {
                block = block.toUpperCase();
            }
            return q ? '-' + block.substr(0, 4) + '-' + block.substr(4, 4) : block;
        };
        return _getBlock() + _getBlock(true) + _getBlock(true) + _getBlock();
    },
};

String.prototype.appendParam = function (key, value) {
    var th = this;
    var result = th.toString();
    if (key == 'id') {
        result = result.replace('/0', '/' + value);
        return result;
    }
    result = result + '&' + key + '=' + value;
    return result;
}

var apexLocales = [
    {
        "name": "tr",
        "options": {
            "months": [
                "Ocak",
                "Þubat",
                "Mart",
                "Nisan",
                "Mayýs",
                "Haziran",
                "Temmuz",
                "Aðustos",
                "Eylül",
                "Ekim",
                "Kasým",
                "Aralýk"
            ],
            "shortMonths": [
                "Oca",
                "Þub",
                "Mar",
                "Nis",
                "May",
                "Haz",
                "Tem",
                "Aðu",
                "Eyl",
                "Eki",
                "Kas",
                "Ara"
            ],
            "days": [
                "Pazar",
                "Pazartesi",
                "Salý",
                "Çarþamba",
                "Perþembe",
                "Cuma",
                "Cumartesi"
            ],
            "shortDays": ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            "toolbar": {
                "exportToSVG": "SVG",
                "exportToPNG": "PNG",
                "exportToCSV": "CSV",
                "menu": "Menü",
                "selection": "Seçim",
                "selectionZoom": "Seçim Yakýnlaþtýr",
                "zoomIn": "Yakýnlaþtýr",
                "zoomOut": "Uzaklaþtýr",
                "pan": "Kaydýr",
                "reset": "Yakýnlaþtýrmayý Sýfýrla"
            }
        }
    }
];



if (typeof (Models) == 'undefined') { var Models = {}; }

var mc = {
    defaults: {
        debug: false,
        msgTimeout: 10000,
        headers: {
            Accept: 'application/json, text/plain, */*',
            Sender: 'MC application'
        }
    },
    init: function () {
        axios.defaults.headers.common = this.defaults.headers;
    },
    get: function () {
        var th = this;
        th.init();
        var get = function (url, data, success, error) {
            try {

                url = url || '';
                data = data || {};
                success = success || function (d) { };
                error = error || function (d) { };

                var errorMsg = function ($e) {
                    if (typeof (Swal) == 'function') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: $e.code,
                            html: $e.message,
                            showConfirmButton: true,
                            timer: th.defaults.msgTimeout,
                            timerProgressBar: true,
                            toast: true
                        });
                    } else {
                        console.error($e);
                    }
                };


                axios.get(url, data).then(function ($response) {
                    var d = $response.data;
                    if (d.hasOwnProperty('isSuccess') && d.hasOwnProperty('Message') && d.hasOwnProperty('Response') && d.hasOwnProperty('Url') && d.hasOwnProperty('ErrorCode')) {
                        if (!d.isSuccess) {
                            if (typeof (Swal) == 'function') {
                                Swal.fire({
                                    //position: 'top-end',
                                    icon: 'error',
                                    title: d.Message,
                                    html: d.MessageData,
                                    showConfirmButton: true,
                                    timer: th.defaults.msgTimeout,
                                    timerProgressBar: true,
                                    toast: false
                                });
                            } else {
                                alert(d.Message);
                            }
                        }
                        success(d);
                    } else {
                        success(d);
                    }
                }).catch(function ($error) {
                    error($error);
                    errorMsg($error);
                });
            } catch ($e) {
                error($e);
                errorMsg($e);
            }
        };

        var urlData = function (url, data) {
            get(url, data);
        };

        var urlCallback = function (url, callback) {
            get(url, {}, callback);
        };

        var urlDataCallback = function (url, data, callback) {
            get(url, data, callback);
        };

        var urlCallbackError = function (url, callback, error) {
            get(url, {}, callback, error);
        };

        var urlDataCallbackError = function (url, data, callback, error) {
            get(url, data, callback, error);
        };

        if (arguments.length === 2) {
            if (typeof (arguments[1]) == 'function') {
                urlCallback(arguments[0], arguments[1]);
            } else {
                urlData(arguments[0], arguments[1]);
            }
        }
        else if (arguments.length === 3) {
            if (typeof (arguments[1]) == 'function') {
                urlCallbackError(arguments[0], arguments[1], arguments[2]);
            } else {
                urlDataCallback(arguments[0], arguments[1], arguments[2]);
            }
        }
        else if (arguments.length === 4) {
            urlDataCallbackError(arguments[0], arguments[1], arguments[2], arguments[3]);
        }
        else {
            throw 'NotSupport';
        }
    },
    post: function () {
        var th = this;
        th.init();

        var post = function (url, data, success, error) {
            try {

                url = url || '';
                data = data || {};
                success = success || function (d) { };
                error = error || function (d) { };

                var errorMsg = function ($e) {
                    if (typeof (Swal) == 'function') {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: $e.code,
                            html: $e.message,
                            showConfirmButton: true,
                            timer: th.defaults.msgTimeout,
                            timerProgressBar: true,
                            toast: true
                        });
                    } else {
                        console.error($e);
                    }
                };


                axios.post(url, data).then(function ($response) {
                    var d = $response.data;
                    if (d.hasOwnProperty('isSuccess') && d.hasOwnProperty('Message') && d.hasOwnProperty('Response') && d.hasOwnProperty('Url') && d.hasOwnProperty('ErrorCode')) {
                        if (!d.isSuccess) {
                            if (typeof (Swal) == 'function') {
                                Swal.fire({
                                    //position: 'top-end',
                                    icon: 'error',
                                    title: d.Message,
                                    html: d.MessageData,
                                    showConfirmButton: true,
                                    timer: th.defaults.msgTimeout,
                                    timerProgressBar: true,
                                    toast: false
                                });
                            } else {
                                alert(d.Message);
                            }
                        }
                        success(d);
                    } else {
                        success(d);
                    }
                }).catch(function ($error) {
                    error($error);
                    errorMsg($error);
                });
            } catch ($e) {
                error($e);
                errorMsg($e);
            }
        };

        var urlData = function (url, data) {
            post(url, data);
        };

        var urlCallback = function (url, callback) {
            post(url, {}, callback);
        };

        var urlDataCallback = function (url, data, callback) {
            post(url, data, callback);
        };

        var urlCallbackError = function (url, callback, error) {
            post(url, {}, callback, error);
        };

        var urlDataCallbackError = function (url, data, callback, error) {
            post(url, data, callback, error);
        };

        if (arguments.length === 2) {
            if (typeof (arguments[1]) == 'function') {
                urlCallback(arguments[0], arguments[1]);
            } else {
                urlData(arguments[0], arguments[1]);
            }
        }
        else if (arguments.length === 3) {
            if (typeof (arguments[1]) == 'function') {
                urlCallbackError(arguments[0], arguments[1], arguments[2]);
            } else {
                urlDataCallback(arguments[0], arguments[1], arguments[2]);
            }
        }
        else if (arguments.length === 4) {
            urlDataCallbackError(arguments[0], arguments[1], arguments[2], arguments[3]);
        }
        else {
            throw 'NotSupport';
        }
    },
    postFile: function () {
        var th = this;
        th.init();

        var post = function (url, data, success, error) {

            url = url || '';
            data = data || new FormData();
            success = success || function (d) { };
            error = error || function (d) { };

            var errorMsg = function ($e) {
                if (typeof (Swal) == 'function') {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: $e.code,
                        html: $e.message,
                        showConfirmButton: true,
                        timer: th.defaults.msgTimeout,
                        timerProgressBar: true,
                        toast: true
                    });
                } else {
                    console.error($e);
                }
            };

            try {
                if (!(data instanceof FormData)) {
                    errorMsg({ code: 1, message: 'Post data must be FormData type' });
                    return;
                }
                axios({
                    method: "POST",
                    url: url,
                    data: data,
                    headers: {
                        'Content-Type': 'multipart/form-data;'
                    }
                }).then(function ($response) {
                    var d = $response.data;
                    if (d.hasOwnProperty('isSuccess') && d.hasOwnProperty('Message') && d.hasOwnProperty('Response') && d.hasOwnProperty('Url') && d.hasOwnProperty('ErrorCode')) {
                        if (!d.isSuccess) {
                            if (typeof (Swal) == 'function') {
                                Swal.fire({
                                    //position: 'top-end',
                                    icon: 'error',
                                    title: d.Message,
                                    html: d.MessageData,
                                    showConfirmButton: true,
                                    timer: th.defaults.msgTimeout,
                                    timerProgressBar: true,
                                    toast: false
                                });
                            } else {
                                alert(d.Message);
                            }
                        }
                        success(d);
                    } else {
                        success(d);
                    }
                }).catch(function ($error) {
                    error($error);
                    errorMsg($error);
                });
            } catch ($e) {
                error($e);
                errorMsg($e);
            }
        };

        var urlData = function (url, data) {
            post(url, data);
        };

        var urlCallback = function (url, callback) {
            post(url, {}, callback);
        };

        var urlDataCallback = function (url, data, callback) {
            post(url, data, callback);
        };

        var urlCallbackError = function (url, callback, error) {
            post(url, {}, callback, error);
        };

        var urlDataCallbackError = function (url, data, callback, error) {
            post(url, data, callback, error);
        };

        if (arguments.length === 2) {
            if (typeof (arguments[1]) == 'function') {
                urlCallback(arguments[0], arguments[1]);
            } else {
                urlData(arguments[0], arguments[1]);
            }
        }
        else if (arguments.length === 3) {
            if (typeof (arguments[1]) == 'function') {
                urlCallbackError(arguments[0], arguments[1], arguments[2]);
            } else {
                urlDataCallback(arguments[0], arguments[1], arguments[2]);
            }
        }
        else if (arguments.length === 4) {
            urlDataCallbackError(arguments[0], arguments[1], arguments[2], arguments[3]);
        }
        else {
            throw 'NotSupport';
        }
    },
};



var App = {};
App.Components = {};
App.Data = {
    debug: false,
    mc: mc,
    genders: [
        {
            Text: Localize('str_male'),
            Value: 1
        },
        {
            Text: Localize('str_female'),
            Value: 2
        }
    ],
    LeftBar: false,
    RightBar: false,
    FlagIcons: [
        'flag-icon flag-icon-ad',
        'flag-icon flag-icon-ae',
        'flag-icon flag-icon-af',
        'flag-icon flag-icon-ag',
        'flag-icon flag-icon-ai',
        'flag-icon flag-icon-al',
        'flag-icon flag-icon-am',
        'flag-icon flag-icon-ao',
        'flag-icon flag-icon-aq',
        'flag-icon flag-icon-ar',
        'flag-icon flag-icon-as',
        'flag-icon flag-icon-at',
        'flag-icon flag-icon-au',
        'flag-icon flag-icon-aw',
        'flag-icon flag-icon-ax',
        'flag-icon flag-icon-az',
        'flag-icon flag-icon-ba',
        'flag-icon flag-icon-bb',
        'flag-icon flag-icon-bd',
        'flag-icon flag-icon-be',
        'flag-icon flag-icon-bf',
        'flag-icon flag-icon-bg',
        'flag-icon flag-icon-bh',
        'flag-icon flag-icon-bi',
        'flag-icon flag-icon-bj',
        'flag-icon flag-icon-bl',
        'flag-icon flag-icon-bm',
        'flag-icon flag-icon-bn',
        'flag-icon flag-icon-bo',
        'flag-icon flag-icon-bq',
        'flag-icon flag-icon-br',
        'flag-icon flag-icon-bs',
        'flag-icon flag-icon-bt',
        'flag-icon flag-icon-bv',
        'flag-icon flag-icon-bw',
        'flag-icon flag-icon-by',
        'flag-icon flag-icon-bz',
        'flag-icon flag-icon-ca',
        'flag-icon flag-icon-cc',
        'flag-icon flag-icon-cd',
        'flag-icon flag-icon-cf',
        'flag-icon flag-icon-cg',
        'flag-icon flag-icon-ch',
        'flag-icon flag-icon-ci',
        'flag-icon flag-icon-ck',
        'flag-icon flag-icon-cl',
        'flag-icon flag-icon-cm',
        'flag-icon flag-icon-cn',
        'flag-icon flag-icon-co',
        'flag-icon flag-icon-cr',
        'flag-icon flag-icon-cu',
        'flag-icon flag-icon-cv',
        'flag-icon flag-icon-cw',
        'flag-icon flag-icon-cx',
        'flag-icon flag-icon-cy',
        'flag-icon flag-icon-cz',
        'flag-icon flag-icon-de',
        'flag-icon flag-icon-dj',
        'flag-icon flag-icon-dk',
        'flag-icon flag-icon-dm',
        'flag-icon flag-icon-do',
        'flag-icon flag-icon-dz',
        'flag-icon flag-icon-ec',
        'flag-icon flag-icon-ee',
        'flag-icon flag-icon-eg',
        'flag-icon flag-icon-eh',
        'flag-icon flag-icon-er',
        'flag-icon flag-icon-es-ca',
        'flag-icon flag-icon-es-ga',
        'flag-icon flag-icon-es',
        'flag-icon flag-icon-et',
        'flag-icon flag-icon-eu',
        'flag-icon flag-icon-fi',
        'flag-icon flag-icon-fj',
        'flag-icon flag-icon-fk',
        'flag-icon flag-icon-fm',
        'flag-icon flag-icon-fo',
        'flag-icon flag-icon-fr',
        'flag-icon flag-icon-ga',
        'flag-icon flag-icon-gb-eng',
        'flag-icon flag-icon-gb-nir',
        'flag-icon flag-icon-gb-sct',
        'flag-icon flag-icon-gb-wls',
        'flag-icon flag-icon-gb',
        'flag-icon flag-icon-gd',
        'flag-icon flag-icon-ge',
        'flag-icon flag-icon-gf',
        'flag-icon flag-icon-gg',
        'flag-icon flag-icon-gh',
        'flag-icon flag-icon-gi',
        'flag-icon flag-icon-gl',
        'flag-icon flag-icon-gm',
        'flag-icon flag-icon-gn',
        'flag-icon flag-icon-gp',
        'flag-icon flag-icon-gq',
        'flag-icon flag-icon-gr',
        'flag-icon flag-icon-gs',
        'flag-icon flag-icon-gt',
        'flag-icon flag-icon-gu',
        'flag-icon flag-icon-gw',
        'flag-icon flag-icon-gy',
        'flag-icon flag-icon-hk',
        'flag-icon flag-icon-hm',
        'flag-icon flag-icon-hn',
        'flag-icon flag-icon-hr',
        'flag-icon flag-icon-ht',
        'flag-icon flag-icon-hu',
        'flag-icon flag-icon-id',
        'flag-icon flag-icon-ie',
        'flag-icon flag-icon-il',
        'flag-icon flag-icon-im',
        'flag-icon flag-icon-in',
        'flag-icon flag-icon-io',
        'flag-icon flag-icon-iq',
        'flag-icon flag-icon-ir',
        'flag-icon flag-icon-is',
        'flag-icon flag-icon-it',
        'flag-icon flag-icon-je',
        'flag-icon flag-icon-jm',
        'flag-icon flag-icon-jo',
        'flag-icon flag-icon-jp',
        'flag-icon flag-icon-ke',
        'flag-icon flag-icon-kg',
        'flag-icon flag-icon-kh',
        'flag-icon flag-icon-ki',
        'flag-icon flag-icon-km',
        'flag-icon flag-icon-kn',
        'flag-icon flag-icon-kp',
        'flag-icon flag-icon-kr',
        'flag-icon flag-icon-kw',
        'flag-icon flag-icon-ky',
        'flag-icon flag-icon-kz',
        'flag-icon flag-icon-la',
        'flag-icon flag-icon-lb',
        'flag-icon flag-icon-lc',
        'flag-icon flag-icon-li',
        'flag-icon flag-icon-lk',
        'flag-icon flag-icon-lr',
        'flag-icon flag-icon-ls',
        'flag-icon flag-icon-lt',
        'flag-icon flag-icon-lu',
        'flag-icon flag-icon-lv',
        'flag-icon flag-icon-ly',
        'flag-icon flag-icon-ma',
        'flag-icon flag-icon-mc',
        'flag-icon flag-icon-md',
        'flag-icon flag-icon-me',
        'flag-icon flag-icon-mf',
        'flag-icon flag-icon-mg',
        'flag-icon flag-icon-mh',
        'flag-icon flag-icon-mk',
        'flag-icon flag-icon-ml',
        'flag-icon flag-icon-mm',
        'flag-icon flag-icon-mn',
        'flag-icon flag-icon-mo',
        'flag-icon flag-icon-mp',
        'flag-icon flag-icon-mq',
        'flag-icon flag-icon-mr',
        'flag-icon flag-icon-ms',
        'flag-icon flag-icon-mt',
        'flag-icon flag-icon-mu',
        'flag-icon flag-icon-mv',
        'flag-icon flag-icon-mw',
        'flag-icon flag-icon-mx',
        'flag-icon flag-icon-my',
        'flag-icon flag-icon-mz',
        'flag-icon flag-icon-na',
        'flag-icon flag-icon-nc',
        'flag-icon flag-icon-ne',
        'flag-icon flag-icon-nf',
        'flag-icon flag-icon-ng',
        'flag-icon flag-icon-ni',
        'flag-icon flag-icon-nl',
        'flag-icon flag-icon-no',
        'flag-icon flag-icon-np',
        'flag-icon flag-icon-nr',
        'flag-icon flag-icon-nu',
        'flag-icon flag-icon-nz',
        'flag-icon flag-icon-om',
        'flag-icon flag-icon-pa',
        'flag-icon flag-icon-pe',
        'flag-icon flag-icon-pf',
        'flag-icon flag-icon-pg',
        'flag-icon flag-icon-ph',
        'flag-icon flag-icon-pk',
        'flag-icon flag-icon-pl',
        'flag-icon flag-icon-pm',
        'flag-icon flag-icon-pn',
        'flag-icon flag-icon-pr',
        'flag-icon flag-icon-ps',
        'flag-icon flag-icon-pt',
        'flag-icon flag-icon-pw',
        'flag-icon flag-icon-py',
        'flag-icon flag-icon-qa',
        'flag-icon flag-icon-re',
        'flag-icon flag-icon-ro',
        'flag-icon flag-icon-rs',
        'flag-icon flag-icon-ru',
        'flag-icon flag-icon-rw',
        'flag-icon flag-icon-sa',
        'flag-icon flag-icon-sb',
        'flag-icon flag-icon-sc',
        'flag-icon flag-icon-sd',
        'flag-icon flag-icon-se',
        'flag-icon flag-icon-sg',
        'flag-icon flag-icon-sh',
        'flag-icon flag-icon-si',
        'flag-icon flag-icon-sj',
        'flag-icon flag-icon-sk',
        'flag-icon flag-icon-sl',
        'flag-icon flag-icon-sm',
        'flag-icon flag-icon-sn',
        'flag-icon flag-icon-so',
        'flag-icon flag-icon-sr',
        'flag-icon flag-icon-ss',
        'flag-icon flag-icon-st',
        'flag-icon flag-icon-sv',
        'flag-icon flag-icon-sx',
        'flag-icon flag-icon-sy',
        'flag-icon flag-icon-sz',
        'flag-icon flag-icon-tc',
        'flag-icon flag-icon-td',
        'flag-icon flag-icon-tf',
        'flag-icon flag-icon-tg',
        'flag-icon flag-icon-th',
        'flag-icon flag-icon-tj',
        'flag-icon flag-icon-tk',
        'flag-icon flag-icon-tl',
        'flag-icon flag-icon-tm',
        'flag-icon flag-icon-tn',
        'flag-icon flag-icon-to',
        'flag-icon flag-icon-tr',
        'flag-icon flag-icon-tt',
        'flag-icon flag-icon-tv',
        'flag-icon flag-icon-tw',
        'flag-icon flag-icon-tz',
        'flag-icon flag-icon-ua',
        'flag-icon flag-icon-ug',
        'flag-icon flag-icon-um',
        'flag-icon flag-icon-un',
        'flag-icon flag-icon-us',
        'flag-icon flag-icon-uy',
        'flag-icon flag-icon-uz',
        'flag-icon flag-icon-va',
        'flag-icon flag-icon-vc',
        'flag-icon flag-icon-ve',
        'flag-icon flag-icon-vg',
        'flag-icon flag-icon-vi',
        'flag-icon flag-icon-vn',
        'flag-icon flag-icon-vu',
        'flag-icon flag-icon-wf',
        'flag-icon flag-icon-ws',
        'flag-icon flag-icon-xk',
        'flag-icon flag-icon-ye',
        'flag-icon flag-icon-yt',
        'flag-icon flag-icon-za',
        'flag-icon flag-icon-zm',
        'flag-icon flag-icon-zw',
    ],
    CKEditor: {
        LiteConfig: {
            allowedContent: true,
            filebrowserBrowseUrl: '/browser/browse.php',
            filebrowserUploadUrl: '/uploader/upload.php',
            filebrowserWindowWidth: '640',
            filebrowserWindowHeight: '480',
            toolbarGroups: [
                { name: 'clipboard', groups: ['clipboard', 'undo'] },
                { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                { name: 'forms', groups: ['forms'] },
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'paragraph', groups: ['indent', 'blocks', 'align', 'list', 'bidi', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },

                { name: 'styles', groups: ['styles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'tools', groups: ['tools'] },
                { name: 'others', groups: ['others'] },
                { name: 'document', groups: ['mode', 'document', 'doctools'] }
            ],
            removeButtons: 'Save,NewPage,ExportPdf,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Subscript,Superscript,CopyFormatting,RemoveFormat,Outdent,Indent,Blockquote,CreateDiv,BidiLtr,BidiRtl,Language,Flash,PageBreak,Iframe,Maximize,ShowBlocks,SpecialChar,Smiley,Table,HorizontalRule,Anchor,About,Unlink,Link'
        },
        StandartConfig: {
            allowedContent: true,
            removeFormatAttributes: '',
            extraPlugins: 'youtube',
            filebrowserBrowseUrl: '/browser/browse.php',
            filebrowserUploadUrl: '/uploader/upload.php',
            filebrowserWindowWidth: '640',
            filebrowserWindowHeight: '480',
            toolbarGroups: [
                { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                { name: 'links', groups: ['links'] },
                { name: 'insert', groups: ['insert'] },
                '/',
                { name: 'styles', groups: ['styles'] },
                { name: 'colors', groups: ['colors'] },
                { name: 'tools', groups: ['tools'] },
                { name: 'others', groups: ['others'] },
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
            ],
            removeButtons: 'Save,NewPage,ExportPdf,Preview,Print,Templates,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,BidiLtr,BidiRtl,Language,Anchor,Flash,Smiley,SpecialChar,PageBreak,Iframe,About'
        },
    },
    FontAwesome4Icons: ['-', '<i class="fa fa-address-book"></i>', '<i class="fa fa-address-book-o"></i>', '<i class="fa fa-address-card"></i>', '<i class="fa fa-address-card-o"></i>', '<i class="fa fa-bandcamp"></i>', '<i class="fa fa-bath"></i>', '<i class="fa fa-bathtub"></i>', '<i class="fa fa-drivers-license"></i>', '<i class="fa fa-drivers-license-o"></i>', '<i class="fa fa-eercast"></i>', '<i class="fa fa-envelope-open"></i>', '<i class="fa fa-envelope-open-o"></i>', '<i class="fa fa-etsy"></i>', '<i class="fa fa-free-code-camp"></i>', '<i class="fa fa-grav"></i>', '<i class="fa fa-handshake-o"></i>', '<i class="fa fa-id-badge"></i>', '<i class="fa fa-id-card"></i>', '<i class="fa fa-id-card-o"></i>', '<i class="fa fa-imdb"></i>', '<i class="fa fa-linode"></i>', '<i class="fa fa-meetup"></i>', '<i class="fa fa-microchip"></i>', '<i class="fa fa-podcast"></i>', '<i class="fa fa-quora"></i>', '<i class="fa fa-ravelry"></i>', '<i class="fa fa-s15"></i>', '<i class="fa fa-shower"></i>', '<i class="fa fa-snowflake-o"></i>', '<i class="fa fa-superpowers"></i>', '<i class="fa fa-telegram"></i>', '<i class="fa fa-thermometer"></i>', '<i class="fa fa-thermometer-0"></i>', '<i class="fa fa-thermometer-1"></i>', '<i class="fa fa-thermometer-2"></i>', '<i class="fa fa-thermometer-3"></i>', '<i class="fa fa-thermometer-4"></i>', '<i class="fa fa-thermometer-empty"></i>', '<i class="fa fa-thermometer-full"></i>', '<i class="fa fa-thermometer-half"></i>', '<i class="fa fa-thermometer-quarter"></i>', '<i class="fa fa-thermometer-three-quarters"></i>', '<i class="fa fa-times-rectangle"></i>', '<i class="fa fa-times-rectangle-o"></i>', '<i class="fa fa-user-circle"></i>', '<i class="fa fa-user-circle-o"></i>', '<i class="fa fa-user-o"></i>', '<i class="fa fa-vcard"></i>', '<i class="fa fa-vcard-o"></i>', '<i class="fa fa-window-close"></i>', '<i class="fa fa-window-close-o"></i>', '<i class="fa fa-window-maximize"></i>', '<i class="fa fa-window-minimize"></i>', '<i class="fa fa-window-restore"></i>', '<i class="fa fa-wpexplorer"></i>', '<i class="fa fa-address-book"></i>', '<i class="fa fa-address-book-o"></i>', '<i class="fa fa-address-card"></i>', '<i class="fa fa-address-card-o"></i>', '<i class="fa fa-adjust"></i>', '<i class="fa fa-american-sign-language-interpreting"></i>', '<i class="fa fa-anchor"></i>', '<i class="fa fa-archive"></i>', '<i class="fa fa-area-chart"></i>', '<i class="fa fa-arrows"></i>', '<i class="fa fa-arrows-h"></i>', '<i class="fa fa-arrows-v"></i>', '<i class="fa fa-asl-interpreting"></i>', '<i class="fa fa-assistive-listening-systems"></i>', '<i class="fa fa-asterisk"></i>', '<i class="fa fa-at"></i>', '<i class="fa fa-audio-description"></i>', '<i class="fa fa-automobile"></i>', '<i class="fa fa-balance-scale"></i>', '<i class="fa fa-ban"></i>', '<i class="fa fa-bank"></i>', '<i class="fa fa-bar-chart"></i>', '<i class="fa fa-bar-chart-o"></i>', '<i class="fa fa-barcode"></i>', '<i class="fa fa-bars"></i>', '<i class="fa fa-bath"></i>', '<i class="fa fa-bathtub"></i>', '<i class="fa fa-battery"></i>', '<i class="fa fa-battery-0"></i>', '<i class="fa fa-battery-1"></i>', '<i class="fa fa-battery-2"></i>', '<i class="fa fa-battery-3"></i>', '<i class="fa fa-battery-4"></i>', '<i class="fa fa-battery-empty"></i>', '<i class="fa fa-battery-full"></i>', '<i class="fa fa-battery-half"></i>', '<i class="fa fa-battery-quarter"></i>', '<i class="fa fa-battery-three-quarters"></i>', '<i class="fa fa-bed"></i>', '<i class="fa fa-beer"></i>', '<i class="fa fa-bell"></i>', '<i class="fa fa-bell-o"></i>', '<i class="fa fa-bell-slash"></i>', '<i class="fa fa-bell-slash-o"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-binoculars"></i>', '<i class="fa fa-birthday-cake"></i>', '<i class="fa fa-blind"></i>', '<i class="fa fa-bluetooth"></i>', '<i class="fa fa-bluetooth-b"></i>', '<i class="fa fa-bolt"></i>', '<i class="fa fa-bomb"></i>', '<i class="fa fa-book"></i>', '<i class="fa fa-bookmark"></i>', '<i class="fa fa-bookmark-o"></i>', '<i class="fa fa-braille"></i>', '<i class="fa fa-briefcase"></i>', '<i class="fa fa-bug"></i>', '<i class="fa fa-building"></i>', '<i class="fa fa-building-o"></i>', '<i class="fa fa-bullhorn"></i>', '<i class="fa fa-bullseye"></i>', '<i class="fa fa-bus"></i>', '<i class="fa fa-cab"></i>', '<i class="fa fa-calculator"></i>', '<i class="fa fa-calendar"></i>', '<i class="fa fa-calendar-check-o"></i>', '<i class="fa fa-calendar-minus-o"></i>', '<i class="fa fa-calendar-o"></i>', '<i class="fa fa-calendar-plus-o"></i>', '<i class="fa fa-calendar-times-o"></i>', '<i class="fa fa-camera"></i>', '<i class="fa fa-camera-retro"></i>', '<i class="fa fa-car"></i>', '<i class="fa fa-caret-square-o-down"></i>', '<i class="fa fa-caret-square-o-left"></i>', '<i class="fa fa-caret-square-o-right"></i>', '<i class="fa fa-caret-square-o-up"></i>', '<i class="fa fa-cart-arrow-down"></i>', '<i class="fa fa-cart-plus"></i>', '<i class="fa fa-cc"></i>', '<i class="fa fa-certificate"></i>', '<i class="fa fa-check"></i>', '<i class="fa fa-check-circle"></i>', '<i class="fa fa-check-circle-o"></i>', '<i class="fa fa-check-square"></i>', '<i class="fa fa-check-square-o"></i>', '<i class="fa fa-child"></i>', '<i class="fa fa-circle"></i>', '<i class="fa fa-circle-o"></i>', '<i class="fa fa-circle-o-notch"></i>', '<i class="fa fa-circle-thin"></i>', '<i class="fa fa-clock-o"></i>', '<i class="fa fa-clone"></i>', '<i class="fa fa-close"></i>', '<i class="fa fa-cloud"></i>', '<i class="fa fa-cloud-download"></i>', '<i class="fa fa-cloud-upload"></i>', '<i class="fa fa-code"></i>', '<i class="fa fa-code-fork"></i>', '<i class="fa fa-coffee"></i>', '<i class="fa fa-cog"></i>', '<i class="fa fa-cogs"></i>', '<i class="fa fa-comment"></i>', '<i class="fa fa-comment-o"></i>', '<i class="fa fa-commenting"></i>', '<i class="fa fa-commenting-o"></i>', '<i class="fa fa-comments"></i>', '<i class="fa fa-comments-o"></i>', '<i class="fa fa-compass"></i>', '<i class="fa fa-copyright"></i>', '<i class="fa fa-creative-commons"></i>', '<i class="fa fa-credit-card"></i>', '<i class="fa fa-credit-card-alt"></i>', '<i class="fa fa-crop"></i>', '<i class="fa fa-crosshairs"></i>', '<i class="fa fa-cube"></i>', '<i class="fa fa-cubes"></i>', '<i class="fa fa-cutlery"></i>', '<i class="fa fa-dashboard"></i>', '<i class="fa fa-database"></i>', '<i class="fa fa-deaf"></i>', '<i class="fa fa-deafness"></i>', '<i class="fa fa-desktop"></i>', '<i class="fa fa-diamond"></i>', '<i class="fa fa-dot-circle-o"></i>', '<i class="fa fa-download"></i>', '<i class="fa fa-drivers-license"></i>', '<i class="fa fa-drivers-license-o"></i>', '<i class="fa fa-edit"></i>', '<i class="fa fa-ellipsis-h"></i>', '<i class="fa fa-ellipsis-v"></i>', '<i class="fa fa-envelope"></i>', '<i class="fa fa-envelope-o"></i>', '<i class="fa fa-envelope-open"></i>', '<i class="fa fa-envelope-open-o"></i>', '<i class="fa fa-envelope-square"></i>', '<i class="fa fa-eraser"></i>', '<i class="fa fa-exchange"></i>', '<i class="fa fa-exclamation"></i>', '<i class="fa fa-exclamation-circle"></i>', '<i class="fa fa-exclamation-triangle"></i>', '<i class="fa fa-external-link"></i>', '<i class="fa fa-external-link-square"></i>', '<i class="fa fa-eye"></i>', '<i class="fa fa-eye-slash"></i>', '<i class="fa fa-eyedropper"></i>', '<i class="fa fa-fax"></i>', '<i class="fa fa-feed"></i>', '<i class="fa fa-female"></i>', '<i class="fa fa-fighter-jet"></i>', '<i class="fa fa-file-archive-o"></i>', '<i class="fa fa-file-audio-o"></i>', '<i class="fa fa-file-code-o"></i>', '<i class="fa fa-file-excel-o"></i>', '<i class="fa fa-file-image-o"></i>', '<i class="fa fa-file-movie-o"></i>', '<i class="fa fa-file-pdf-o"></i>', '<i class="fa fa-file-photo-o"></i>', '<i class="fa fa-file-picture-o"></i>', '<i class="fa fa-file-powerpoint-o"></i>', '<i class="fa fa-file-sound-o"></i>', '<i class="fa fa-file-video-o"></i>', '<i class="fa fa-file-word-o"></i>', '<i class="fa fa-file-zip-o"></i>', '<i class="fa fa-film"></i>', '<i class="fa fa-filter"></i>', '<i class="fa fa-fire"></i>', '<i class="fa fa-fire-extinguisher"></i>', '<i class="fa fa-flag"></i>', '<i class="fa fa-flag-checkered"></i>', '<i class="fa fa-flag-o"></i>', '<i class="fa fa-flash"></i>', '<i class="fa fa-flask"></i>', '<i class="fa fa-folder"></i>', '<i class="fa fa-folder-o"></i>', '<i class="fa fa-folder-open"></i>', '<i class="fa fa-folder-open-o"></i>', '<i class="fa fa-frown-o"></i>', '<i class="fa fa-futbol-o"></i>', '<i class="fa fa-gamepad"></i>', '<i class="fa fa-gavel"></i>', '<i class="fa fa-gear"></i>', '<i class="fa fa-gears"></i>', '<i class="fa fa-gift"></i>', '<i class="fa fa-glass"></i>', '<i class="fa fa-globe"></i>', '<i class="fa fa-graduation-cap"></i>', '<i class="fa fa-group"></i>', '<i class="fa fa-hand-grab-o"></i>', '<i class="fa fa-hand-lizard-o"></i>', '<i class="fa fa-hand-paper-o"></i>', '<i class="fa fa-hand-peace-o"></i>', '<i class="fa fa-hand-pointer-o"></i>', '<i class="fa fa-hand-rock-o"></i>', '<i class="fa fa-hand-scissors-o"></i>', '<i class="fa fa-hand-spock-o"></i>', '<i class="fa fa-hand-stop-o"></i>', '<i class="fa fa-handshake-o"></i>', '<i class="fa fa-hard-of-hearing"></i>', '<i class="fa fa-hashtag"></i>', '<i class="fa fa-hdd-o"></i>', '<i class="fa fa-headphones"></i>', '<i class="fa fa-heart"></i>', '<i class="fa fa-heart-o"></i>', '<i class="fa fa-heartbeat"></i>', '<i class="fa fa-history"></i>', '<i class="fa fa-home"></i>', '<i class="fa fa-hotel"></i>', '<i class="fa fa-hourglass"></i>', '<i class="fa fa-hourglass-1"></i>', '<i class="fa fa-hourglass-2"></i>', '<i class="fa fa-hourglass-3"></i>', '<i class="fa fa-hourglass-end"></i>', '<i class="fa fa-hourglass-half"></i>', '<i class="fa fa-hourglass-o"></i>', '<i class="fa fa-hourglass-start"></i>', '<i class="fa fa-i-cursor"></i>', '<i class="fa fa-id-badge"></i>', '<i class="fa fa-id-card"></i>', '<i class="fa fa-id-card-o"></i>', '<i class="fa fa-image"></i>', '<i class="fa fa-inbox"></i>', '<i class="fa fa-industry"></i>', '<i class="fa fa-info"></i>', '<i class="fa fa-info-circle"></i>', '<i class="fa fa-institution"></i>', '<i class="fa fa-key"></i>', '<i class="fa fa-keyboard-o"></i>', '<i class="fa fa-language"></i>', '<i class="fa fa-laptop"></i>', '<i class="fa fa-leaf"></i>', '<i class="fa fa-legal"></i>', '<i class="fa fa-lemon-o"></i>', '<i class="fa fa-level-down"></i>', '<i class="fa fa-level-up"></i>', '<i class="fa fa-life-bouy"></i>', '<i class="fa fa-life-buoy"></i>', '<i class="fa fa-life-ring"></i>', '<i class="fa fa-life-saver"></i>', '<i class="fa fa-lightbulb-o"></i>', '<i class="fa fa-line-chart"></i>', '<i class="fa fa-location-arrow"></i>', '<i class="fa fa-lock"></i>', '<i class="fa fa-low-vision"></i>', '<i class="fa fa-magic"></i>', '<i class="fa fa-magnet"></i>', '<i class="fa fa-mail-forward"></i>', '<i class="fa fa-mail-reply"></i>', '<i class="fa fa-mail-reply-all"></i>', '<i class="fa fa-male"></i>', '<i class="fa fa-map"></i>', '<i class="fa fa-map-marker"></i>', '<i class="fa fa-map-o"></i>', '<i class="fa fa-map-pin"></i>', '<i class="fa fa-map-signs"></i>', '<i class="fa fa-meh-o"></i>', '<i class="fa fa-microchip"></i>', '<i class="fa fa-microphone"></i>', '<i class="fa fa-microphone-slash"></i>', '<i class="fa fa-minus"></i>', '<i class="fa fa-minus-circle"></i>', '<i class="fa fa-minus-square"></i>', '<i class="fa fa-minus-square-o"></i>', '<i class="fa fa-mobile"></i>', '<i class="fa fa-mobile-phone"></i>', '<i class="fa fa-money"></i>', '<i class="fa fa-moon-o"></i>', '<i class="fa fa-mortar-board"></i>', '<i class="fa fa-motorcycle"></i>', '<i class="fa fa-mouse-pointer"></i>', '<i class="fa fa-music"></i>', '<i class="fa fa-navicon"></i>', '<i class="fa fa-newspaper-o"></i>', '<i class="fa fa-object-group"></i>', '<i class="fa fa-object-ungroup"></i>', '<i class="fa fa-paint-brush"></i>', '<i class="fa fa-paper-plane"></i>', '<i class="fa fa-paper-plane-o"></i>', '<i class="fa fa-paw"></i>', '<i class="fa fa-pencil"></i>', '<i class="fa fa-pencil-square"></i>', '<i class="fa fa-pencil-square-o"></i>', '<i class="fa fa-percent"></i>', '<i class="fa fa-phone"></i>', '<i class="fa fa-phone-square"></i>', '<i class="fa fa-photo"></i>', '<i class="fa fa-picture-o"></i>', '<i class="fa fa-pie-chart"></i>', '<i class="fa fa-plane"></i>', '<i class="fa fa-plug"></i>', '<i class="fa fa-plus"></i>', '<i class="fa fa-plus-circle"></i>', '<i class="fa fa-plus-square"></i>', '<i class="fa fa-plus-square-o"></i>', '<i class="fa fa-podcast"></i>', '<i class="fa fa-power-off"></i>', '<i class="fa fa-print"></i>', '<i class="fa fa-puzzle-piece"></i>', '<i class="fa fa-qrcode"></i>', '<i class="fa fa-question"></i>', '<i class="fa fa-question-circle"></i>', '<i class="fa fa-question-circle-o"></i>', '<i class="fa fa-quote-left"></i>', '<i class="fa fa-quote-right"></i>', '<i class="fa fa-random"></i>', '<i class="fa fa-recycle"></i>', '<i class="fa fa-refresh"></i>', '<i class="fa fa-registered"></i>', '<i class="fa fa-remove"></i>', '<i class="fa fa-reorder"></i>', '<i class="fa fa-reply"></i>', '<i class="fa fa-reply-all"></i>', '<i class="fa fa-retweet"></i>', '<i class="fa fa-road"></i>', '<i class="fa fa-rocket"></i>', '<i class="fa fa-rss"></i>', '<i class="fa fa-rss-square"></i>', '<i class="fa fa-s15"></i>', '<i class="fa fa-search"></i>', '<i class="fa fa-search-minus"></i>', '<i class="fa fa-search-plus"></i>', '<i class="fa fa-send"></i>', '<i class="fa fa-send-o"></i>', '<i class="fa fa-server"></i>', '<i class="fa fa-share"></i>', '<i class="fa fa-share-alt"></i>', '<i class="fa fa-share-alt-square"></i>', '<i class="fa fa-share-square"></i>', '<i class="fa fa-share-square-o"></i>', '<i class="fa fa-shield"></i>', '<i class="fa fa-ship"></i>', '<i class="fa fa-shopping-bag"></i>', '<i class="fa fa-shopping-basket"></i>', '<i class="fa fa-shopping-cart"></i>', '<i class="fa fa-shower"></i>', '<i class="fa fa-sign-in"></i>', '<i class="fa fa-sign-language"></i>', '<i class="fa fa-sign-out"></i>', '<i class="fa fa-signal"></i>', '<i class="fa fa-signing"></i>', '<i class="fa fa-sitemap"></i>', '<i class="fa fa-sliders"></i>', '<i class="fa fa-smile-o"></i>', '<i class="fa fa-snowflake-o"></i>', '<i class="fa fa-soccer-ball-o"></i>', '<i class="fa fa-sort"></i>', '<i class="fa fa-sort-alpha-asc"></i>', '<i class="fa fa-sort-alpha-desc"></i>', '<i class="fa fa-sort-amount-asc"></i>', '<i class="fa fa-sort-amount-desc"></i>', '<i class="fa fa-sort-asc"></i>', '<i class="fa fa-sort-desc"></i>', '<i class="fa fa-sort-down"></i>', '<i class="fa fa-sort-numeric-asc"></i>', '<i class="fa fa-sort-numeric-desc"></i>', '<i class="fa fa-sort-up"></i>', '<i class="fa fa-space-shuttle"></i>', '<i class="fa fa-spinner"></i>', '<i class="fa fa-spoon"></i>', '<i class="fa fa-square"></i>', '<i class="fa fa-square-o"></i>', '<i class="fa fa-star"></i>', '<i class="fa fa-star-half"></i>', '<i class="fa fa-star-half-empty"></i>', '<i class="fa fa-star-half-full"></i>', '<i class="fa fa-star-half-o"></i>', '<i class="fa fa-star-o"></i>', '<i class="fa fa-sticky-note"></i>', '<i class="fa fa-sticky-note-o"></i>', '<i class="fa fa-street-view"></i>', '<i class="fa fa-suitcase"></i>', '<i class="fa fa-sun-o"></i>', '<i class="fa fa-support"></i>', '<i class="fa fa-tablet"></i>', '<i class="fa fa-tachometer"></i>', '<i class="fa fa-tag"></i>', '<i class="fa fa-tags"></i>', '<i class="fa fa-tasks"></i>', '<i class="fa fa-taxi"></i>', '<i class="fa fa-television"></i>', '<i class="fa fa-terminal"></i>', '<i class="fa fa-thermometer"></i>', '<i class="fa fa-thermometer-0"></i>', '<i class="fa fa-thermometer-1"></i>', '<i class="fa fa-thermometer-2"></i>', '<i class="fa fa-thermometer-3"></i>', '<i class="fa fa-thermometer-4"></i>', '<i class="fa fa-thermometer-empty"></i>', '<i class="fa fa-thermometer-full"></i>', '<i class="fa fa-thermometer-half"></i>', '<i class="fa fa-thermometer-quarter"></i>', '<i class="fa fa-thermometer-three-quarters"></i>', '<i class="fa fa-thumb-tack"></i>', '<i class="fa fa-thumbs-down"></i>', '<i class="fa fa-thumbs-o-down"></i>', '<i class="fa fa-thumbs-o-up"></i>', '<i class="fa fa-thumbs-up"></i>', '<i class="fa fa-ticket"></i>', '<i class="fa fa-times"></i>', '<i class="fa fa-times-circle"></i>', '<i class="fa fa-times-circle-o"></i>', '<i class="fa fa-times-rectangle"></i>', '<i class="fa fa-times-rectangle-o"></i>', '<i class="fa fa-tint"></i>', '<i class="fa fa-toggle-down"></i>', '<i class="fa fa-toggle-left"></i>', '<i class="fa fa-toggle-off"></i>', '<i class="fa fa-toggle-on"></i>', '<i class="fa fa-toggle-right"></i>', '<i class="fa fa-toggle-up"></i>', '<i class="fa fa-trademark"></i>', '<i class="fa fa-trash"></i>', '<i class="fa fa-trash-o"></i>', '<i class="fa fa-tree"></i>', '<i class="fa fa-trophy"></i>', '<i class="fa fa-truck"></i>', '<i class="fa fa-tty"></i>', '<i class="fa fa-tv"></i>', '<i class="fa fa-umbrella"></i>', '<i class="fa fa-universal-access"></i>', '<i class="fa fa-university"></i>', '<i class="fa fa-unlock"></i>', '<i class="fa fa-unlock-alt"></i>', '<i class="fa fa-unsorted"></i>', '<i class="fa fa-upload"></i>', '<i class="fa fa-user"></i>', '<i class="fa fa-user-circle"></i>', '<i class="fa fa-user-circle-o"></i>', '<i class="fa fa-user-o"></i>', '<i class="fa fa-user-plus"></i>', '<i class="fa fa-user-secret"></i>', '<i class="fa fa-user-times"></i>', '<i class="fa fa-users"></i>', '<i class="fa fa-vcard"></i>', '<i class="fa fa-vcard-o"></i>', '<i class="fa fa-video-camera"></i>', '<i class="fa fa-volume-control-phone"></i>', '<i class="fa fa-volume-down"></i>', '<i class="fa fa-volume-off"></i>', '<i class="fa fa-volume-up"></i>', '<i class="fa fa-warning"></i>', '<i class="fa fa-wheelchair"></i>', '<i class="fa fa-wheelchair-alt"></i>', '<i class="fa fa-wifi"></i>', '<i class="fa fa-window-close"></i>', '<i class="fa fa-window-close-o"></i>', '<i class="fa fa-window-maximize"></i>', '<i class="fa fa-window-minimize"></i>', '<i class="fa fa-window-restore"></i>', '<i class="fa fa-wrench"></i>', '<i class="fa fa-american-sign-language-interpreting"></i>', '<i class="fa fa-asl-interpreting"></i>', '<i class="fa fa-assistive-listening-systems"></i>', '<i class="fa fa-audio-description"></i>', '<i class="fa fa-blind"></i>', '<i class="fa fa-braille"></i>', '<i class="fa fa-cc"></i>', '<i class="fa fa-deaf"></i>', '<i class="fa fa-deafness"></i>', '<i class="fa fa-hard-of-hearing"></i>', '<i class="fa fa-low-vision"></i>', '<i class="fa fa-question-circle-o"></i>', '<i class="fa fa-sign-language"></i>', '<i class="fa fa-signing"></i>', '<i class="fa fa-tty"></i>', '<i class="fa fa-universal-access"></i>', '<i class="fa fa-volume-control-phone"></i>', '<i class="fa fa-wheelchair"></i>', '<i class="fa fa-wheelchair-alt"></i>', '<i class="fa fa-hand-grab-o"></i>', '<i class="fa fa-hand-lizard-o"></i>', '<i class="fa fa-hand-o-down"></i>', '<i class="fa fa-hand-o-left"></i>', '<i class="fa fa-hand-o-right"></i>', '<i class="fa fa-hand-o-up"></i>', '<i class="fa fa-hand-paper-o"></i>', '<i class="fa fa-hand-peace-o"></i>', '<i class="fa fa-hand-pointer-o"></i>', '<i class="fa fa-hand-rock-o"></i>', '<i class="fa fa-hand-scissors-o"></i>', '<i class="fa fa-hand-spock-o"></i>', '<i class="fa fa-hand-stop-o"></i>', '<i class="fa fa-thumbs-down"></i>', '<i class="fa fa-thumbs-o-down"></i>', '<i class="fa fa-thumbs-o-up"></i>', '<i class="fa fa-thumbs-up"></i>', '<i class="fa fa-ambulance"></i>', '<i class="fa fa-automobile"></i>', '<i class="fa fa-bicycle"></i>', '<i class="fa fa-bus"></i>', '<i class="fa fa-cab"></i>', '<i class="fa fa-car"></i>', '<i class="fa fa-fighter-jet"></i>', '<i class="fa fa-motorcycle"></i>', '<i class="fa fa-plane"></i>', '<i class="fa fa-rocket"></i>', '<i class="fa fa-ship"></i>', '<i class="fa fa-space-shuttle"></i>', '<i class="fa fa-subway"></i>', '<i class="fa fa-taxi"></i>', '<i class="fa fa-train"></i>', '<i class="fa fa-truck"></i>', '<i class="fa fa-wheelchair"></i>', '<i class="fa fa-wheelchair-alt"></i>', '<i class="fa fa-genderless"></i>', '<i class="fa fa-intersex"></i>', '<i class="fa fa-mars"></i>', '<i class="fa fa-mars-double"></i>', '<i class="fa fa-mars-stroke"></i>', '<i class="fa fa-mars-stroke-h"></i>', '<i class="fa fa-mars-stroke-v"></i>', '<i class="fa fa-mercury"></i>', '<i class="fa fa-neuter"></i>', '<i class="fa fa-transgender"></i>', '<i class="fa fa-transgender-alt"></i>', '<i class="fa fa-venus"></i>', '<i class="fa fa-venus-double"></i>', '<i class="fa fa-venus-mars"></i>', '<i class="fa fa-file"></i>', '<i class="fa fa-file-archive-o"></i>', '<i class="fa fa-file-audio-o"></i>', '<i class="fa fa-file-code-o"></i>', '<i class="fa fa-file-excel-o"></i>', '<i class="fa fa-file-image-o"></i>', '<i class="fa fa-file-movie-o"></i>', '<i class="fa fa-file-o"></i>', '<i class="fa fa-file-pdf-o"></i>', '<i class="fa fa-file-photo-o"></i>', '<i class="fa fa-file-picture-o"></i>', '<i class="fa fa-file-powerpoint-o"></i>', '<i class="fa fa-file-sound-o"></i>', '<i class="fa fa-file-text"></i>', '<i class="fa fa-file-text-o"></i>', '<i class="fa fa-file-video-o"></i>', '<i class="fa fa-file-word-o"></i>', '<i class="fa fa-file-zip-o"></i>', '<i class="fa fa-info-circle fa-lg fa-li"></i>', '<i class="fa fa-circle-o-notch"></i>', '<i class="fa fa-cog"></i>', '<i class="fa fa-gear"></i>', '<i class="fa fa-refresh"></i>', '<i class="fa fa-spinner"></i>', '<i class="fa fa-check-square"></i>', '<i class="fa fa-check-square-o"></i>', '<i class="fa fa-circle"></i>', '<i class="fa fa-circle-o"></i>', '<i class="fa fa-dot-circle-o"></i>', '<i class="fa fa-minus-square"></i>', '<i class="fa fa-minus-square-o"></i>', '<i class="fa fa-plus-square"></i>', '<i class="fa fa-plus-square-o"></i>', '<i class="fa fa-square"></i>', '<i class="fa fa-square-o"></i>', '<i class="fa fa-cc-amex"></i>', '<i class="fa fa-cc-diners-club"></i>', '<i class="fa fa-cc-discover"></i>', '<i class="fa fa-cc-jcb"></i>', '<i class="fa fa-cc-mastercard"></i>', '<i class="fa fa-cc-paypal"></i>', '<i class="fa fa-cc-stripe"></i>', '<i class="fa fa-cc-visa"></i>', '<i class="fa fa-credit-card"></i>', '<i class="fa fa-credit-card-alt"></i>', '<i class="fa fa-google-wallet"></i>', '<i class="fa fa-paypal"></i>', '<i class="fa fa-area-chart"></i>', '<i class="fa fa-bar-chart"></i>', '<i class="fa fa-bar-chart-o"></i>', '<i class="fa fa-line-chart"></i>', '<i class="fa fa-pie-chart"></i>', '<i class="fa fa-bitcoin"></i>', '<i class="fa fa-btc"></i>', '<i class="fa fa-cny"></i>', '<i class="fa fa-dollar"></i>', '<i class="fa fa-eur"></i>', '<i class="fa fa-euro"></i>', '<i class="fa fa-gbp"></i>', '<i class="fa fa-gg"></i>', '<i class="fa fa-gg-circle"></i>', '<i class="fa fa-ils"></i>', '<i class="fa fa-inr"></i>', '<i class="fa fa-jpy"></i>', '<i class="fa fa-krw"></i>', '<i class="fa fa-money"></i>', '<i class="fa fa-rmb"></i>', '<i class="fa fa-rouble"></i>', '<i class="fa fa-rub"></i>', '<i class="fa fa-ruble"></i>', '<i class="fa fa-rupee"></i>', '<i class="fa fa-shekel"></i>', '<i class="fa fa-sheqel"></i>', '<i class="fa fa-try"></i>', '<i class="fa fa-turkish-lira"></i>', '<i class="fa fa-usd"></i>', '<i class="fa fa-viacoin"></i>', '<i class="fa fa-won"></i>', '<i class="fa fa-yen"></i>', '<i class="fa fa-align-center"></i>', '<i class="fa fa-align-justify"></i>', '<i class="fa fa-align-left"></i>', '<i class="fa fa-align-right"></i>', '<i class="fa fa-bold"></i>', '<i class="fa fa-chain"></i>', '<i class="fa fa-chain-broken"></i>', '<i class="fa fa-clipboard"></i>', '<i class="fa fa-columns"></i>', '<i class="fa fa-copy"></i>', '<i class="fa fa-cut"></i>', '<i class="fa fa-dedent"></i>', '<i class="fa fa-eraser"></i>', '<i class="fa fa-file"></i>', '<i class="fa fa-file-o"></i>', '<i class="fa fa-file-text"></i>', '<i class="fa fa-file-text-o"></i>', '<i class="fa fa-files-o"></i>', '<i class="fa fa-floppy-o"></i>', '<i class="fa fa-font"></i>', '<i class="fa fa-header"></i>', '<i class="fa fa-indent"></i>', '<i class="fa fa-italic"></i>', '<i class="fa fa-link"></i>', '<i class="fa fa-list"></i>', '<i class="fa fa-list-alt"></i>', '<i class="fa fa-list-ol"></i>', '<i class="fa fa-list-ul"></i>', '<i class="fa fa-outdent"></i>', '<i class="fa fa-paperclip"></i>', '<i class="fa fa-paragraph"></i>', '<i class="fa fa-paste"></i>', '<i class="fa fa-repeat"></i>', '<i class="fa fa-rotate-left"></i>', '<i class="fa fa-rotate-right"></i>', '<i class="fa fa-save"></i>', '<i class="fa fa-scissors"></i>', '<i class="fa fa-strikethrough"></i>', '<i class="fa fa-subscript"></i>', '<i class="fa fa-superscript"></i>', '<i class="fa fa-table"></i>', '<i class="fa fa-text-height"></i>', '<i class="fa fa-text-width"></i>', '<i class="fa fa-th"></i>', '<i class="fa fa-th-large"></i>', '<i class="fa fa-th-list"></i>', '<i class="fa fa-underline"></i>', '<i class="fa fa-undo"></i>', '<i class="fa fa-unlink"></i>', '<i class="fa fa-angle-double-down"></i>', '<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>', '<i class="fa fa-angle-double-up"></i>', '<i class="fa fa-angle-down"></i>', '<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>', '<i class="fa fa-angle-up"></i>', '<i class="fa fa-arrow-circle-down"></i>', '<i class="fa fa-arrow-circle-left"></i>', '<i class="fa fa-arrow-circle-o-down"></i>', '<i class="fa fa-arrow-circle-o-left"></i>', '<i class="fa fa-arrow-circle-o-right"></i>', '<i class="fa fa-arrow-circle-o-up"></i>', '<i class="fa fa-arrow-circle-right"></i>', '<i class="fa fa-arrow-circle-up"></i>', '<i class="fa fa-arrow-down"></i>', '<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>', '<i class="fa fa-arrow-up"></i>', '<i class="fa fa-arrows"></i>', '<i class="fa fa-arrows-alt"></i>', '<i class="fa fa-arrows-h"></i>', '<i class="fa fa-arrows-v"></i>', '<i class="fa fa-caret-down"></i>', '<i class="fa fa-caret-left"></i>', '<i class="fa fa-caret-right"></i>', '<i class="fa fa-caret-square-o-down"></i>', '<i class="fa fa-caret-square-o-left"></i>', '<i class="fa fa-caret-square-o-right"></i>', '<i class="fa fa-caret-square-o-up"></i>', '<i class="fa fa-caret-up"></i>', '<i class="fa fa-chevron-circle-down"></i>', '<i class="fa fa-chevron-circle-left"></i>', '<i class="fa fa-chevron-circle-right"></i>', '<i class="fa fa-chevron-circle-up"></i>', '<i class="fa fa-chevron-down"></i>', '<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>', '<i class="fa fa-chevron-up"></i>', '<i class="fa fa-exchange"></i>', '<i class="fa fa-hand-o-down"></i>', '<i class="fa fa-hand-o-left"></i>', '<i class="fa fa-hand-o-right"></i>', '<i class="fa fa-hand-o-up"></i>', '<i class="fa fa-long-arrow-down"></i>', '<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>', '<i class="fa fa-long-arrow-up"></i>', '<i class="fa fa-toggle-down"></i>', '<i class="fa fa-toggle-left"></i>', '<i class="fa fa-toggle-right"></i>', '<i class="fa fa-toggle-up"></i>', '<i class="fa fa-arrows-alt"></i>', '<i class="fa fa-backward"></i>', '<i class="fa fa-compress"></i>', '<i class="fa fa-eject"></i>', '<i class="fa fa-expand"></i>', '<i class="fa fa-fast-backward"></i>', '<i class="fa fa-fast-forward"></i>', '<i class="fa fa-forward"></i>', '<i class="fa fa-pause"></i>', '<i class="fa fa-pause-circle"></i>', '<i class="fa fa-pause-circle-o"></i>', '<i class="fa fa-play"></i>', '<i class="fa fa-play-circle"></i>', '<i class="fa fa-play-circle-o"></i>', '<i class="fa fa-random"></i>', '<i class="fa fa-step-backward"></i>', '<i class="fa fa-step-forward"></i>', '<i class="fa fa-stop"></i>', '<i class="fa fa-stop-circle"></i>', '<i class="fa fa-stop-circle-o"></i>', '<i class="fa fa-youtube-play"></i>', '<i class="fa fa-500px"></i>', '<i class="fa fa-adn"></i>', '<i class="fa fa-amazon"></i>', '<i class="fa fa-android"></i>', '<i class="fa fa-angellist"></i>', '<i class="fa fa-apple"></i>', '<i class="fa fa-bandcamp"></i>', '<i class="fa fa-behance"></i>', '<i class="fa fa-behance-square"></i>', '<i class="fa fa-bitbucket"></i>', '<i class="fa fa-bitbucket-square"></i>', '<i class="fa fa-bitcoin"></i>', '<i class="fa fa-black-tie"></i>', '<i class="fa fa-bluetooth"></i>', '<i class="fa fa-bluetooth-b"></i>', '<i class="fa fa-btc"></i>', '<i class="fa fa-buysellads"></i>', '<i class="fa fa-cc-amex"></i>', '<i class="fa fa-cc-diners-club"></i>', '<i class="fa fa-cc-discover"></i>', '<i class="fa fa-cc-jcb"></i>', '<i class="fa fa-cc-mastercard"></i>', '<i class="fa fa-cc-paypal"></i>', '<i class="fa fa-cc-stripe"></i>', '<i class="fa fa-cc-visa"></i>', '<i class="fa fa-chrome"></i>', '<i class="fa fa-codepen"></i>', '<i class="fa fa-codiepie"></i>', '<i class="fa fa-connectdevelop"></i>', '<i class="fa fa-contao"></i>', '<i class="fa fa-css3"></i>', '<i class="fa fa-dashcube"></i>', '<i class="fa fa-delicious"></i>', '<i class="fa fa-deviantart"></i>', '<i class="fa fa-digg"></i>', '<i class="fa fa-dribbble"></i>', '<i class="fa fa-dropbox"></i>', '<i class="fa fa-drupal"></i>', '<i class="fa fa-edge"></i>', '<i class="fa fa-eercast"></i>', '<i class="fa fa-empire"></i>', '<i class="fa fa-envira"></i>', '<i class="fa fa-etsy"></i>', '<i class="fa fa-expeditedssl"></i>', '<i class="fa fa-fa"></i>', '<i class="fa fa-facebook"></i>', '<i class="fa fa-facebook-f"></i>', '<i class="fa fa-facebook-official"></i>', '<i class="fa fa-facebook-square"></i>', '<i class="fa fa-firefox"></i>', '<i class="fa fa-first-order"></i>', '<i class="fa fa-flickr"></i>', '<i class="fa fa-font-awesome"></i>', '<i class="fa fa-fonticons"></i>', '<i class="fa fa-fort-awesome"></i>', '<i class="fa fa-forumbee"></i>', '<i class="fa fa-foursquare"></i>', '<i class="fa fa-free-code-camp"></i>', '<i class="fa fa-ge"></i>', '<i class="fa fa-get-pocket"></i>', '<i class="fa fa-gg"></i>', '<i class="fa fa-gg-circle"></i>', '<i class="fa fa-git"></i>', '<i class="fa fa-git-square"></i>', '<i class="fa fa-github"></i>', '<i class="fa fa-github-alt"></i>', '<i class="fa fa-github-square"></i>', '<i class="fa fa-gitlab"></i>', '<i class="fa fa-gittip"></i>', '<i class="fa fa-glide"></i>', '<i class="fa fa-glide-g"></i>', '<i class="fa fa-google"></i>', '<i class="fa fa-google-plus"></i>', '<i class="fa fa-google-plus-circle"></i>', '<i class="fa fa-google-plus-official"></i>', '<i class="fa fa-google-plus-square"></i>', '<i class="fa fa-google-wallet"></i>', '<i class="fa fa-gratipay"></i>', '<i class="fa fa-grav"></i>', '<i class="fa fa-hacker-news"></i>', '<i class="fa fa-houzz"></i>', '<i class="fa fa-html5"></i>', '<i class="fa fa-imdb"></i>', '<i class="fa fa-instagram"></i>', '<i class="fa fa-internet-explorer"></i>', '<i class="fa fa-ioxhost"></i>', '<i class="fa fa-joomla"></i>', '<i class="fa fa-jsfiddle"></i>', '<i class="fa fa-lastfm"></i>', '<i class="fa fa-lastfm-square"></i>', '<i class="fa fa-leanpub"></i>', '<i class="fa fa-linkedin"></i>', '<i class="fa fa-linkedin-square"></i>', '<i class="fa fa-linode"></i>', '<i class="fa fa-linux"></i>', '<i class="fa fa-maxcdn"></i>', '<i class="fa fa-meanpath"></i>', '<i class="fa fa-medium"></i>', '<i class="fa fa-meetup"></i>', '<i class="fa fa-mixcloud"></i>', '<i class="fa fa-modx"></i>', '<i class="fa fa-odnoklassniki"></i>', '<i class="fa fa-odnoklassniki-square"></i>', '<i class="fa fa-opencart"></i>', '<i class="fa fa-openid"></i>', '<i class="fa fa-opera"></i>', '<i class="fa fa-optin-monster"></i>', '<i class="fa fa-pagelines"></i>', '<i class="fa fa-paypal"></i>', '<i class="fa fa-pied-piper"></i>', '<i class="fa fa-pied-piper-alt"></i>', '<i class="fa fa-pied-piper-pp"></i>', '<i class="fa fa-pinterest"></i>', '<i class="fa fa-pinterest-p"></i>', '<i class="fa fa-pinterest-square"></i>', '<i class="fa fa-product-hunt"></i>', '<i class="fa fa-qq"></i>', '<i class="fa fa-quora"></i>', '<i class="fa fa-ra"></i>', '<i class="fa fa-ravelry"></i>', '<i class="fa fa-rebel"></i>', '<i class="fa fa-reddit"></i>', '<i class="fa fa-reddit-alien"></i>', '<i class="fa fa-reddit-square"></i>', '<i class="fa fa-renren"></i>', '<i class="fa fa-resistance"></i>', '<i class="fa fa-safari"></i>', '<i class="fa fa-scribd"></i>', '<i class="fa fa-sellsy"></i>', '<i class="fa fa-share-alt"></i>', '<i class="fa fa-share-alt-square"></i>', '<i class="fa fa-shirtsinbulk"></i>', '<i class="fa fa-simplybuilt"></i>', '<i class="fa fa-skyatlas"></i>', '<i class="fa fa-skype"></i>', '<i class="fa fa-slack"></i>', '<i class="fa fa-slideshare"></i>', '<i class="fa fa-snapchat"></i>', '<i class="fa fa-snapchat-ghost"></i>', '<i class="fa fa-snapchat-square"></i>', '<i class="fa fa-soundcloud"></i>', '<i class="fa fa-spotify"></i>', '<i class="fa fa-stack-exchange"></i>', '<i class="fa fa-stack-overflow"></i>', '<i class="fa fa-steam"></i>', '<i class="fa fa-steam-square"></i>', '<i class="fa fa-stumbleupon"></i>', '<i class="fa fa-stumbleupon-circle"></i>', '<i class="fa fa-superpowers"></i>', '<i class="fa fa-telegram"></i>', '<i class="fa fa-tencent-weibo"></i>', '<i class="fa fa-themeisle"></i>', '<i class="fa fa-trello"></i>', '<i class="fa fa-tripadvisor"></i>', '<i class="fa fa-tumblr"></i>', '<i class="fa fa-tumblr-square"></i>', '<i class="fa fa-twitch"></i>', '<i class="fa fa-twitter"></i>', '<i class="fa fa-twitter-square"></i>', '<i class="fa fa-usb"></i>', '<i class="fa fa-viacoin"></i>', '<i class="fa fa-viadeo"></i>', '<i class="fa fa-viadeo-square"></i>', '<i class="fa fa-vimeo"></i>', '<i class="fa fa-vimeo-square"></i>', '<i class="fa fa-vine"></i>', '<i class="fa fa-vk"></i>', '<i class="fa fa-wechat"></i>', '<i class="fa fa-weibo"></i>', '<i class="fa fa-weixin"></i>', '<i class="fa fa-whatsapp"></i>', '<i class="fa fa-wikipedia-w"></i>', '<i class="fa fa-windows"></i>', '<i class="fa fa-wordpress"></i>', '<i class="fa fa-wpbeginner"></i>', '<i class="fa fa-wpexplorer"></i>', '<i class="fa fa-wpforms"></i>', '<i class="fa fa-xing"></i>', '<i class="fa fa-xing-square"></i>', '<i class="fa fa-y-combinator"></i>', '<i class="fa fa-y-combinator-square"></i>', '<i class="fa fa-yahoo"></i>', '<i class="fa fa-yc"></i>', '<i class="fa fa-yc-square"></i>', '<i class="fa fa-yelp"></i>', '<i class="fa fa-yoast"></i>', '<i class="fa fa-youtube"></i>', '<i class="fa fa-youtube-play"></i>', '<i class="fa fa-youtube-square"></i>', '<i class="fa fa-warning"></i>', '<i class="fa fa-ambulance"></i>', '<i class="fa fa-h-square"></i>', '<i class="fa fa-heart"></i>', '<i class="fa fa-heart-o"></i>', '<i class="fa fa-heartbeat"></i>', '<i class="fa fa-hospital-o"></i>', '<i class="fa fa-medkit"></i>', '<i class="fa fa-plus-square"></i>', '<i class="fa fa-stethoscope"></i>', '<i class="fa fa-user-md"></i>', '<i class="fa fa-wheelchair"></i>', '<i class="fa fa-wheelchair-alt"></i>'],
};
App.Computed = {};
App.Watch = {};
App.Methods = {
    OnLoadComplete: function (sender) { },
    OnItemMounted: function (sender, args) { },
    Redirect: function (url) {
        showLoading();
        window.location.href = url;
    },
    Localize: function (key) {
        return Lang[key] || key;
    },
};
App.BeforeMount = function () { };


App.Init = function (el, beforeInit, afterInit) {
    var mainElement = el || '#appDiv';

    if (beforeInit instanceof (Function)) {
        beforeInit();
    }

    window.app = new Vue({
        el: mainElement,
        components: App.Components,
        vuetify: new Vuetify(),
        data: App.Data,
        computed: App.Computed,
        watch: App.Watch,
        methods: App.Methods,
        beforeCreate: function () {

        },
        created: function () {

        },
        beforeMount: App.BeforeMount,
        mounted: function () {
            this.OnLoadComplete();
            if (afterInit instanceof (Function)) {
                afterInit(this);
            }
        },
    });
};



