<template>
    <v-layout row wrap mw-700>
        <v-flex v-for="i in posts.length > loadlimits ? loadlimits : posts.length" :class="'md' + 12 / column" xs12 px-3>
            <Post
                :post_index="i"
                :post_no="posts[i - 1].post_no"
                :post_date="posts[i - 1].post_date"
                :post_title="posts[i - 1].post_title"
                :post_content="posts[i - 1].post_content"
                :user_id="user_id"
            ></Post>
            <v-divider></v-divider>
        </v-flex>

        <div class="plus" v-if="!loadMore">
            <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark v-on:click="loadMorePosts">
                <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
            </v-btn>
            <div style="display: flex; justify-content: center;">
                <router-link :to="writepost" style="text-decoration: none; margin-right: 20px" v-if="getId == user_id">
                    <v-btn class="target" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb"dark>
                        <v-icon size="25" class="mr-2">fa-edit</v-icon>글쓰기
                    </v-btn>
                </router-link>
                <router-link :to="userpage" style="text-decoration: none;">
                    <v-btn class="target" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb"dark>
                        <v-icon size="25" class="mr-2">fa-home</v-icon>돌아가기
                    </v-btn>
                </router-link>
            </div>
        </div>
    </v-layout>
</template>
<script>
import Post from "@/components/Post";
import RestService from "@/services/RestService";
import Git from "@/services/GitLabRepoService";
import {mapActions} from "vuex";

export default {
    name: "PostList",
    props: {
        column: { type: Number, default: 3 },
        limits: { type: Number, default: 6 },
        loadMore: { type: Boolean, default: false },
        user_id: {type: String},
    },
    data() {
        return {
            posts: [],
            writepost: `/users/${this.user_id}/writepost`,
            loadlimits: this.limits,
            userpage: `/users/${this.user_id}`
        };
    },
    components: {
        Post
    },
    mounted() {
        this.getPosts();
        this.setLoginInfo();
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
      ...mapActions(['setLogin']),
      setLoginInfo() {
        this.setLogin();
      },
        async getPosts() {
            this.posts = await RestService.getPost(this.user_id);
            for (const post of this.posts) {
                post.post_date = await Git.calendar_time(post.post_date);
            }
            for (const post of this.posts) {
                let newContent = "";
                for (const char of post.post_content) {
                    newContent += char;
                    if (char === "\n") {
                        newContent += "</br>";
                    }
                }
                post.post_content = newContent;
            }
        },
        loadMorePosts() {
            this.loadlimits += 6;
        },
    },
    created() {
        this.getPosts();
    },
    watch: {
        $route: function() {
            this.posts = [];
            this.getPosts();
        },
    }
};
</script>
<style>
.plus {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
}

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
