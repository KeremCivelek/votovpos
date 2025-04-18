<template>
    <v-card tile elevation="2">
        <v-overlay :absolute="true"
                   :opacity="0.90"
                   :value="loading"
                   :z-index="9"
                   color="green darken-2">
            <div class="lds-hourglass"></div>
        </v-overlay>
        <v-container fluid>
            <template v-if="editMode">
                <v-form ref="frmSupportPrograms" v-on:submit.prevent>
                    <v-row>
                        <v-col cols="12" sm="12" md="6" lg="4" xl="3">
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined
                                                  v-bind:disabled="true"
                                                  v-bind:label="Global.Lang.str_id"
                                                  v-model="editItem.SupportProgramId">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined
                                                  v-bind:disabled="true"
                                                  v-bind:label="Global.Lang.str_support_program_code"
                                                  v-bind:rules="editItem.SupportProgramCode_rules"
                                                  v-model="editItem.SupportProgramCode">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-text-field counter dense outlined
                                                  v-bind:label="Global.Lang.str_support_program_name"
                                                  v-bind:rules="editItem.SupportProgramName_rules"
                                                  v-model="editItem.SupportProgramName">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col>
                                    <v-textarea outlined
                                                v-bind:label="Global.Lang.str_description"
                                                v-model="editItem.SupportProgramDescription">
                                    </v-textarea>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <v-row dense>
                                <v-col>
                                    <v-date-picker range show-week
                                                   locale="tr-TR"
                                                   v-bind:selected-items-text="CalendarTitle"
                                                   v-bind:first-day-of-week="1"
                                                   v-model="dates">
                                    </v-date-picker>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col>
                            <pre>{{editItem}}</pre>
                        </v-col>
                    </v-row>
                    <v-divider class="my-2"></v-divider>
                    <v-row dense>
                        <v-col cols="auto">
                            <v-btn x-small outlined v-on:click="editMode = false">
                                <span v-text="Global.Lang.str_cancel"></span>
                            </v-btn>
                        </v-col>
                        <v-col>
                        </v-col>
                        <v-col cols="auto">
                            <v-btn x-small outlined v-on:click="cmd_save">
                                <span v-text="Global.Lang.str_save"></span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </template>

            <v-row v-if="!editMode">
                <v-col>
                    <v-data-table dense light single-expand
                                  elevation="1"
                                  item-key="UserId"
                                  v-bind:footer-props="Grid.footerProps"
                                  v-bind:items-per-page="Grid.itemsPerPage"
                                  v-bind:no-data-text="Grid.noDataText"
                                  v-bind:no-results-text="Grid.noResultText"
                                  v-bind:loading-text="Grid.loadingText"
                                  v-bind:headers="headers"
                                  v-bind:items="itemList"
                                  v-bind:show-expand="true"
                                  v-on:item-expanded="cmd_details"
                                  v-bind:loading="loading"
                                  v-bind:search="search">
                        <template v-slot:top>
                            <v-system-bar dark color="green darken-2">
                                <v-btn x-small icon v-on:click="cmd_load">
                                    <v-icon>mdi-refresh</v-icon>
                                </v-btn>
                                <v-divider inset vertical class="mx-2"></v-divider>
                                <v-btn x-small text color="secondary" v-on:click="cmd_add">
                                    <v-icon small>mdi-plus</v-icon>
                                    <span v-text="Global.Lang.str_add"></span>
                                </v-btn>
                                <v-spacer></v-spacer>
                                <input type="text" class="search-input-small"
                                       v-model="search"
                                       v-bind:placeholder="Global.Lang.str_search"
                                       autocomplete="off" />
                            </v-system-bar>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <pre>{{itemList}}</pre>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>
<style scoped>
    .v-date-picker-title__date {
        font-size: 14px !important;
    }
</style>
<script>

    module.exports = {
        data: function () {
            return {
                loading: false,
                headers: [
                    {
                        text: Lang.str_id,
                        align: 'start',
                        sortable: true,
                        value: 'SupportProgramId',
                    },
                    {
                        text: Lang.str_support_program_code,
                        align: 'start',
                        sortable: true,
                        value: 'SupportProgramCode',
                    },
                    {
                        text: Lang.str_support_program_name,
                        align: 'start',
                        sortable: true,
                        value: 'SupportProgramName',
                    },
                    {
                        text: Lang.str_start_date,
                        align: 'start',
                        sortable: true,
                        value: 'SupportProgramStartDate',
                    },
                    {
                        text: Lang.str_end_date,
                        align: 'start',
                        sortable: true,
                        value: 'SupportProgramEndDate',
                    },
                    {
                        text: '#',
                        align: 'center',
                        sortable: false,
                        value: 'fld_manage',
                    }
                ],
                itemList: [],
                search: '',
                editMode: false,
                newMode: false,
                editItem: {},
                dates: []
            }
        },
        computed: {
            Grid: function () {
                return {
                    footerProps: {
                        'items-per-page-options': [10, 20, 30, 40, 50, -1],
                        'items-per-page-text': Global.Lang.str_record_per_page,
                        'items-per-page-all-text': Global.Lang.str_all
                    },
                    itemsPerPage: 10,
                    noDataText: Global.Lang.str_no_data,
                    noResultText: Global.Lang.str_no_result,
                    loadingText: Global.Lang.str_loading,
                }
            },
            CalendarTitle: function () {
                var th = this;
                var sd = th.editItem.SupportProgramStartDate;
                var ed = th.editItem.SupportProgramEndDate;
                if (!sd || !ed) {
                    return '';
                }

                var s = moment(sd).format('DD.MM.YYYY');
                var e = moment(ed).format('DD.MM.YYYY');
                return `${s} - ${e}`;
            }
        },
        watch: {
            dates: {
                deep: false,
                handler: function (newValue, oldValue) {
                    var th = this;
                    if (newValue && newValue.length == 2) {
                        var dts = Object.assign(new Array(), newValue).sort();
                        th.editItem.SupportProgramStartDate = dts[0];
                        th.editItem.SupportProgramEndDate = dts[1];
                    } else {
                        th.editItem.SupportProgramStartDate = null;
                        th.editItem.SupportProgramEndDate = null;
                    }
                }
            }
        },
        methods: {
            cmd_load: function () {
                var th = this;
                var url = Global.Urls.Cevher.api2.SupportProgramsApi.GetSupportProgramsList;
                th.loading = true;
                th.itemList = [];
                mc.get(url, function (d) {
                    if (d.isSuccess) {
                        th.itemList = d.Response;
                    }
                    th.loading = false;
                }, function (e) {
                    console.log(e);
                    th.loading = false;
                });
            },
            cmd_details: function (obj) {
                var th = this;
                //console.log({ th, obj });
            },
            cmd_add: function () {
                var th = this;
                var url = Global.Urls.Cevher.api2.SupportProgramsApi.GetSupportProgramSkeleton;
                th.loading = true;
                mc.get(url, function (d) {
                    if (d.isSuccess) {
                        th.editItem = Object.assign(new Models.Cevher.SupportProgramViewModel(), d.Response);
                        th.editMode = true;
                        th.newMode = true;
                    }
                    th.loading = false;
                }, function (e) {
                    th.loading = false;
                })
            },
            cmd_save: function () {
                var th = this;
                var valid = th.$refs.frmSupportPrograms.validate();
                if (!valid) {
                    return;
                }


            },
        },
        beforeMount: function () {
            var th = this;
            th.cmd_load();
        }
    };
</script>