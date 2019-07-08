<template>
    <router-link :to="detaillink" style="text-decoration:none">
        <v-card class="ma-3">
            <v-img :src="imgSrc" height="200px">
            </v-img>
            <v-card-title primary-title>
                <div>
                    <div class="headline">{{ title }}</div>
                    <div class="grey--text">
                        <span>{{ body }}</span>
                    </div>
                </div>
            </v-card-title>
        </v-card>
    </router-link>
</template>

<script>
    import DetailPortfolio from "../views/DetailPortfolio"

    export default {
        name: 'Portfolio',
        props: {
            date: {type: String},
            title: {type: String},
            body: {type: String},
            imgSrc: {type: String},
            idx: {type: String},
        },
        components: {
            DetailPortfolio
        },
        data() {
            return {
                detaillink: "/DetailPortfolio/" + this.idx
            }
        }
    }
</script>

