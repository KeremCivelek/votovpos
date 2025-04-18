
var data = App.Data;
var computed = App.Computed;
var methods = App.Methods;
var watch = App.Watch;

data.countries = [];
data.cities = [];
data.selectedcity = null;

data.register = new Models.Auth.RegisterViewModel();


watch['register.Nationality'] = {
    deep: true,
    handler: function (n, o) {
        var th = this;
        if (n && n > 0) {
            th.cmd_get_cities(n);
            th.register.BirthPlaceCity = null;
            th.selectedcity = null;
        }
    }
};

watch.selectedcity = {
    deep: true,
    handler: function (n, o) {
        var th = this;
        if (n && n.CityId) {
            th.register.BirthPlaceCity = n.CityId;
        } else {
            th.register.BirthPlaceCity = null;
        }
    }
}



methods.cmd_get_countries = function () {
    var th = this;
    var url = Global.Urls.GeoPlaces.api2.CountriesApi.GetCountries;
    th.countries = [];
    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.countries = d.Response;
        }
    }, function (e) {
        console.log(e);
    });
};
methods.cmd_get_cities = function (id) {
    var th = this;
    var url = Global.Urls.GeoPlaces.api2.CitiesApi.GetCities.appendParam('id', id);
    showLoading();
    mc.get(url, function (d) {
        if (d.isSuccess) {
            th.cities = d.Response;
        }
        hideLoading();
    }, function (e) {
        console.log(e);
        hideLoading();
    });
};
methods.cmd_get_towns = function (id) {
    var th = this;
    console.log({ 'CityId': id });
};
methods.cmd_register = function () {
    var th = this;
    var valid = th.$refs.frmRegister.validate();
    if (!valid) {
        return;
    }
    var url = Global.Urls.Auth.api2.AccountApi.Register;
    var mdl = th.register;
    showLoading();
    mc.post(url, mdl, function (d) {
        if (d.isSuccess) {
            Swal.fire({
                icon: 'success',
                text: d.Message
            }).then(function (r) {
                if (r.isConfirmed) {
                    showLoading();
                    window.location.href = Global.Urls.Auth.mvc.Account.Activate.appendParam('id', d.Response);
                }
            });
        }
        hideLoading();
    }, function (e) {
        console.log(e);
        hideLoading();
    });
};





App.BeforeMount = function () {
    var th = this;
    th.cmd_get_countries();
};

