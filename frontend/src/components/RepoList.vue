<template>
    <v-container>
        <v-layout mt-5 wrap>
            <v-flex class="flexlist" v-for="i in repos.length > limits ? limits : repos.length" xl12 lg12 md12 sm12 hidden-xs-only>
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
            <div class="plus" v-if="loadMore">
                <v-btn class="target" style="margin-right: auto;" color="#ffc0cb" dark Wclick="loadMoreRepos">
                    <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
                </v-btn>
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
        height: 100%;
    }
</style>