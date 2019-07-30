<template>
    <v-card class="ma-3" :href="repo_add">
        <v-card-title primary-title>
            <div>
                <div class="headline target" style="height : 65px">{{ repo_title }}</div>
                <span class="grey--text target">{{ repo_recent }}</span>
            </div>
        </v-card-title>
        <v-card-body>
            <div class="py-3">
                <v-layout row wrap>
                    <v-flex xl6 lg6 md6 sm12 hidden-xs-only>
                        <v-sheet class="v-sheet--offset mx-auto" color="grey lighten-5" elevation="12"
                                 max-width="calc(100% - 32px)" height="60%">
                            <v-sparkline :labels="Object.keys(data).reverse()" :value="Object.values(data).reverse()" :smooth="radius || false"
                                         :stroke-linecap="lineCap" :gradient="gradient" color="grey"
                                         line-width="2" padding="16" auto-draw class="zoom">
                            </v-sparkline>
                        </v-sheet>
                    </v-flex>
                </v-layout>
            </div>
        </v-card-body>
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
            repo_id : {type: String},
            user_id : {type: String}
        },
        data() {
            return {
                radius: 5,
                gradient: ["#1feaea", "#ffd200", "#f72047"],
                lineCap: "round",
                data: {},
                url: "",
            }
        },
        methods: {
            async drawGraph() {
                this.data = await Git.getPushed(this.url, this.repo_id)
            },
            async getUrl() {
                const user = await RestService.getUser(this.user_id);
                this.url = user.user_gitAdd;
            }
        },
        mounted() {
            this.getUrl();
            this.drawGraph();
        }
    }

</script>

<style>

</style>