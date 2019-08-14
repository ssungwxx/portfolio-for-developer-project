<template>
    <div>
        <ImgBanner
            imgSrc="https://cdn.pixabay.com/photo/2016/02/01/16/51/ascending-graph-1173935_960_720.png"
        >
            <div class="target" style="line-height:1.2em;font-size: 5vw;" slot="text">Repositories</div>
        </ImgBanner>
        <v-container>
            <v-layout>
                <v-flex>
                    <RepoList :limits="4" :loadMore="false" :user_id="user_id"></RepoList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import RepoList from "../components/RepoList";
import RestService from "@/services/RestService";

export default {
    name: "RepoPage",
    components: {
        RepoList,
        ImgBanner
    },
    data() {
        return {
            user_id: this.$route.params.id
        };
    },
    async mounted() {
        await this.insertlog();
    },
    methods: {
        async insertlog() {
            this.insertlog = await RestService.insertLog("RepoPage");
        }
<<<<<<< HEAD
    },
    beforeMount() {
        this.insertLog();
    }
};
=======
    }

}
>>>>>>> e3d200ec924d249196e65fccf045790e4c1552e8
</script>

<style>
</style>
