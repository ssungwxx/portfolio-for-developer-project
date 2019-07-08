<template>
    <v-container>
        <div class="table-div">
            <table class="table">
                <tr>
                    <td colspan="2"><img class="table-img" :src="portfolios[idx - 1].img"/></td>
                </tr>
                <tr>
                    <td class="table-left">날짜</td>
                    <td class="table-right">{{ portfolios[idx - 1].created_at.toString() }}</td>
                </tr>
                <tr>
                    <td class="table-left">제목</td>
                    <td class="table-right">{{ portfolios[idx - 1].title }}</td>
                </tr>
                <tr>
                    <td class="table-left">내용</td>
                    <td class="table-right">{{ portfolios[idx - 1].body }}</td>
                </tr>
            </table>
        </div>
        <div>
            <v-flex xs12 text-xs-center round my-5>
                <router-link :to="port" style="text-decoration: none;">
                    <v-btn color="primary" dark>
                        <v-icon size="25" class="mr-2">home</v-icon>
                        목록으로
                    </v-btn>
                </router-link>
            </v-flex>
        </div>
    </v-container>
</template>
<script>
    import Portfolio from '@/components/Portfolio'
    import FirebaseService from '@/services/FirebaseService'

    export default {
        name: 'DetailPortfolios',
        props: {},
        data() {
            return {
                portfolios: [],
                idx: document.URL.slice(38,),
                port: "/Portfolio"
            }
        },
        components: {
            Portfolio
        },
        mounted() {
            this.getPortfolios()
        },
        methods: {
            async getPortfolios() {
                this.portfolios = await FirebaseService.getPortfolios()
            },
            loadMorePortfolios() {

            },
        },
    }
</script>
<style>
    .mw-700 {
        max-width: 700px;
        margin: auto;
    }

    .headline {
        overflow: hidden;
        line-height: 1.5;
        text-overflow: ellipsis;
        height: 1.5em;
    }

    .grey--text {
        overflow: hidden;
        line-height: 1.2;
        text-overflow: ellipsis;
        height: 3.6em;
    }

    .table-left {
        width: 30%;
        font-size: 2vw;
    }

    .table-right {
        font-size: 1.8vw;
    }

    .table-div {
        display: flex;
        margin-top: 64px;
    }

    @media screen and (min-width: 0px) {
        .table {
            flex-basis: 80%;
            max-width: 80%;
            margin-left: auto;
            margin-right: auto;
        }

        .table-img {
            flex-basis: 100%;
            max-width: 100%;
            margin-bottom: 20px;
        }
    }
</style>
