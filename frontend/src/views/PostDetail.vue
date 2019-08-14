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
        <v-flex xs12 text-xs-center round my-5>
            <router-link :to="posts" style="text-decoration: none;">
                <v-btn color="info" dark>
                    <i class="material-icons">view_list</i>목록으로
                </v-btn>
            </router-link>
            <v-btn color="red" dark @click="deletepost" v-if="getIsLogin && getId == post.user_id">
                <v-icon size="25" class="mr-2">delete</v-icon>
                삭제
            </v-btn>
        </v-flex>
    </div>

    <div style="display: flex; width: 90%; margin: auto; justify-content: flex-end;" v-if="getIsLogin" @keydown.enter="postreply">
        <v-text-field class="write-reply" v-model="reply" :rules="commentRules" label="댓글 쓰기" required></v-text-field>
        <v-btn class="brush" icon @click="postreply">
            <v-icon>brush</v-icon>
        </v-btn>
    </div>
    <div class="post-reply" v-if="comments.length !== 0">
        <table>
            <tr>
                <th class="post-user-id">User ID</th>
                <th>Comment</th>
                <th class="post-date">Date</th>
                <th></th>
            </tr>
            <tr v-for="(comment, i) of comments" :key="i">
                <td class="post-user-id">{{ comment.user_id }}</td>
                <td class="post-comment" :id="'comment' + i" style="display: table-cell;">
                    {{ comment.pcom_comment}}
                </td>
                <td class="post-comment" :id="'edit' + i" style="display: none;">
                    <input style="background-color: rgba(0, 0, 0, 0.15)" :value="comment.pcom_comment" autofocus />
                </td>
                <td class="post-date">{{ comment.pcom_date }}</td>
                <td class="post-detail-buttons" v-if="getIsLogin && getId == comment.user_id">
                    <v-btn :id="'btn' + i" style="color: black;" class="post-detail-button" icon @click="editreply(i, comment)">
                        <v-icon>create</v-icon>
                    </v-btn>
                    <v-btn class="post-detail-button" v-if="getIsLogin && getId == comment.user_id" icon @click="deletereply(comment)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </td>
                <td class="post-detail-buttons" v-else></td>
            </tr>
        </table>
    </div>
</v-container>
</template>
<script>
import RestService from "@/services/RestService";
import Git from "@/services/GitLabRepoService";
import { mapActions } from "vuex";

export default {
    name: "PostDetail",
    props: {
        post_no: { type: Number }
    },
    data() {
        return {
            post_index: this.$route.params.post_id,
            user_id: this.$route.params.id,
            posts: "",
            post: [],
            comments: [],
            editable: false,
            reply: "",
            chk: false,
            commentRules: [
                v => this.chkreply(v)
            ],
        };
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
    beforeMount() {
        this.insertLog();
    },
    created() {
        this.getPost();
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
            for (let i = 0; i < this.comments.length; ++i) {
                this.comments[i].pcom_date = Git.calendar_time(this.comments[i].pcom_date);
            }
        },
        async insertLog() {
            const data = {
                user_id: this.$store.getters.getId,
            }
            this.insertLog = await RestService.insertLog("DetailPost", data);
        },
        async deletepost() {
            const data = {
                user_id: this.user_id
            };
            await RestService.deletePost(this.post.post_no, data);
            this.$router.push("../posts");
        },
        async deletereply(reply) {
            await RestService.deletePostComment(reply.pcom_no, this.getId);
            this.getComments();
        },
        async edit(id, no) {
            const comment = document.querySelector(`#edit${id} > input`).value;
            const data = {
                pcom_comment: comment
            };
            await RestService.updatePostComment(no, data);
            this.getComments();
        },
        editreply(id, reply) {
            if (this.getId === reply.user_id) {
                const btn = document.getElementById('btn' + id);
                if (btn.attributes.style.value === "color: black;") {
                    const origin = document.getElementById('comment' + id);
                    const edit = document.getElementById('edit' + id);
                    origin.attributes.style.value = "display: none";
                    edit.attributes.style.value = "display: table-cell;";
                    btn.attributes.style.value = "color: red;"
                } else {
                    this.edit(id, reply.pcom_no);
                    const origin = document.getElementById('comment' + id);
                    const edit = document.getElementById('edit' + id);
                    edit.attributes.style.value = "display: none";
                    origin.attributes.style.value = "display: table-cell;";
                    btn.attributes.style.value = "color: black;";
                }
            }
        },
        async postreply(reply) {
            if (this.getIsLogin) {
                if (this.chk) {
                    const data = {
                        user_id: this.getId,
                        pcom_comment: this.reply,
                        post_no: this.post.post_no,
                    };
                    await RestService.insertPostComment(data);
                    this.reply = "";
                    this.getComments();
                    this.chk = true;
                }
            } else {
                this.edit(id, no)
                const origin = document.getElementById('comment' + id);
                const edit = document.getElementById('edit' + id);
                edit.attributes.style.value = "display: none";
                origin.attributes.style.value = "display: table-cell;";
                btn.attributes.style.value = "color: black;";
            }
        },
        async postreply(reply) {
            if (this.getIsLogin) {
                if (this.chk) {
                    const data = {
                        user_id: this.getId,
                        pcom_comment: this.reply,
                        post_no: this.post.post_no,
                    };
                    await RestService.insertPostComment(data);
                    this.reply = "";
                    this.getComments();
                    this.chk = true;
                }
            } else {
                this.$router.push("./")
            }
        },
        chkreply(reply) {
            if (reply) {
                this.chk = true;
                return true
            } else {
                if (this.chk) {
                    this.chk = false;
                    return true
                } else {
                    this.chk = false;
                    return "comment is required"
                }
            }
        }
    }
};
</script>
<style>
    .brush {
        margin: 0;
        position: absolute;
    }

    .post-detail-buttons {
        width: 10%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .post-detail-button {
        margin: 0;
    }

    .post-reply > table {
        border: 3px rgba(0, 0, 0, 0.5) double;
        border-radius: 15px;
        overflow: hidden;
        border-collapse: collapse;
    }

    .post-date {
        width: 10%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .post-user-id {
        width: 10%;
    }

    .post-reply > table > tr > th {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px rgba(0, 0, 0, 0.2) solid;
        padding: 3px;
    }

    .post-reply > table > tr > td {
        line-height: 36px;
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*white-space: nowrap;*/
        border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
        padding: 3px;
    }

    .post-reply > table {
        width: 90%;
        margin: auto;
    }

    .post-comment {
        text-align: left;
    }


    .time {
        font-size: 1.2vw;
        margin-left: 80%;
        font-color: black;
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
        width: 90%;
        margin-left: auto;
        margin-right: auto;
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
        flex-basis: 100%;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    .table-date {
        font-size: 1vw;
        margin-left: 10px;
        color: gray;
    }
</style>
