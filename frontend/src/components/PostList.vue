<template>
    <v-layout row wrap mw-700>
        <v-flex v-for="i in posts.length > limits ? limits : posts.length" :class="'md' + 12 / column" xs12 px-3>
            <Post
                :post_no="posts[i - 1].post_no"
                :post_date="posts[i - 1].post_date"
                :post_title="posts[i - 1].post_title"
                :post_content="posts[i - 1].post_content"
                :user_id="user_id"
            ></Post>
            <v-divider></v-divider>
        </v-flex>

        <div class="plus" v-if="loadMore">
            <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark v-on:click="loadMorePosts">
                <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
            </v-btn>
            <v-btn class="target" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb" href="/writepost" dark>
                <v-icon size="25" class="mr-2">fa-edit</v-icon>Write
            </v-btn>
        </div>
    </v-layout>
</template>
<script>
import Post from "@/components/Post";
import RestService from "@/services/RestService";

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
            this.posts = await RestService.getPost(this.user_id);
            for (let idx = 0; idx < this.posts.length; idx++) {
                this.posts[idx].post_date =
                    this.posts[idx].post_date.slice(0, 10) +
                    " " +
                    this.posts[idx].post_date.slice(11, 19);
            }
        },
        loadMorePosts() {
            this.limits += 6;
        }
    }
};
</script>
<style>
.plus {
    width: 100%;
    display: flex;
    flex-direction: column;
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
