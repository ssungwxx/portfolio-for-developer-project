<template>
<v-layout>
  <v-tooltip right>
    <v-icon slot="activator" color="rgb(102, 102, 102)" large class="translate" @click="select">g_translate</v-icon>
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
                koText: "",
                enText: "",
                now: "",
            }
        },
        methods: {
            async select() {
                if (document.querySelector(".editor-preview.editor-preview-active") === null) {
                    alert("Preview를 활성화 해주세요.")
                } else {
                if (this.now === "" || this.now === "ko") {
                    const data = {
                        source: "ko-KR",
                        target: "en-US",
                        translate: document.querySelector(".editor-preview.editor-preview-active").outerHTML,
                    };
                    this.now = "en";
                    this.enText = await RestService.translateText(data);
                    document.querySelector(".editor-preview.editor-preview-active").outerHTML = this.enText;
                } else {
                    const data = {
                        source: "en-US",
                        target: "ko-KR",
                        translate: document.querySelector(".editor-preview.editor-preview-active").outerHTML,
                    };
                    this.now = "ko";
                    this.koText = await RestService.translateText(data);
                    document.querySelector(".editor-preview.editor-preview-active").outerHTML = this.koText;
                }
            }
        }
    },
}
</script>

<style>
.translate {
  position: fixed;
  bottom: 5%;
  right: 96%;
  margin: 0;
  padding: 0;
  z-index: 5;
}
</style>
