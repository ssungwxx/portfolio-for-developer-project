<!-- 삭제 예정 -->

<template>
    <div style="display: flex">
        <v-expansion-panel>
            <v-expansion-panel-content>
                <v-card slot="header" class="repocard">
                    <v-card-title primary-title class="align">
                        <div class="repodiv">
                            <p class="repotitle">{{ repo_title }}</p>
                            <p class="grey--text">recent push: {{ repo_recent.slice(0, 10) }}</p>
                        </div>
                    </v-card-title>
                    <div class="py-3 repodiv">
                        <v-layout row wrap>
                            <v-flex>
                                <v-sheet style="height: 100%" v-if="git" class="v-sheet--offset mx-auto"
                                         color="grey lighten-5"
                                         elevation="12"
                                         max-width="calc(100% - 32px)" height="60%">
                                    <v-sparkline :labels="Object.keys(data).reverse()"
                                                 :value="Object.values(data).reverse()"
                                                 :smooth="radius || false"
                                                 :stroke-linecap="lineCap" :gradient="gradient" color="grey"
                                                 line-width="2" padding="16" auto-draw class="zoom">
                                    </v-sparkline>
                                </v-sheet>
                                <p v-else style="height: 100%; text-align: center">Push 기록이 없습니다.</p>
                            </v-flex>
                        </v-layout>
                    </div>
<!--                    <v-btn icon :href="repo_add" target="_blank">-->
<!--                        <v-icon large class="material-icons">pageview</v-icon>-->
<!--                    </v-btn>-->
                    <div class="buttons">
                        <v-tooltip bottom>
                                <v-btn slot="activator" icon :href="repo_add" target="_blank">
                                    <v-icon large class="material-icons">pageview</v-icon>
                                </v-btn>
                            <span>Gitlab으로 이동</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <v-btn v-if="getId == user_id" slot="activator" icon @click="deleterepo(repo_id)">
                                <v-icon large class="material-icons">delete</v-icon>
                            </v-btn>
                            <span>repository 삭제</span>
                        </v-tooltip>
                    </div>
                    <div style="overflow: hidden; width: 100%">
                        <div v-if="git">
                            <div style="display: flex; border-bottom: 1px gray solid; margin-bottom: 10px"
                                 v-for="i in Object.keys(message[0]).length" :key="i">
                                <p style="min-width: 30px; overflow: hidden; text-overflow: ellipsis">{{ message[0][i -
                                    1] }}</p>
                                <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">{{
                                    message[1][i - 1] }}</p>
                            </div>
                        </div>
                        <p v-else style="height: 100%; text-align: center">Push 기록이 없습니다.</p>
                    </div>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>

<script>
    import Git from "@/services/GitLabRepoService"
    import RestService from "@/services/RestService"

    export default {
        name: "Repo",
        props: {
            repo_title: {type: String},
            repo_add: {type: String},
            repo_created: {type: String},
            repo_recent: {type: String},
            repo_id: {type: Number},
            repo_no: {type: Number},
            user_id: {type: String},
        },
        data() {
            return {
                radius: 5,
                gradient: ["#1feaea", "#ffd200", "#f72047"],
                lineCap: "round",
                data: {},
                message: [[], []],
                url: "",
                token: "",
                git: false,
                len: 0,
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
            async deleterepo(id) {
                await RestService.deleteRepository(id, {user_id: this.user_id});
            },
            async drawGraph() {
                await this.getUrl();
                await this.getMessage();
                await this.getGraphInfo();
            },
            async getGraphInfo() {
                this.data = await Git.getPushed(this.url, this.repo_id, this.token);
                this.len = Object.keys(this.data).length - 1;
                if (!(this.len === 0 && Object.values(this.data)[0] === 0)) {
                    this.git = true;
                    this.len += 1;
                }
            },
            async getMessage() {
                const mess = await Git.getMessage(this.url, this.repo_id, this.token);
                this.message[0] = Object.keys(mess);
                this.message[1] = Object.values(mess);
            },
            async getUrl() {
                const user = await RestService.getUser(this.user_id);
                this.url = user.user_gitAdd;
                this.token = user.user_gitToken;
            }
        },
        created() {
            this.drawGraph();
        },
        watch: {
            $route: function () {
                this.drawGraph();
            }
        }
    }

</script>

<style>


    .align {
        display: flex;
        justify-content: space-between;
    }

    .pushed {
        display: flex;
        padding: 0 15px;
        overflow: hidden;
    }

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
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        align-self: center;
        margin-bottom: 0;
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

    .zoom {
        width: 100%;
        height: 100%;
    }

    .repocard {
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .grey.lighten-5 {
        background-color: white !important;
        box-shadow: 0 2px 2px -4px rgba(0,0,0,.2), 0 7px 6px 2px rgba(0,0,0,.14), 0 5px 6px 4px rgba(0,0,0,.12) !important;
        -webkit-box-shadow: 0 2px 2px -4px rgba(0,0,0,.2), 0 7px 6px 2px rgba(0,0,0,.14), 0 5px 6px 4px rgba(0,0,0,.12) !important;
    }

    .v-card {
        box-shadow : none;
        -webkit-box-shadow: none;
    }

    .repodiv {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .v-expansion-panel__header__icon {
        display: none;
    }

    .v-expansion-panel__header {
        padding: 0;
    }

    .v-expansion-panel {
        box-shadow: 0px 2px 0px 0px rgba(0,0,0,.2), 0px 1px 0px 0px rgba(0,0,0,.14), 0px 1px 0px -1px rgba(0,0,0,.12);
        -webkit-box-shadow: 0px 2px 0px 0px rgba(0,0,0,.2), 0px 1px 0px 0px rgba(0,0,0,.14), 0px 1px 0px -1px rgba(0,0,0,.12);
    }
</style>
