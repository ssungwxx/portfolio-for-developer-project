<template>
    <v-icon color="red" large class="translate" @click="getEn">g_translate</v-icon>
</template>

<script>
import RestService from "../services/RestService"


    export default {
        name: "TranslateButton",
        data () {
            return {
                koText: "",
                enText: "",
            }
        },
        methods: {
            async select () {
                const selected = document.querySelectorAll(".v-content")[1];
                console.log(selected);
                this.enText = await RestService.translateText(selected);
                console.log(this.enText)
            },
            getEn () {
                RestService.getEn();
            }
        }
    }

</script>

<style>
    .translate {
        position: fixed;
        bottom: 50px;
        left: 50px;
        margin: 0;
        padding: 0;
        z-index: 5;
    }
</style>