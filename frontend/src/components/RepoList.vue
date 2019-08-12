<template>
    <v-container>
        <v-layout wrap>
            <v-flex class="flexlist" v-for="i in repos.length > loadlimits ? loadlimits : repos.length" xs10 style="display: flex">
                <Repo
                    class="repos"
                    :repo_title="repos[i - 1].repo_title"
                    :repo_add="repos[i - 1].repo_add"
                    :repo_created="repos[i - 1].repo_createdDate"
                    :repo_recent="repos[i - 1].repo_recentDate"
                    :repo_id="repos[i - 1].repo_id"
                    :repo_no="repos[i - 1].repo_no"
                    :user_id="user_id">
                </Repo>
                <div class="buttons">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon :href="repo_add" target="_blank">
                            <v-icon large class="material-icons">pageview</v-icon>
                        </v-btn>
                        <span>Gitlab으로 이동</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <v-btn slot="activator" icon @click="deleterepo(repo_no)">
                            <v-icon large class="material-icons">delete</v-icon>
                        </v-btn>
                        <span>repository 삭제</span>
                    </v-tooltip>
                </div>
            </v-flex>
            <div class="plus" v-if="!loadMore">
                <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark @click="loadMoreRepos">
                    <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
                </v-btn>

                <div style="display: flex; justify-content: center;">
                    <router-link :to="Addrepos" style="text-decoration: none; margin-right: 20px;" v-if="getId == user_id">
                        <v-btn class="target" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb"dark>
                            <v-icon size="25" class="mr-2">fa-edit</v-icon>추가하기
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
    </v-container>
</template>

<script>
import Repo from "./Repo"
import RestService from "@/services/RestService"
import Git from "@/services/GitLabRepoService";

    export default {
        name: "RepoList",
        props: {
            column: { type: Number, default: 3 },
            limits: { type: Number, default: 4 },
            loadMore: { type: Boolean, default: false },
            user_id: {type: String}
        },
        components: {
            Repo,
        },
        data() {
            return {
                repos: [],
                userpage:`/users/${this.user_id}`,
                Addrepos: `/users/${this.user_id}/addrepo`,
                loadlimits: this.limits,
            }
        },
        methods: {
            async getRepos() {
                this.repos = await RestService.getRepository(this.user_id);
            },
            loadMoreRepos() {
                this.loadlimits += 2;
            },
        },
        mounted() {
            this.getRepos();
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
    }
</script>

<style>
    .repos {
        width: 100%;
        position: relative;
    }

    .buttons {
        padding-top: 25px;
        margin-left: -1px;
        background-color: white;
        box-shadow: 1px 2px 0px 0px rgba(0,0,0,.2), 1px 1px 0px 0px rgba(0,0,0,.14), 3px 1px 0px -1px rgba(0,0,0,.12);
        -webkit-box-shadow: 1px 2px 0px 0px rgba(0,0,0,.2), 1px 1px 0px 0px rgba(0,0,0,.14), 3px 1px 0px -1px rgba(0,0,0,.12);
    }

    .plus {
        width: 100%;
        display: flex;
    }

    .mw-700 {
        max-width: 700px;
        margin: auto;
    }

    .headline {
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        height: 1.5em;
    }

    svg.grey--text {
        overflow: hidden;
        line-height: 1.2;
        text-overflow: ellipsis;
        height: 100%;
    }
    .flexlist {
        margin-left: auto;
        margin-right: auto;
    }
</style>
