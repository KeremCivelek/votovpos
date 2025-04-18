
<template>
    <v-card tile outlined elevation="1" color="grey lighten-3">
        <v-overlay :absolute="true"
                   :opacity="0.90"
                   :value="loading"
                   :z-index="9"
                   color="cyan darken-4">
            <div class="lds-hourglass"></div>
        </v-overlay>
        <v-system-bar color="grey lighten-3">
            <v-btn tile x-small v-bind:dark="mainTab == 0" v-bind:color="mainTab == 0 ? 'grey darken-4': 'grey darken-1'" v-on:click="mainTab = 0">
                <span v-text="Lang.str_authentication_options"></span>
            </v-btn>
            <v-divider vertical class="mx-3"></v-divider>
            <v-btn tile x-small v-bind:dark="mainTab == 1" v-bind:color="mainTab == 1 ? 'grey darken-4': 'grey darken-1'" v-on:click="mainTab = 1">
                <span v-text="Lang.str_register_options"></span>
            </v-btn>
        </v-system-bar>
        <v-card tile elevation="0" color="grey lighten-3">
            <v-card-text>
                <v-row dense v-if="mainTab == 0">
                    <v-col cols="auto">
                        <v-list dense color="transparent">
                            <v-list-item v-bind:color="loginOptionsTab == 0 ? '#263238': '#CFD8DC'" v-on:click="loginOptionsTab = 0">
                                <v-list-item-icon>
                                    <v-icon>mdi-shield-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span v-text="Lang.str_system_authentication_settings"></span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-bind:color="loginOptionsTab == 0 ? 'grey darken-4': 'grey darken-1'" v-on:click="loginOptionsTab = 1">
                                <v-list-item-icon>
                                    <v-icon>mdi-badge-account</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        <span v-text="Lang.str_activedirectory_settings"></span>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-col>

                    <v-col>
                        <div v-if="loginOptionsTab == 0">
                            <v-form ref="frmSystemAuth" v-on:submit.prevent>
                                <v-row dense>
                                    <v-col>
                                        <v-checkbox dense
                                                    v-bind:label="Lang.str_enable_rememberme"
                                                    color="primary"
                                                    v-model="systemAuth.RememberMe" />
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-checkbox dense
                                                    v-bind:label="Lang.str_enable_registration"
                                                    color="primary"
                                                    v-model="systemAuth.Register" />
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-checkbox dense
                                                    v-bind:label="Lang.str_enable_forgotpassword"
                                                    color="primary"
                                                    v-model="systemAuth.ForgotPassword" />
                                    </v-col>
                                </v-row>
                                <v-divider class="my-3"></v-divider>
                                <v-row>
                                    <v-col>
                                        <!--<pre>{{systemAuth}}</pre>-->
                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn small outlined color="primary" v-on:click="cmd_save(systemAuth,0)">
                                            <v-icon>
                                                ic
                                                mdi-content-save
                                            </v-icon>
                                            <span v-text="Lang.str_save"></span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                        <div v-if="loginOptionsTab == 1">
                            <v-form ref="frmAdAuth" v-on:submit.prevent>
                                <v-row dense>
                                    <v-col>
                                        <v-checkbox dense
                                                    v-bind:label="Lang.str_enable_activedirectory_login"
                                                    color="primary"
                                                    v-model="activeDirectory.Enabled" />
                                    </v-col>
                                </v-row>
                                <v-row dense>
                                    <v-col>
                                        <v-text-field dense outlined hide-details
                                                      v-bind:label="Lang.str_activedirectory_domainname"
                                                      color="primary"
                                                      append-icon="mdi-crosshairs-question"
                                                      v-on:click:append="loginOptionsTab == 1"
                                                      v-model="activeDirectory.Domain">

                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-divider class="my-3"></v-divider>
                                <v-row>
                                    <v-col>

                                    </v-col>
                                    <v-col cols="auto">
                                        <v-btn small outlined color="primary" v-on:click="cmd_save(activeDirectory,1)">
                                            <v-icon>
                                                mdi-content-save
                                            </v-icon>
                                            <span v-text="Lang.str_save"></span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </div>
                    </v-col>
                </v-row>
                <v-row dense v-if="mainTab == 1">
                    <v-col>
                        <v-form ref="frmRegister" v-on:submit.prevent>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                                    <fieldset class="manage-group">
                                        <legend v-text="Lang.str_basic_informations"></legend>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_identity_number"
                                                            color="primary"
                                                            v-model="register.EnableIdentityNumber" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_name"
                                                            color="primary"
                                                            v-model="register.EnableUsername" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_surname"
                                                            color="primary"
                                                            v-model="register.EnableUserSurname" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_gender"
                                                            color="primary"
                                                            v-model="register.EnableGender" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_gsm"
                                                            color="primary"
                                                            v-model="register.EnableGsm" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_birthdate"
                                                            color="primary"
                                                            v-model="register.EnableBirthDate" />
                                            </v-col>
                                        </v-row>
                                    </fieldset>
                                </v-col>
                                <v-col>
                                    <fieldset class="manage-group" v-if="Global.Modules.isInstalled('key_module_geoplaces')">
                                        <legend v-text="Lang.str_additional_informations"></legend>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_nationality"
                                                            color="primary"
                                                            v-model="register.EnableNationality" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_birth_place_city"
                                                            color="primary"
                                                            v-model="register.EnableBirthPlaceCity" />
                                            </v-col>
                                        </v-row>
                                        <v-row dense>
                                            <v-col>
                                                <v-checkbox dense
                                                            v-bind:label="Lang.str_enable_birth_place_town"
                                                            color="primary"
                                                            v-model="register.EnableBirthPlaceTown" />
                                            </v-col>
                                        </v-row>
                                    </fieldset>
                                </v-col>
                            </v-row>
                            <v-divider class="my-3"></v-divider>
                            <v-row>
                                <v-col>

                                </v-col>
                                <v-col cols="auto">
                                    <v-btn small outlined color="primary" v-on:click="cmd_save(register,2)">
                                        <v-icon>
                                            mdi-content-save
                                        </v-icon>
                                        <span v-text="Lang.str_save"></span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-card>
