<template>
    <div>
        <h1>{{ user_id }}</h1>
        <div class="py-3">
            <v-layout row wrap>
                <v-flex xl6 lg6 md6 sm12 hidden-xs-only v-for="(data, i) in dataList" :key="i">
                    <v-sheet class="v-sheet--offset mx-auto" color="grey lighten-5" elevation="12"
                             max-width="calc(100% - 32px)" height="60%">
                        <v-sparkline :labels="Object.keys(data[i]).reverse()" :value="Object.values(data[i]).reverse()" :smooth="radius || false"
                                     :stroke-linecap="lineCap" :gradient="gradient" color="grey"
                                     line-width="2" padding="16" auto-draw class="zoom">
                        </v-sparkline>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>
<script>
import GitLab from "../services/GitLabRepoService";
import RestService from "../services/RestService";

export default {
    name: "UserPage",
    data() {
        return {
            dataList: [],
            radius: 5,
            gradient: ["#1feaea", "#ffd200", "#f72047"],
            lineCap: "round",
            user_id: this.$route.params.id,
            repos: [],
            user: {},
        }
    },
    methods: {
        async gitGraph() {
            for (let i = 0; i < this.repos.length; i++) {
                this.dataList[i] = await GitLab.getPushed(this.user.user_gitAdd, this.user.user_gitId, repo);
            }
        },
        async getUserRepos() {
            this.repos = await RestService.getRepository(this.user_id);
            console.log(this.repos)
        },
        async getUserInfo() {
            this.user = await RestService.getUser(this.user_id);
        }
    },
    mounted() {
        // this.gitGraph();
        this.getUserRepos();
        this.getUserInfo();
    }
}
</script>
<style>

</style>