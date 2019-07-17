<template>
    <v-layout mt-5 wrap>
        <v-flex v-for="i in portfolios.length > limits ? limits : portfolios.length" xs12 sm6>
            <Portfolio
                    class="ma-3"
                    :portfolio_no="portfolios[i - 1].portfolio_no"
                    :portfolio_date="portfolios[i - 1].portfolio_date"
                    :portfolio_title="portfolios[i - 1].portfolio_title"
                    :portfolio_subTitle="portfolios[i - 1].portfolio_subTitle"
                    :portfolio_img="portfolios[i - 1].portfolio_img"
            ></Portfolio>

        </v-flex>


        <div class="plusbutton">
            <v-flex xs12 text-xs-center round my-5>
                <v-btn color="info" dark center href="/PortfolioWrite" style="width:106px;">
                    <v-icon size="25" class="mr-2">fa-plus</v-icon>
                    Write
                </v-btn>
            </v-flex>
        </div>

    </v-layout>
</template>
<script>
    import Portfolio from "@/components/Portfolio";
    import RestService from "@/services/RestService";

    export default {
        name: "PortfoliosList",
        props: {
            limits: {type: Number, default: 4},
            loadMore: {type: Boolean, default: false}
        },
        data() {
            return {
                portfolios: []
            };
        },
        components: {
            Portfolio
        },
        mounted() {
            this.getPortfolios();
        },
        methods: {
            async getPortfolios() {
                this.portfolios = await RestService.getPortfolios();
            },
            loadMorePortfolios() {
                this.limits += 4;
            }
        }
    };
</script>
<style>
    .plusbutton {
        margin-bottom: 50px;
        margin-left: 45%;
    }

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
</style>
