<template>
  <div id="app">
  <section class="section has-text-centered">
    <h1 class="title is-1">
      Your Window
    </h1>
    <h2 class="title is-2">
      Width: {{ window.width }},
      Height: {{ window.height }}
    </h2>
  </section>
</div>
</template>

<script>
new Vue({
  el: '#app',
  data: {
    window: {
      width: 0,
      height: 0
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
});
</script>

<script>
export default {
}
</script>

<style>
html, body, #app, section.section {
  height: 100%;
}

section.section {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
</style>
