<template>
    <div>
              <Carousel class="carouselimg"></Carousel>


        <v-container>
            <!-- About Me -->
            <v-layout my-5 class="laybout">
                <v-flex class="aboutme ma-3">
                    <h2
                        class="mb-3 text-sm-left text-xs-center"
                        v-resize-text="{ratio:1.0, minFontSize: '15px', maxFontSize: '30px', delay: 100}"
                    >
                        About
                        Me
                    </h2>
                    <p
                        class="mr-4 text-sm-left text-xs-center"
                        v-resize-text="{ratio:1.5, minFontSize: '10px', maxFontSize: '20px', delay: 100}"
                    >
                        안녕하세요,
                        SSAFY 1기 서울 2반 11조입니다!
                        <br />그만하고 싶어요...
                    </p>
                </v-flex>
                <v-flex class="profile-img">
                    <v-img :src="getImgUrl('profile.png')" aspect-ratio="1" />
                </v-flex>
            </v-layout>

            <!-- Portfolio -->

            <v-layout my-5>
                <v-flex xs12>
                    <h2 class="headline my-5 text-xs-center">
                        <router-link :to="port" style="text-decoration:none">
                            <v-btn color="#DDDDFF">Portfolio</v-btn>
                        </router-link>
                    </h2>
                    <PortfolioList></PortfolioList>
                </v-flex>
            </v-layout>

            <!-- Repository & Post -->
            <v-layout my-5>
                <v-flex xs6>
                    <h2 class="headline my-5 text-xs-center">
                        <v-btn color="#DDDDFF">Project</v-btn>
                    </h2>
                    <RepositoryList :limits="6" :load-more="true"></RepositoryList>
                </v-flex>
                <v-flex xs6>
                    <h2 class="headline my-5 text-xs-center">
                        <router-link :to="posts" style="text-decoration:none">
                            <v-btn color="#DDDDFF">Post</v-btn>
                        </router-link>
                    </h2>
                    <PostList :column="2"></PostList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";
import Carousel from "../components/Carousel";

import RestService from "@/services/RestService";

export default {
    name: "HomePage",
    beforeMount() {
        this.insertLog();
    },
    data() {
        return {
            y: window.scrollY,
            popup: false,
            port: "/Portfolio",
            posts: "/Post"
        };
    },

    components: {
        PortfolioList,
        PostList,
        RepositoryList,
        Carousel
    },
    methods: {
        getImgUrl(img) {
            return require("../assets/" + img);
        },
        async insertLog() {
            this.insertLog = await RestService.insertLog("HomePage");
        }
    }
};
</script>
<style>
.carouselimg {  
    padding: 10%;
}
.profile-img {
    max-width: 350px;
    margin-top: auto;
    margin-bottom: auto;
}

@media screen and (max-width: 600px) {
    .profile-img {
        display: none;
    }

    .aboutme {
        flex-basis: 100%;
        max-width: 100%;
    }
}

@media screen and (min-width: 600px) {
    .aboutme {
        flex-basis: 66.666666%;
        max-width: 66.666666%;
    }
}

.laybout {
    justify-content: space-between;
}
</style>
