<template>
<v-tooltip top>
  <v-icon color="rgb(102, 102, 102)" large class="translate" @click="getEn">g_translate</v-icon>
  <span>맨 위로 이동</span>
</v-tooltip>
</template>

<script>
import RestService from "../services/RestService";

export default {
  name: "TranslateButton",
  data() {
    return {
      koText: "",
      enText: ""
    };
  },
  methods: {
    async select() {
      const selected = document.querySelectorAll(".v-content")[1];
      console.log(selected);
      this.enText = await RestService.translateText(selected);
      console.log(this.enText);
    },
    getEn() {
      RestService.getEn();
    }
  }
};
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
