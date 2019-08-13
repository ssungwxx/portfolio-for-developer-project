<template>
    <router-link :to="detaillink" :post_no="post_no" style="text-decoration:none">
        <v-layout py-4 h-100>
            <v-flex row>
                <div class="caption target">{{ post_date }}</div>
                <h2 class="color-332 target">{{ post_title }}</h2>
                <p class="mb-1 color-666 target" v-html="post_content"></p>
            </v-flex>
        </v-layout>
    </router-link>
</template>

<script>
import PostDetail from "../views/PostDetail"
import RestService from "../services/RestService";

export default {
    name: "Post",
    props: {
        post_index: {type: Number},
        post_no: {type: Number},
        post_title: { type: String },
        post_content: { type: String },
        post_date: { type: String },
        user_id: {type: String}
    },
    components: {
        PostDetail
    },
    data() {
        return {
            detaillink: "/users/" + this.user_id + "/posts/" + this.post_index,
        };
    },
    mounted() {

    },
    computed: {
      getIsLogin: function() {
        return this.$store.getters.getIsLogin;
      },
      getId: function() {
        return this.$store.getters.getId;
      },
      getGrade: function() {
        return this.$store.getters.getGrade;
      }
    },
    methods: {
        async insertlog() {
          const data = {
              user_id: this.$store.getters.getId,
          };
            await RestService.insertLog("Post", data)
        }
    }
};
</script>

<style>
.color-666 {
    color: #666;
}
.color-332 {
    color: #333;
    height: 50px;
}
.h-100 {
    height: 100%;
}
h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
p {
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