</template>
<style>
</style>
<script>
    module.exports = {
        data: function () {
            return {
                loading: false,
                mainTab: 0,
                loginOptionsTab: 0,
                Global: window.Global,
                Lang: window.Global.Lang,
                systemAuth: {
                    RememberMe: false,
                    Register: false,
                    ForgotPassword: false,
                },
                activeDirectory: {
                    Enabled: false,
                    Domain: ''
                },
                register: {
                    EnableIdentityNumber: false,
                    EnableUsername: false,
                    EnableUserSurname: false,
                    EnableGender: false,
                    EnableBirthDate: false,
                    EnableGsm: false,

                    EnableNationality: false,
                    EnableBirthPlaceCity: false,
                    EnableBirthPlaceTown: false,


                    EnableAddress: false,
                    EnableMultipleAddress: false,


                },
            }
        },
        methods: {
            cmd_load: function () {
                var th = this;
                var url = Global.Urls.Auth.api2.SettingsApi.GetSettings;
                th.loading = true;
                mc.get(url, function (d) {
                    if (d.isSuccess) {
                        th.systemAuth = d.Response.SystemAuth;
                        th.activeDirectory = d.Response.ActiveDirectory;
                        th.register = d.Response.Register;
                    }
                    th.loading = false;
                }, function (e) {
                    console.log(e);
                    th.loading = false;
                });
            },
            cmd_save: function (mdl, num) {
                var th = this;
                var url = Global.Urls.Auth.api2.SettingsApi.SaveSystemAuthenticationSettings;
                if (num == 1) {
                    url = Global.Urls.Auth.api2.SettingsApi.SaveActiveDirectoryAuthenticationSettings;
                } else if (num == 2) {
                    url = Global.Urls.Auth.api2.SettingsApi.SaveRegisterSettings;
                }
                th.loading = true;
                mc.post(url, mdl, function (d) {
                    th.loading = false;
                    th.cmd_load();
                }, function (e) {
                    console.log(e);
                    th.loading = false;
                });
            },
        },
        beforeMount: function () {
            var th = this;
            th.cmd_load();
        },
    };
</script>