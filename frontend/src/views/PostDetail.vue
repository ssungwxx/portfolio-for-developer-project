<template>
    <v-container>
        <div class="table-div">
            <table class="table">
                <tr>
                    <th class="row-title">
                        <div>
                            <p class="table-title">제목</p>
                        </div>
                        <div>
                            <span class="table-head">{{ post.post_title }}</span>
                            <span class="table-date blockdrag">{{ post.post_date }}</span>
                        </div>
                    </th>
                </tr>
                <tr>
                    <div class="row-content">
                        <p class="table-title blockdrag">내용</p>
                    </div>
                    <div>
                        <p class="table-content" v-html="post.post_content"></p>
                    </div>
                </tr>
            </table>
        </div>

        <div>
<!--            this.$store.getters.getIsLogin-->
            <v-flex xs12 text-xs-center round my-5>
                <router-link :to="posts" style="text-decoration: none;">
                    <v-btn color="info" dark>
                        <i class="material-icons">view_list</i>목록으로
                    </v-btn>
                </router-link>
                <v-btn color="red" dark @click="deletepost" v-if="this.$store.getters.getUser_id === user_id">
                    <v-icon size="25" class="mr-2">delete</v-icon>
                    삭제
                </v-btn>
            </v-flex>
        </div>

        <div class="post-reply">
            <table v-for>
                <tr>
                    <td></td>
                </tr>
            </table>
        </div>
    </v-container>
</template>
<script>
    import RestService from "@/services/RestService";
    import Git from "@/services/GitLabRepoService";

    export default {
        name: "PostDetail",
        data() {
            return {
                post_index: this.$route.params.post_id,
                user_id: this.$route.params.id,
                posts: "",
                status: "비회원",
                post: [],
                comments: [],
                loginchk: false,
            };
        },
        beforeMount() {
            this.insertLog();
        },
        mounted() {
            this.getPost();
        },
        created() {

        },
        methods: {
            async getPost() {
                this.post = await RestService.getPostDetail(this.user_id, this.post_index - 1);
                const date = this.post.post_date;
                this.post.post_date = Git.calendar_time(this.post.post_date);
                this.posts = "/users/" + this.user_id + "/posts/";
                let newContent = "";
                for (const char of this.post.post_content) {
                    newContent += char;
                    if (char === "\n") {
                        newContent += "</br>";
                    }
                }
                this.post.post_content = newContent;
                this.getComments();
            },
            async getComments() {
                const comments = await RestService.getOnePostComments(this.post.post_no);
                this.comments = comments.data;
            },
            async insertLog() {
                this.insertLog = await RestService.insertLog("DetailPost");
            },
            async deletepost() {
                const data = {
                    user_id: this.user_id
                };
                await RestService.deletePost(this.post.post_no, data);
                this.$router.push("../posts");
            }
        }
    };
</script>
<style>

    .time {
        font-size: 1.2vw;
        margin-left: 80%;
        font-color: black;
    }

    .mw-700 {
        max-width: 700px;
        margin: auto;
    }

    .table-content {
        width: auto;
        height: auto;
        text-align: left;
        font-size: 2.5vw;
    }

    .headline {
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        height: 1.5em;
    }

    .grey--text {
        overflow: hidden;
        line-height: 1.2;
        text-overflow: ellipsis;
        height: 3.6em;
    }

    .table-div {
        display: flex;
        margin-top: 64px;
    }

    .table-head {
        font-size: 3.5vw;
    }

    .row-content {
        margin-top: 20px;
    }

    .row-title {
        border-bottom: 1px gray solid;
    }

    @media screen and (max-width: 600px) {
        .table-head {
            font-size: 20px;
        }

        .table-content {
            width: auto;
            height: auto;
            text-align: left;
            font-size: 14px;
        }
    }

    .table-title {
        margin: 0;
        color: gray;
        display: flex;
        justify-content: flex-end;
    }

    th {
        text-align: left;
    }

    .table {
        flex-basis: 80%;
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
    }

    .table-date {
        font-size: 1vw;
        margin-left: 10px;
        color: gray;
    }
</style>
