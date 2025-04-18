<template>
    <div>
        <v-btn small text
               color="white"
               v-on:click="cmd_open_change_password_dialog()">
            <v-icon left>
                mdi-lock-reset
            </v-icon>
            <span class="d-none d-md-inline no-transform">
                &nbsp;
                ŞİFREMİ DEĞİŞTİR
            </span>
        </v-btn>
        <v-dialog width="350" v-model="IsShowChangePasswordModal">
            <v-card tile elevation="0" min-height="120">
                <v-system-bar dark color="blue-grey darken-4">
                    <span class="caption">
                        Şifre Değiştir
                    </span>
                    <v-spacer></v-spacer>
                    <v-btn x-small dark v-on:click="IsShowChangePasswordModal = false">
                        <v-icon small>mdi-close</v-icon>
                    </v-btn>
                </v-system-bar>
                <v-card-text>
                    <v-form ref="frmchangePassword" v-on:submit.prevent>
                        <v-container fluid class="px-0">
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined hide-details
                                                  label="Şu anki Şifreniz"
                                                  v-bind:rules="required"
                                                  autocomplete="new-password"
                                                  :append-icon="ChangePasswordData.ShowPasswordCurrent ? 'mdi-eye' : 'mdi-eye-off'"
                                                  v-bind:type="ChangePasswordData.ShowPasswordCurrent ? 'text' : 'password'"
                                                  v-on:click:append="ChangePasswordData.ShowPasswordCurrent = !ChangePasswordData.ShowPasswordCurrent"
                                                  v-model="ChangePasswordData.CurrentPassword">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined hide-details
                                                  label="Yeni Şifreniz"
                                                  v-bind:rules="required"
                                                  autocomplete="new-password"
                                                  :append-icon="ChangePasswordData.ShowPasswordNew1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                  v-bind:type="ChangePasswordData.ShowPasswordNew1 ? 'text' : 'password'"
                                                  v-on:click:append="ChangePasswordData.ShowPasswordNew1 = !ChangePasswordData.ShowPasswordNew1"
                                                  v-model="ChangePasswordData.NewPassword1">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined hide-details
                                                  label="Yeni Şifreniz (Tekrar)"
                                                  v-bind:rules="required"
                                                  autocomplete="new-password"
                                                  :append-icon="ChangePasswordData.ShowPasswordNew2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                  v-bind:type="ChangePasswordData.ShowPasswordNew2 ? 'text' : 'password'"
                                                  v-on:click:append="ChangePasswordData.ShowPasswordNew2 = !ChangePasswordData.ShowPasswordNew2"
                                                  v-model="ChangePasswordData.NewPassword2">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-footer padless color="transparent">
                            <v-spacer></v-spacer>
                            <v-btn small tile outlined color="primary" v-on:click="cmd_change_password">
                                <v-icon small left>mdi-lock-reset</v-icon>
                                Şifremi Değiştir
                            </v-btn>
                        </v-footer>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped>
</style>
<script>
    module.exports = {
        data: function () {
            return {
                IsShowChangePasswordModal: false,
                ChangePasswordData: {
                    ShowPasswordCurrent: false,
                    ShowPasswordNew1: false,
                    ShowPasswordNew2: false,
                    CurrentPassword: '',
                    NewPassword1: '',
                    NewPassword2: '',
                },
                required: [
                    function (v) {
                        return !!v || 'Lütfen Boş Bırakmayınız.';
                    },
                ],
            }
        },
        methods: {
            cmd_open_change_password_dialog: function () {
                var th = this;
                th.IsShowChangePasswordModal = true;
                th.ChangePasswordData.CurrentPassword = '';
                th.ChangePasswordData.NewPassword1 = '';
                th.ChangePasswordData.NewPassword2 = '';
            },
            cmd_change_password: function () {
                var th = this;
                var valid = th.$refs.frmchangePassword.validate();
                if (!valid) {
                    return;
                }
                var url = Global.Urls.VposSystem.api2.SettingsApi.ChangePassword;
                var mdl = th.ChangePasswordData;
                showLoading();
                mc.post(url, mdl, function (res) {
                    if (res.isSuccess)
                        th.IsShowChangePasswordModal = false;
                    Swal.fire({
                        icon: res.isSuccess ? 'success' : 'error',
                        title: 'Sistem Uyarısı',
                        text: res.Message,
                        confirmButtonText: 'Tamam',
                    });
                    hideLoading();
                })

            }
        },
        beforeMount: function () {
            var th = this;
        }
    }
</script>