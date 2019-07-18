<template>
<v-tooltip top>
  <v-icon slot="activator" color="rgb(102, 102, 102)" large class="translate" @click="select">g_translate</v-icon>
  <span>페이지 번역</span>
</v-tooltip>
</template>

<script>
export default {
  name: "TranslateButton",
  methods: {
    select() {
      const selected = document.querySelectorAll(".v-content")[1];

    export default {
        name: "TranslateButton",
        methods: {
            select () {
                const selected = document.querySelectorAll(".v-content")[1];

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
