<template>
    <div>
        <ImgBanner imgSrc="">
            <div class="target" style="line-height:1.2em;font-size:1.2em;" slot="text">Repositories</div>
        </ImgBanner>
        <v-container>
            <v-layout>
                <v-flex>
                    <RepoList :limits="4" :load-more="true" :user_id="user_id"></RepoList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import RepoList from "../components/RepoList"
import RestService from "@/services/RestService";

export default {
    name: "RepoPage",
    props: {
        user_id: {type: String}
    },
    components: {
        RepoList,
        ImgBanner,
    },
    data() {
        return {
        }
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("RepoPage");
        }
    },
    watch: {

    },
    beforeMount() {
        // this.insertLog();
    },
}
</script>

<style>

</style>