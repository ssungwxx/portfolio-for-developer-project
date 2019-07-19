<template>
    <v-layout>
        <v-icon color="red" large class="translate" @click="select">g_translate</v-icon>
    </v-layout>
</template>

<script>
    import RestService from "../services/RestService"

    export default {
        name: "TranslateButton",
        component: {},
        data() {
            return {
                koText: "",
                enText: "",
                now: "",
            }
        },
        methods: {
            async select() {
                if (this.now === "" || this.now === "ko") {
                    const data = {
                        source: "ko-KR",
                        target: "en-US",
                        translate: document.querySelector(".CodeMirror-scroll").outerHTML,
                    };
                    this.now = "en";
                    this.enText = await RestService.translateText(data);
                    document.querySelector(".CodeMirror-scroll").outerHTML = this.enText;
                } else {
                    const data = {
                        source: "en-US",
                        target: "ko-KR",
                        translate: document.querySelector(".CodeMirror-scroll").outerHTML,
                    };
                    this.now = "ko";
                    this.koText = await RestService.translateText(data);
                    document.querySelector(".CodeMirror-scroll").outerHTML = this.koText;
                }
            }
        },
    }
</script>

<style>
    .translate {
        position: fixed;
        bottom: 20%;
        left: 95%;
        margin: 0;
        padding: 0;
        z-index: 5;
    }
</style>