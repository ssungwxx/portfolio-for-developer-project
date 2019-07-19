<template>
    <v-layout>
        <v-tooltip left>
            <v-icon slot="activator" color="rgb(102, 102, 102)" large class="translate" @click="select">g_translate
            </v-icon>
            <span>번역하기</span>
        </v-tooltip>
    </v-layout>
</template>

<script>
    import RestService from "../services/RestService"

    export default {
        name: "TranslateButton",
        component: {},
        data() {
            return {
                koText: [],
                enText: [],
                now: "",
            }
        },
        methods: {
            async select() {
                if (this.now === "" || this.now === "ko") {
                    for (const text of document.querySelectorAll(".target")) {
                        const data = {
                            source: "ko-KR",
                            target: "en-US",
                            translate: text.outerHTML,
                        };
                        this.enText.push(await RestService.translateText(data))
                    }
                    this.now = "en";
                    for (let i = 0; this.enText.length > i; i++) {
                        document.querySelectorAll(".target")[i].outerHTML = this.enText[i]
                    }
                } else {
                    for (const text of document.querySelectorAll(".target")) {
                        const data = {
                            source: "en-US",
                            target: "ko-KR",
                            translate: text.outerHTML,
                        };
                        this.koText.push(await RestService.translateText(data))
                    }
                    this.now = "ko";
                    for (let i = 0; this.enText.length > i; i++) {
                        document.querySelectorAll(".target")[i].outerHTML = this.koText[i]
                    }
                }
            }
        }

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