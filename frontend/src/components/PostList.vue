<template>
  <v-layout row wrap mw-700>
    <v-flex
      v-for="i in posts.length > limits ? limits : posts.length"
      :class="'xs' + 12 / column"
      px-3
    >
      <Post
        :post_date="posts[i - 1].post_date"
        :post_title="posts[i - 1].post_title"
        :post_content="posts[i - 1].post_content"
      ></Post>
      <v-divider></v-divider>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Post from "@/components/Post";
import RestService from "@/services/RestService";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 2 },
    limits: { type: Number, default: 4 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: []
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await RestService.getPosts();
    },
    loadMorePosts() {
      this.limits += 4;
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.color-333 {
  overflow: hidden;
  line-height: 1.5;
  text-overflow: ellipsis;
  height: 1.5em;
}

.color-666 {
  overflow: hidden;
  line-height: 1.2;
  text-overflow: ellipsis;
  height: 3.6em;
}
</style>
