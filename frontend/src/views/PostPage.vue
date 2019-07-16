<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <Header></Header>
            </v-flex>
        </v-layout>
        <ImgBanner imgSrc="https://lorempixel.com/1600/900">
            <div style="line-height:1.2em;font-size:1.2em;" slot="text">Post</div>
        </ImgBanner>
        <v-container>
        <div>
            <v-flex xs12 text-xs-center round my-5>
                <router-link :to="home" style="text-decoration: none;">
                    <v-btn color="primary" dark>
                        <v-icon size="25" class="mr-2">home</v-icon>
                        홈으로
                    </v-btn>
                </router-link>
            </v-flex>
        </div>

            <!-- Post -->
            <v-layout>
                <v-flex xs12>
                    <PostList :limits="6" :load-more="true"></PostList>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>

<script>
    import ImgBanner from '../components/ImgBanner'
    import PostList from '../components/PostList'
    import Header from "../components/Header"
    import RestService from "@/services/RestService";

    export default {
        name: 'PostPage',
        data() {
            return {
                home: "/"
            }
        },

  beforeMount() {
   this.insertLog();
  },

        components: {
            ImgBanner,
            PostList,
            Header,
        },
        methods: {
          async insertLog(){
            this.insertLog = await RestService.insertLog('PostPage');
          }
        }
    }
</script>
