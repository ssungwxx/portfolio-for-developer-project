<template>
    <v-container>
        <v-layout wrap>
            <v-flex class="flexlist" v-for="i in repos.length > loadlimits ? loadlimits : repos.length" xs10>
                <Repo
                    class="ma-3 repocard"
                    :repo_title="repos[i - 1].repo_title"
                    :repo_add="repos[i - 1].repo_add"
                    :repo_created="repos[i - 1].repo_createdDate"
                    :repo_recent="repos[i - 1].repo_recentDate"
                    :repo_id="repos[i - 1].repo_id"
                    :repo_no="repos[i - 1].repo_no"
                    :user_id="user_id">
                </Repo>
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
import {mapActions} from "vuex";

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
            ...mapActions(['setLogin']),
            setLoginInfo() {
                this.setLogin();
            },
        },
        mounted() {
            this.getRepos();
            this.setLoginInfo();
        },
        watch: {
            $route: function() {
                this.repos = [];
                this.getRepos();
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
    }
</script>

<style>
    .repocard {

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
