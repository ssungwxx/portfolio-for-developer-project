<template>
<div :class="!isTop?'top-button':'top-button-d-none'">
  <v-tooltip top>
    <button slot="activator" @click="gotop">
      <img src="../../public/img/arrow-up.png" alt="logo" height="30px" />
    </button>
    <span>맨 위로 이동</span>
  </v-tooltip>
</div>
</template>


<script>
export default {
  name: "TopButton",
  props: {},
  data: function() {
    return {
      isTop: true
    };
  },
  methods: {
    handleScroll(event) {
      if (window.scrollY < 1) {
        this.isTop = true;
      } else {
        this.isTop = false;
      }
    },
    gotop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })

    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style>
    .top-button {
        position: fixed;
        bottom: 5%;
        right: 96%;
        margin: 0;
        padding: 0;
        z-index: 2;
    }

    .top-button-d-none {
        display: none;
        position: fixed;
        bottom: 80px;
        left: 50px;
        margin: 0;
        padding: 0;
    }
</style>
