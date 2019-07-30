<template>
    <div>
        <h1>{{ user_id }}</h1>
        <v-layout my-5>
            <v-flex xs12>
                <h2 class="headline my-5 text-xs-center">
                    <router-link :to="repos" style="text-decoration:none">
                        <v-btn color="#DDDDFF">Repositories</v-btn>
                    </router-link>
                </h2>
                <RepoList :limits="4" :load-more="true" :user_id="user_id"></RepoList>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
import RestService from "../services/RestService";
import RepoList from "../components/RepoList";

export default {
    name: "UserPage",
    components: {
        RepoList
    },
    data() {
        return {
            repos: "/Repos",
            user_id: this.$route.params.user,
        }
    },
    methods: {
    },
    mounted() {
    }
}
</script>
<style>

</style>