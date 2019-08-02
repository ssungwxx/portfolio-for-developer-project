<template>
    <v-container>
        <div class="table-div">
            <table class="table">
                <tr>
                    <th>
                        <span class="table-head">{{ post.post_title }}</span>
                        <span class="table-date">{{ post.post_date }}</span>
                    </th>
                </tr>
                <tr>
                    <div class="table-content">{{ post.post_content }}</div>
                </tr>
            </table>
        </div>

        <div>
            <v-flex xs12 text-xs-center round my-5>
                <router-link :to="posts" style="text-decoration: none;">
                    <v-btn color="info" dark>
                        <v-icon size="25" class="mr-2">home</v-icon>
                        목록으로
                    </v-btn>
                </router-link>
            </v-flex>
        </div>
    </v-container>
</template>
<script>
    import RestService from "@/services/RestService";

    export default {
        name: "PostDetail",
        props: {
            post_title: {type: String}
        },
        data() {
            return {
                post_no: this.$route.params.post_id - 1,
                user_id: this.$route.params.id,
                posts: "",
                status: "비회원",
                post: []
            };
        },
        beforeMount() {
            this.insertLog();
        },
        mounted() {
            this.getPost();
        },
        methods: {
            async getPost() {
                this.post = await RestService.getPostDetail(this.user_id, this.post_no);
                const date = this.post.post_date;
                this.post.post_date = date.slice(0, 10) + " " + date.slice(12, 16);
                this.posts = "/users/" + this.user_id + "/posts/"
                },
            async insertLog() {
                this.insertLog = await RestService.insertLog("DetailPost");
            },
            loginCheck() {
                if (this.$store.state.isAuth) {

                }
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
