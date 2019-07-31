<template>
    <v-layout class="body">
        <v-flex xs12>
            <h1>{{ user_id }}</h1>

            <h2 class="headline my-5 text-xs-center">
                <router-link :to="'/' + user_id + posts" style="text-decoration:none">
                    <v-btn color="#DDDDFF">Posts</v-btn>
                </router-link>
            </h2>
            <PostList :limits="4" :load-more="true" :user_id="user_id"></PostList>

            <h2 class="headline my-5 text-xs-center">
                <router-link :to="'/' + user_id + repos" style="text-decoration:none">
                    <v-btn color="#DDDDFF">Repositories</v-btn>
                </router-link>
            </h2>
            <RepoList :limits="4" :load-more="true" :user_id="user_id"></RepoList>
        </v-flex>
    </v-layout>
</template>
<script>
import RestService from "../services/RestService";
import RepoList from "../components/RepoList";
import PostList from "../components/PostList"

export default {
    name: "UserPage",
    components: {
        RepoList,
        PostList
    },
    data() {
        return {
            repos: "/Repos",
            user_id: this.$route.params.id,
        }
    },
    methods: {
    },
    mounted() {

    }
}
</script>
<style>
.body {
    margin-top: 50px;
}
</style>
