<template>
<v-layout row wrap v-if="write === false">
    <v-flex v-for="i in posts.length > loadlimits ? loadlimits : posts.length" md5 xs12>
        <Post :post_index="i" :post_no="posts[i - 1].post_no" :post_date="posts[i - 1].post_date" :post_title="posts[i - 1].post_title" :post_content="posts[i - 1].post_content" :user_id="user_id"></Post>
    </v-flex>

    <div class="plus" v-if="!loadMore">
        <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark v-on:click="loadMorePosts">
            <v-icon size="25">fa-plus</v-icon><v-flex style="margin-left: 10px" hidden-xs-only>더 보기</v-flex>
        </v-btn>
        <div style="display: flex; justify-content: center;">
            <v-btn class="target postbutton" style="margin-top: 1vw" @click="writeon" color="#ffc0cb" dark v-if="getIsLogin && getId == user_id">
                <v-icon size="25">fa-edit</v-icon><v-flex style="margin-left: 10px;" hidden-xs-only>글쓰기</v-flex>
            </v-btn>

            <router-link :to="goback" style="text-decoration: none; ">
                <v-btn class="target postbutton" style="margin-right: auto; margin-top: 1vw" color="#ffc0cb" dark>
                    <v-icon size="25">fa-home</v-icon><v-flex style="margin-left: 10px" hidden-xs-only>돌아가기</v-flex>
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
    watch: {
        $route: function() {
            this.user_id = this.$route.params.id;
            this.posts = [];
            this.getPosts();
        }
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
.layout.row.wrap {
    justify-content: space-around;
    width: 80%;
    margin: auto;
}

.layout.row.wrap > .flex.md5.xs12 {
    margin-bottom: 20px;
    border: gray 3px solid;
    border-radius: 15px;
}

.layout.row.wrap > .flex.md5.xs12:hover {
    border: rgba(255, 150, 150, 1) 3px solid;
    background-color: rgba(255, 190, 200, 0.2);
}

.postbutton {
    margin-left: 0px !important;
}

.plus {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
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

.v-text-field__slot > textarea {
    height: 500px;
}

.writetop {
    margin-top: 60px;
}

.writediv {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.write-post {
    width: 70%;
}

.btns {
    margin-top: 50px;
}
</style>
