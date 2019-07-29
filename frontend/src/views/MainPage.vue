<template>
    <div>
        <div class="des">
            <h1>설명</h1>
            <v-btn @click="ttt">눌러</v-btn>
        </div>
    </div>
</template>

<script>
    import GitLab from "../services/GitLabRepoService"
    import RestService from "../services/RestService"

    export default {
        name: "mainpage",
        data() {
            return {
                repositories: [],
            }
        },
        methods: {
            async ttt() {
                const data = {
                    user_id: "ssafy",
                    repo_title: "test1",
                    repo_add: "https://test.ssa.fy",
                    repo_recentDate : "2019-04-24 09:34:26",
                    repo_createdDate : "2019-01-24 00:05:53",
            };
                await RestService.insertRepository(data)
            },
            tttt() {
                const data = {
                    user_id: "ssafy",
                    user_gitAdd: "https://lab.ssafy.com",
                    user_gitId: "terpe66",
                    token: "e_CnCxsi3fLRjDisDMmx"
                };
                axios.post("http://70.12.246.138:3000/repositories/repos", data)
                    .then(response => console.log(response.data))
            },
        }
    }
</script>

<style>
    .des {
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
    }
</style>