<template>
    <v-container>
        <v-layout wrap>
            <v-flex class="flexlist" v-for="i in repos.length > limits ? limits : repos.length" xl8 lg8 md8 sm8 xs8>
                <Repo
                    class="ma-3"
                    :repo_title="repos[i - 1].repo_title"
                    :repo_add="repos[i - 1].repo_add"
                    :repo_created="repos[i - 1].repo_createdDate"
                    :repo_recent="repos[i - 1].repo_recentDate"
                    :repo_id="repos[i - 1].repo_id"
                    :user_id="user_id">
                </Repo>
            </v-flex>
            <div class="plus" v-if="!loadMore">
                <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark @click="loadMoreRepos">
                    <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
                </v-btn>

                <div style="display: flex; justify-content: center;">
                    <router-link :to="writepost" style="text-decoration: none;">
                        <v-btn class="target" style="margin-right: auto; margin-top: 3rem" color="#ffc0cb"dark>
                            <v-icon size="25" class="mr-2">fa-edit</v-icon>글쓰기
                        </v-btn>
                    </router-link>
                    <router-link :to="userpage" style="text-decoration: none; margin-left: 20px">
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

    export default {
        name: "RepoList",
        props: {
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
            }
        },
        methods: {
            async getRepos() {
                this.repos = await RestService.getRepository(this.user_id);
            },
            loadMoreRepos() {
                this.limits += 2;
            }
        },
        mounted() {
            this.getRepos();
        },
        watch: {
            $route: function() {
                this.getRepos();
            }
        }
    }
</script>

<style>
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
