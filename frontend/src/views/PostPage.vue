<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <Header></Header>
            </v-flex>
        </v-layout>
        <!--1번 이미지
        https://ifh.cc/g/dAPdA.jpg
        -->
        <ImgBanner imgSrc="https://ifh.cc/g/rNlxw.jpg">
            <div style="line-height:1.2em;font-size:1.2em;" slot="text">Post</div>
        </ImgBanner>
        <v-container>
            <!-- Post -->
            <v-layout>
                <v-flex xs12>
                    <PostList :limits="8" :load-more="true"></PostList>
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
            home: "/"
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
    }
};
</script>
