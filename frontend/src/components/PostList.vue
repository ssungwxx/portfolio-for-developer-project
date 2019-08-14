<template>
<v-layout row wrap mw-700 v-if="write === false">
    <v-flex v-for="i in posts.length > loadlimits ? loadlimits : posts.length" :class="'md' + 12 / column" xs12 px-3>
        <Post :post_index="i" :post_no="posts[i - 1].post_no" :post_date="posts[i - 1].post_date" :post_title="posts[i - 1].post_title" :post_content="posts[i - 1].post_content" :user_id="user_id"></Post>
        <v-divider></v-divider>
    </v-flex>

    <div class="plus" v-if="!loadMore">
        <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark v-on:click="loadMorePosts">
            <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
        </v-btn>
        <div style="display: flex; justify-content: center;">
            <v-btn class="target postbutton" style="margin-top: 3rem" @click="writeon" color="#ffc0cb" dark v-if="getIsLogin && getId == user_id">
                <v-icon size="25" class="mr-2">fa-edit</v-icon>글쓰기
            </v-btn>

            <router-link :to="goback" style="text-decoration: none; ">
                <v-btn class="target postbutton" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb" dark>
                    <v-icon size="25" class="mr-2">fa-home</v-icon>돌아가기
                </v-btn>
            </router-link>
        </div>
    </div>
</v-layout>

<v-form ref="form" v-model="valid" lazy-validation class="writetop" v-else>
    <div class="writediv">
        <v-text-field class="write-post" v-model="title" :rules="titleRules" label="제목" required></v-text-field>
        <v-textarea class="write-post" v-model="content" :rules="contentRules" label="내용" required></v-textarea>
    </div>
    <div class="btns">
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">쓰기</v-btn>
        <v-btn color="error" class="mr-4" @click="writeon">돌아가기</v-btn>
    </div>
</v-form>
</template>
<script>
import Post from "@/components/Post";
import RestService from "@/services/RestService";
import Git from "@/services/GitLabRepoService";
import {mapActions} from 'vuex';

export default {
    name: "PostList",
    props: {
        column: { type: Number, default: 3 },
        limits: { type: Number, default: 6 },
        loadMore: { type: Boolean, default: false },
        user_id: { type: String }
    },
    data() {
        return {
            posts: [],
            loadlimits: this.limits,
            goback: "",
            write: false,
            valid: true,
            title: "",
            titleRules: [v => !!v || "Title is required"],
            content: "",
            contentRules: [v => !!v || "Content is required"],
            postlist: ""
        };
    },
    components: {
        Post
    },
    async mounted() {
      await this.setLoginInfo();
        this.setGoback();
    },
    created() {
        this.getPosts();
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
      async setLoginInfo() {
        await this.setLogin();
      },
        setGoback() {
            if (this.getIsLogin) {
                this.goback = '/';
            } else {
                this.goback = '/users/' + this.user_id;
            }
        },
        writeon() {
            if (this.write === false) {
                this.write = true;
            } else {
                this.write = false;
            }
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
        async validate() {
            if (this.$refs.form.validate()) {
                const data = {
                    user_id: this.user_id,
                    post_title: this.title,
                    post_content: this.content
                };
                await RestService.insertPost(data);
                //this.pushNotification();
                this.getPosts();
                this.write = false;
                this.$refs.form.reset();
            }
        },
        async reset() {
            this.$refs.form.reset();
        }
        // async pushNotification() {
        //     var list = await this.getTokenlist();
        //     let test = [];
        //     for (var i = 0; i < list.data.length; i++) {
        //         test[i] = list.data[i].fcm_token;
        //     }
        //     var body = "게시물이 등록되었습니다.";
        //     var title = "PostPage";
        //     //const temp = RestService.pushNotification({body:body},title,test);
        // },
        // getTokenlist() {
        //     return RestService.getTokenlist();
        // }
    }
};
</script>
<style>
.postbutton {
    margin-left: 0px !important;
}

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
