<template>
    <v-layout class="body">
        <v-flex xs12>
            <h1 style="margin-top: 60px;">{{ user_id }}'s Portfolio Page</h1>

            <h2 class="headline my-5 text-xs-center">
                <router-link :to="posts" style="text-decoration:none">
                    <v-btn color="#DDDDFF">Posts</v-btn>
                </router-link>
            </h2>
            <PostList :limits="6" :load-more="true" :user_id="user_id"></PostList>

            <h2 class="headline my-5 text-xs-center">
                <router-link :to="repos" style="text-decoration:none">
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
import PostList from "../components/PostList";

export default {
    name: "UserPage",
    components: {
        RepoList,
        PostList
    },
    data() {
        return {
            user_id: this.$route.params.id,
            repos: `/users/${this.user_id}/repos`,
            posts: `/users/${this.user_id}/posts`
        };
    },
    created() {
        this.user_id = this.$route.params.id;
        this.repos = `/users/${this.user_id}/repos`;
        this.posts = `/users/${this.user_id}/posts`;
    },
    watch: {
        $route: function() {
            this.setUser();
        }
    },
    methods: {
        setUser() {
            this.user_id = this.$route.params.id;
            this.repos = `/users/${this.user_id}/repos`;
            this.posts = `/users/${this.user_id}/posts`;
        }
    }
};
</script>

<style>
h1 {
    font-family: Consolas;
}
</style>
