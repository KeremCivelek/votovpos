<template>
    <v-container>
        <v-card elevation="0">
            <v-system-bar></v-system-bar>
            <v-banner single-line v-bind:color="SuccessColor">
                <h2 class="caption" style="color:white">{{Message}}</h2>
                <template v-slot:actions>
                    <v-btn text
                           v-on:click="cmd_location"
                           color="white accent-4">
                        Anasayfaya Dön
                    </v-btn>
                </template>
            </v-banner>
            <v-card-text v-if="Status" class="grey lighten-4">
                <v-sheet max-width="1200"
                         height="90"
                         class="mx-auto">
                    <v-simple-table dense>
                        <template>
                            <thead>
                                <tr>
                                    <th class="text-center">İşlem Numarası</th>
                                    <th class="text-center">Sipariş Numarası</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center">{{Request}}</td>
                                    <td class="text-center">{{Order}}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-sheet>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
    module.exports = {
        components: App.Components,
        props: {
            'Status': {
                type: Boolean,
                required: true,
                default: 0
            },
            'Request': {
                type: String,
                required: true,
                default: 'Belirtilmedi',
            },
            'Order': {
                type: String,
                required: true,
                default: 'Belirtilmedi',
            },
            'Message': {
                type: String,
                required: true,
                default: '',
            },
        },
        data: function () {
            return {
                loading: true,
            }
        },
        computed: {
            SuccessColor: function () {
                var th = this;
                return th.Status ? 'success' : 'red'
            }
        },
        methods: {
            cmd_load: function () {
                var th = this;
            },
            cmd_location: function () {
                var th = this;
                window.location.href = '/';
            }
        },
        mounted: function () {
            var th = this;
            th.cmd_load();
        }
    }
</script>
