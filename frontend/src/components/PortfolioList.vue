<template>
  <v-layout mt-5 wrap>
    <v-flex v-for="i in portfolios.length > limits ? limits : portfolios.length" xs12 sm6>
      <Portfolio
        class="ma-3"
        :date="portfolios[i - 1].created_at.toString()"
        :title="portfolios[i - 1].title"
        :body="portfolios[i - 1].body"
        :imgSrc="portfolios[i - 1].img"
        :idx="i.toString()"
      ></Portfolio>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolio from "@/components/Portfolio";
import RestService from "@/services/RestService";

export default {
  name: "PortfoliosList",
  props: {
    limits: { type: Number, default: 4 },
    loadMore: { type: Boolean, default: false }
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
