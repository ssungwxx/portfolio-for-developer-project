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
                portfolios: [],
            }
        },
        methods: {
            async ttt() {
                const data = {
                    "user_gitAdd" : "https://lab.ssafy.com",
                    "user_gitId" : "terpe66",
                    "token" : "e_CnCxsi3fLRjDisDMmx"
                };
                await RestService.insertRepository(data)
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