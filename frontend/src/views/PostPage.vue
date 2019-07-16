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
