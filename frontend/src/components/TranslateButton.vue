<template>
    <div>
        <div v-html="enText">

        </div>

        <textarea name="translate" id="translate" style="display: none"></textarea>
        <v-icon color="red" large class="translate" @click="select">g_translate</v-icon>
    </div>
</template>

<script>
import RestService from "../services/RestService"
import enPage from "../views/enPage.vue"

    export default {
        name: "TranslateButton",
        component: {
            enPage,
        },
        data () {
            return {
                koText: "",
                enText: "",
            }
        },
        methods: {
            ko() {
                const text = document.querySelector("#translate");
                text.value = document.querySelectorAll(".v-content")[1];
                this.koText = text.value;
                text.value = ""
                console.log("한글" + this.koText)
            },
            async select () {
                if (this.koText === "") {
                    this.ko();
                    const text = document.querySelector("#translate");
                    text.value = document.querySelectorAll(".v-content")[1];
                    const data = {
                        translate : text.value
                    };
                    const res = await RestService.translateText(data);
                    this.enText = res.toString();
                } else {
                    this.enText = "";
                }
                console.log("영어" + this.enText)
            },
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