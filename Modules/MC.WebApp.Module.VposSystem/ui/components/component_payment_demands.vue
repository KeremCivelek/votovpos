<template>
    <v-card tile
            dense
            elevation="0">
        <v-overlay :absolute="true"
                   :opacity="0.90"
                   :value="loading"
                   :z-index="1"
                   color="grey lighten-2">
            <div class="lds-hourglass"></div>
        </v-overlay>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-system-bar elevation="0"
                                    color="#0000c4">
                        <span class="white--text" caption>Ödeme Talepleri</span>
                        <v-spacer></v-spacer>
                        <v-btn x-small
                               tile
                               v-on:click="cmd_payment()"
                               color="blue-grey lighten-4"
                               v-if="selected.length > 0">
                            <v-icon>mdi-cash</v-icon>
                            Öde
                        </v-btn>
                    </v-system-bar>
                    <v-data-table dense light
                                  single-expand
                                  show-select
                                  single-select="true"
                                  class="elevation-1"
                                  v-bind:items="invoiceData"
                                  v-bind:search="search"
                                  v-bind:headers="headers"
                                  v-model="selected"
                                  item-key="CUSTOMER_CODE"
                                  v-bind:loading="loading">
                        <template v-slot:top>
                            <v-system-bar elevation="1"
                                          color="blue-grey lighten-5">
                                <v-btn x-small
                                       icon
                                       v-on:click="cmd_load_data">
                                    <v-icon>mdi-refresh</v-icon>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-icon xsmall
                                        dense>
                                    mdi-magnify
                                </v-icon>
                                <input type="text"
                                       class="search-input-small"
                                       v-model="search"
                                       v-bind:placeholder="Global.Lang.str_search"
                                       autocomplete="off" />
                            </v-system-bar>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<style>
</style>
<script>
    module.exports = {
        components: App.Components,
        data: function () {
            return {
                headers: [
                    {
                        text: 'Şirket Adı',
                        align: 'start',
                        sortable: true,
                        value: 'COMP_NAME'
                    },
                    {
                        text: 'Muşteri Numarası',
                        align: 'start',
                        sortable: true,
                        value: 'CUSTOMER_CODE',
                    },
                    {
                        text: 'Parabirimi',
                        align: 'start',
                        sortable: true,
                        value: 'CURRENCY'
                    },
                    {
                        text: 'Ödenecek Tutar',
                        align: 'start',
                        sortable: true,
                        value: 'DEBIT_AMOUNT',
                    },
                    {
                        text: 'Provizyonda bekleyen ödeme tutarı',
                        align: 'start',
                        sortable: true,
                        value: 'PROV_AMOUNT',
                    },
             
                ],
                loading: true,
                invoiceData: [],
                search: '',
                selected: [],
            }
        },
        computed: {
        },
        methods: {
            cmd_load_data: function () {
                var th = this;
                var localeData = [];
                // Şimdilik ELimle verdim Ezip userprofile dan alınacak
                var customerCode = Global.UserInfo.UserName;
                var url = Global.Urls.VposSystem.api2.InvoincesApi.GetAllOnvoinces.appendParam("customerCode", customerCode);

                mc.get(url, function (res) {
                    if (res.isSuccess) {
                        th.invoiceData = res.Response;
                        localeData = th.invoiceData;
                        th.loading = false;

                    } else {
                        th.loading = false;
                        console.log(res.Message);
                    }
                });
                localStorage.setItem('payment-items', JSON.stringify(localeData));
                window.addEventListener('historyPaymentEvent', function (e) {
                    th.invoiceData = JSON.parse(localStorage.getItem('payment-items'));
                });
            },
            cmd_payment: function () {
                var th = this;
                var selectedItem = th.selected;
                localStorage.setItem('payment-item', JSON.stringify(selectedItem));
                window.dispatchEvent(new Event('paymentEvent'));
            }
        },
        mounted: function () {
            var th = this;
            th.cmd_load_data();
        }
    }
</script>