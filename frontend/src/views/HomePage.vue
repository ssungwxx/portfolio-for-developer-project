<template>
    <div>
        <ImgBanner imgSrc="https://lorempixel.com/1600/900">
            <div style="line-height:1.2em;" slot="text">I can do this all day</div>
        </ImgBanner>

        <v-container>

            <!-- About Me -->
            <v-layout my-5 class="laybout">
                <v-flex class="aboutme ma-3">
                    <h2 class="mb-3 text-sm-left text-xs-center"
                        v-resize-text="{ratio:1.0, minFontSize: '15px', maxFontSize: '30px', delay: 100}">About
                        Me</h2>
                    <p class="mr-4 text-sm-left text-xs-center"
                       v-resize-text="{ratio:1.5, minFontSize: '10px', maxFontSize: '20px', delay: 100}">안녕하세요,
                        SSAFY 1기 이원진입니다!<br/>
                        python 할 줄 알아요! java, vue, js 공부하고 있어요! 살려주세요 :(</p>
                </v-flex>
                <v-flex class="profile-img">
                    <v-img :src="getImgUrl('profile.png')" aspect-ratio="1"/>
                </v-flex>
            </v-layout>

            <!-- Portfolio -->
            <v-layout my-5>
                <v-flex xs12>
                    <h2 class="headline my-5 text-xs-center">
                        <router-link :to="port" style="text-decoration:none"><v-btn color="orange">Portfolio</v-btn></router-link>
                    </h2>
                    <PortfolioList></PortfolioList>
                </v-flex>
            </v-layout>

            <!-- Post -->
            <v-layout my-5>
                <v-flex xs12>
                    <h2 class="headline my-5 text-xs-center">
                        <router-link :to="posts" style="text-decoration:none"><v-btn color="orange">Post</v-btn></router-link>
                    </h2>
                    <PostList :column="2"></PostList>
                </v-flex>
            </v-layout>


            <!-- Github -->
            <v-layout my-5>
                <v-flex xs12>
                    <h2 class="headline my-5 text-xs-center">
                        <v-btn color="orange">Project</v-btn>
                    </h2>
                    <RepositoryList :limits="6" :load-more="true"></RepositoryList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import ImgBanner from '../components/ImgBanner'
    import PortfolioList from '../components/PortfolioList'
    import PostList from '../components/PostList'
    import RepositoryList from '../components/RepositoryList'

    export default {
        name: 'HomePage',
        data() {
            return {
                y: window.scrollY,
                popup: false,
                port: "/Portfolio",
                posts: "/Post",
            }
        },
        components: {
            ImgBanner,
            PortfolioList,
            PostList,
            RepositoryList,
        },
        methods: {
            getImgUrl(img) {
                return require('../assets/' + img)
            },
        }
    }

</script>
<style>
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
