<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <Header></Header>
            </v-flex>
        </v-layout>
        <ImgBanner imgSrc="https://ifh.cc/g/rTwNE.jpg">
            <div style="line-height:1.2em;font-size:1.2em;" slot="text">Portfolio</div>
        </ImgBanner>
        <v-container>
            <!-- Portfolio -->
            <v-layout>
                <v-flex xs12>
                    <PortfolioList :limits="6" :load-more="true"></PortfolioList>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import ImgBanner from '../components/ImgBanner'
    import PortfolioList from '../components/PortfolioList'
    import Header from "../components/Header"
    import RestService from "@/services/RestService";

    export default {
        name: 'PortfolioPage',
        beforeMount() {
          this.insertLog();
          },
        components: {
            ImgBanner,
            PortfolioList,
            Header,
        },
        data() {
            return {
                home: "/",
            }
        },
        methods:{
          async insertLog(){
            this.insertLog = await RestService.insertLog('PortfolioPage');
          }
        }
    }
</script>
