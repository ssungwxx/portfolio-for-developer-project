<template>
    <v-card class="ma-3 vcard" :href="repo_add">
        <v-card-title primary-title>
            <div>
                <p class="flex repotitle">{{ repo_title }}</p>
                <p class="flex grey--text">recent push: {{ repo_recent.slice(0, 10) }}</p>
            </div>
        </v-card-title>
        <div class="py-3">
            <v-layout row wrap>
                <v-flex>
                    <v-sheet style="height: 100%" v-if="git" class="v-sheet--offset mx-auto" color="grey lighten-5" elevation="12"
                             max-width="calc(100% - 32px)" height="60%">
                        <v-sparkline :labels="Object.keys(data).reverse()" :value="Object.values(data).reverse()" :smooth="radius || false"
                                     :stroke-linecap="lineCap" :gradient="gradient" color="grey"
                                     line-width="2" padding="16" auto-draw class="zoom">
                        </v-sparkline>
                    </v-sheet>
                    <p v-else style="height: 100%">Push 기록이 없습니다.</p>
                </v-flex>
            </v-layout>
        </div>
    </v-card>
</template>

<script>
    import Git from "@/services/GitLabRepoService"
    import RestService from "@/services/RestService"

    export default {
        name: "Repo",
        props: {
            repo_title : {type: String},
            repo_add : {type: String},
            repo_created : {type: String},
            repo_recent : {type: String},
            repo_id : {type: Number},
            user_id : {type: String}
        },
        data() {
            return {
                radius: 5,
                gradient: ["#1feaea", "#ffd200", "#f72047"],
                lineCap: "round",
                data: {},
                message: {},
                url: "",
                token: "",
                git: false,
            }
        },
        methods: {
            async drawGraph() {
                await this.getUrl();
                await this.getGraphInfo();
                await this.getMessage();
                console.log(this.message)
            },
            async getGraphInfo() {
                this.data = await Git.getPushed(this.url, this.repo_id, this.token);
                if (Object.keys(this.data).length !== 1) {
                    this.git = true;
                }
            },
            async getMessage() {
                if (this.git === true) {
                    this.message = await Git.getMessage(this.url, this.repo_id, this.token);
                }
            },
            async getUrl() {
                const user = await RestService.getUser(this.user_id);
                this.url = user[0].user_gitAdd;
                this.token = user[0].user_gitToken;
            }
        },
        mounted() {
            this.drawGraph();
        }
    }

</script>

<style>
    .headline_truncate {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .content_truncate {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    p {
        height: auto;
        line-height: 1.2;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        align-self: center;
    }

    .repotitle {
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        height: 100%;
        font-size: 2.5vw;
        margin: 0;
        text-align: left;
    }

    p.grey--text {
        font-size: 1.15vw;
        height: 100%;
        margin: 0;
        text-align: left;
    }

    a.v-card {
        position: relative;
    }
    
    .zoom {
        width: 100%;
        height: 100%;
    }
    
    .vcard {
        padding: 5px;
    }
</style>