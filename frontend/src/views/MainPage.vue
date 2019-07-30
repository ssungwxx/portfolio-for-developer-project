<template>
    <div>
        <div class="des">
            <h1>설명</h1>
            <v-btn>눌러</v-btn>
            <chat></chat>
        </div>
    </div>
</template>

<script>
import GitLab from "../services/GitLabRepoService";
import RestService from "../services/RestService";
import chat from "../components/chat";

export default {
    name: "mainpage",
    data() {
        return {};
    },
    components: { chat },
    methods: {}
};
</script>

<style>
.des {
    margin-left: auto;
    margin-right: auto;
    margin-top: 0;
}
</style>