<template>
    <router-link :to="detaillink" style="text-decoration:none">
        <v-card class="ma-3">
            <v-img :src="portfolio_img" height="200px"></v-img>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ portfolio_title }}</div>
                    <span class="grey--text">{{ portfolio_content }}</span>
                </div>
            </v-card-title>
        </v-card>
    </router-link>
</template>

<script>
import DetailPortfolio from "../views/DetailPortfolio";

export default {
    name: "Portfolio",
    props: {
        portfolio_no: { type: Number },
        portfolio_title: { type: String },
        portfolio_content: { type: String },
        portfolio_img: { type: String }
    },
    components: {
        DetailPortfolio
    },
    data() {
        return {
            detaillink: "/detailportfolio/" + this.portfolio_no
        };
    }
};
</script>

