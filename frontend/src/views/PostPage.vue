<template>
    <div>
        <ImgBanner imgSrc="https://ifh.cc/g/rNlxw.jpg">
            <div style="line-height:1.2em;font-size:1.2em;" slot="text">Posts</div>
        </ImgBanner>
        <v-container>
            <v-layout>
                <v-flex xs12>
                    <PostList :limits="6" :loadMore="false" :user_id="user_id"></PostList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";
import RestService from "@/services/RestService";

export default {
    name: "PostPage",
    data() {
        return {
            user_id: this.$route.params.id,
        };
    },
    beforeMount() {
        this.insertLog();
    },
    components: {
        ImgBanner,
        PostList
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("PostPage");
        }
    },
    mounted() {
        // console.log(this.$session)
    }
};
</script>
