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
                        <span class="white--text">Geçmiş Ödemeler</span>
                    </v-system-bar>
                    <v-data-table dense light
                                  single-expand
                                  class="elevation-1"
                                  v-bind:items="invoiceData"
                                  v-bind:search="search"
                                  v-bind:headers="headers"
                                  v-bind:loading="loading">
                        <template v-slot:top>
                            <v-system-bar elevation="1"
                                          color="blue-grey lighten-5">
                                <v-btn x-small
                                       icon
                                       v-on:click="cmd_load">
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
                        text: 'Firma',
                        align: 'start',
                        sortable: true,
                        value: 'CompanyName',
                    },
                    {
                        text: 'Fatura Numarası',
                        align: 'start',
                        sortable: true,
                        value: 'InvoiceNumber',
                    },
                    {
                        text: 'Ödenmiş Tutar',
                        align: 'start',
                        sortable: true,
                        value: 'PaymentFee',
                    },
                ],
                loading: true,
                invoiceData: [],
                search: '',
            }
        },
        computed: {
        },
        methods: {
            cmd_load: function () {
                var th = this;
                th.loading = false;

                window.addEventListener('historyPaymentEvent', function (e) {
                    th.invoiceData.push(JSON.parse(localStorage.getItem('payment-item')));
                });
            },
        },
        mounted: function () {
            var th = this;
            th.cmd_load();
        }
    }
</script>