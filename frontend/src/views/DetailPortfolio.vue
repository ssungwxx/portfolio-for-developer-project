<template>
  <v-container>
    <div class="table-div">
      <table class="table">
        <tr>
          <td class="table-left" style="text-align:center">{{ portfolio[0].portfolio_title }}</td>
        </tr>
        <tr>
          <td>
             <a class="time">{{ portfolio[0].portfolio_date }}
             </a>
             </td>
        </tr>
        <tr>
          <div class="tablecontent"></div>
        </tr>
        <tr>
          <td>
            <img class="table-img" :src="portfolio[0].portfolio_img" />
          </td>
        </tr>
        <tr>
          <div class="tablecontent">{{portfolio[0]. portfolio_content}}</div>
        </tr>
      </table>
    </div>

    <div>
      <v-flex xs12 text-xs-center round my-5>
        <router-link :to="port" style="text-decoration: none;">
          <v-btn color="info" dark>
            <v-icon size="25" class="mr-2">home</v-icon>목록으로
          </v-btn>
        </router-link>
      </v-flex>
    </div>
  </v-container>
</template>
<script>
import Portfolio from "@/components/Portfolio";
import RestService from "@/services/RestService";

export default {
  name: "DetailPortfolios",
  props: {},
  data() {
    return {
      portfolio: [
        {
          portfolio_no: "",
          user_id: "",
          portfolio_title: "",
          portfolio_content: "",
          portfolio_img: "",
          portfolio_date: ""
        }
      ],
      port: "/Portfolio",
      id: this.$route.params.id
    };
  },
  beforeMount() {
    this.insertLog();
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolio();
  },
  methods: {
    async getPortfolio() {
      this.portfolio = await RestService.getPortfolio(this.id);
      this.portfolio[0].portfolio_date =
        this.portfolio[0].portfolio_date.slice(0, 10) +
        " " +
        this.portfolio[0].portfolio_date.slice(11, 19);
    },

    async insertLog() {
      this.insertLog = await RestService.insertLog("DetailPortfolio");
    }
  }
};
</script>
<style>

.time{
font-size: 1.2vw;
margin-left: 80%;
font-color: black;
}
.mw-700 {
  max-width: 700px;
  margin: auto;
}

.tablecontent{
  width:auto;
  height:auto;
  text-align: left;
  margin-top: 5%;
  margin-left: 20%;
  font-size: 20px;
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
