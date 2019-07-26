<template>
    <div>
        <div class="des">
            <h1>설명</h1>
            <v-btn @click="log">눌러</v-btn>
        </div>
    </div>
</template>

<script>
    import GitLab from "../services/GitLabRepoService"

    export default {
        name: "mainpage",
        data() {
            return {}
        },
    }
</script>

<style>
    .des {
        margin-left: auto;
        margin-right: auto;
        margin-top: 0;
    }
</style>