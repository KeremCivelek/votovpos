
<template>
    <v-card tile elevation="5" class="mb-5" :color="backgroundColor" :height="height" :width="width">
        <v-container fluid fill-height class="py-0">
            <v-row align="stretch" class="fill-height py-0 left-border" :style="'border-color:' + borderColor + ';'">
                <v-col cols="12" sm="12" md="12" lg="6" xl="5" class="py-0 number-area">
                    <div class="number-element">
                        <span class="number-span" :style="'color:' + valueColor + ';'">
                            {{value}}
                        </span>
                    </div>
                </v-col>
                <v-col class="d-flex">
                    <v-layout column>
                        <v-flex>
                            <div class="text-div">
                                <span :style="'color:' + textColor + ';'">
                                    {{text}}
                                </span>
                            </div>
                        </v-flex>
                        <v-flex grow shrink>
                            <v-btn x-small fab absolute bottom right 
                                    :color="moreIconColor"
                                    :href="moreLink"
                                    v-if="showMoreLink">
                                <v-icon x-small>mdi-open-in-new</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-col>
            </v-row>
        </v-container>
        
    </v-card>
</template>

<style scoped>
    .left-border{
        border-left: 5px solid;
    }
    .number-area{
        background-color: #1010104F;
    }
    .number-element{
        display: grid;
        height: 100%;
        justify-content: center;
        align-content: center;
    }

    .text-div{
        display: grid;
        align-content: center;
        justify-content: center;
        height: 100%;
    }

    @media screen and (max-width: 600px) {
        .number-span{
            font-size: 5vw;
        }

        .text-div{
            font-size: 3vw;
        }

    }

    @media screen and (min-width: 601px) and (max-width: 959px) {
        .number-span{
            font-size: 5vw;
        }

        .text-div{
            font-size: 1.2vw;
        }

    }

    @media screen and (min-width: 960px) and (max-width: 1263px) {
        .number-span{
            font-size: 2.7vw;
        }
        .text-div{
            font-size: 0.9vw;
        }        
    }

    @media screen and (min-width: 1264px) and (max-width: 1903px) {
        .number-span{
            font-size: 2.4vw;
        }
        .text-div{
            font-size: 1vw;
        }        
    }

    @media screen and (min-width: 1904px){
        .number-span{
            font-size: 2.4vw;
        }
        .text-div{
            font-size: 1vw;
        }        
    }
    
</style>

<script>
    module.exports = {
        props:{
            'background-color' : {
                type: String,
                required: false,
                default: 'white'
            },
            'border-color':{
                type: String,
                required: false,
                default: '#800000'
            },
            'width' : {
                type: String,
                required: false,
                default: '100%'
            },
            'height' : {
                type: String,
                required: false,
                default: '100%'
            },
            'value' : {
                type: Number,
                required: false,
                default: 0
            },
            'value-color':{
                type: String,
                required: false,
                default: 'white'
            },
            'show-more-link':{
                type: Boolean,
                required: false,
                default: false
            },
            'more-icon-color':{
                type: String,
                required: false,
                default: 'green lighten-3'
            },
            'more-link':{
                type: String,
                required: false,
                default: '#'
            },
            'text':{
                type: String,
                required: false,
                default: ''
            },
            'text-color':{
                type: String,
                required: false,
                default: 'black'
            }
        },
        data:function(){
            return {
                test : ''
            }
        },
    }
</script>