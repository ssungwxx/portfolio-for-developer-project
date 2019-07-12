<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="caption">{{post_date}}</div>
      <h2 class="color-333 headline font-weight-light">{{post_title}}</h2>
      <p class="mb-1 color-666 font-weight-light subheading">{{post_content}}</p>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Post",
  props: {
    post_title: { type: String },
    post_content: { type: String },
    post_date: { type: Date }
  },
  computed: {}
};
</script>
<style>
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
</style>
