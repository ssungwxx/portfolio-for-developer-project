<template>
    <div>
        <ImgBanner imgSrc="">
            <div class="target" style="line-height:1.2em;font-size:1.2em;" slot="text">Repositories</div>
        </ImgBanner>
        <v-container>
            <v-layout>
                <v-flex>
                    <RepoList :limits="4" :load-more="false" :user_id="user_id"></RepoList>
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
    components: {
        RepoList,
        ImgBanner,
    },
    data() {
        return {
            user_id: this.$route.params.id,
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
        this.insertLog();
    },
}
</script>

<style>

</style>