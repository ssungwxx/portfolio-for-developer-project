<!--<template>-->
<!--  <div class="py-3">-->
<!--    <v-layout>-->

<!--      <v-flex xs8>-->
<!--        <h2 class="font-weight-regular reponame">{{repos.path_with_namespace}}</h2>-->
<!--        <p class="subheading mb-1 grey&#45;&#45;text text&#45;&#45;darken-1 font-weight-light">{{repos.namespace.name}}</p>-->
<!--      </v-flex>-->

<!--    </v-layout>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import GitlabService from '@/services/GitlabService'-->

<!--export default {-->
<!--	name: 'Repository',-->
<!--	props: {-->
<!--		repos: {type: null}-->
<!--	},-->
<!--	data() {-->
<!--		return {-->
<!--			stats: {}-->
<!--		}-->
<!--	},-->
<!--  mounted() {-->
<!--		this.drawStatGraph()-->
<!--  },-->
<!--	methods: {-->
<!--		async drawStatGraph() {-->
<!--			this.commits = await GitlabService.getCommits(this.repos.id)-->
<!--		}-->
<!--	}-->
<!--}-->
<!--</script>-->


<template>
  <div class="py-3">
    <v-layout>

      <v-flex xs8>
        <!-- <v-clamp autoresize :max-lines="1"> -->
        <h2 class="font-weight-regular">

          <v-btn flat :href="'https://lab.ssafy.com/' + repos.path" target="_blank">
            <v-clamp autoresize :max-lines="1">
              {{name}}
            </v-clamp>
          </v-btn>

        </h2>
        <!-- </v-clamp> -->
        <p class="subheading mb-1 grey--text text--darken-1 font-weight-light namespace">{{'@' + repos.name}}</p>

      </v-flex>
      <v-flex hidden-sm-and-down md4 style="margin-right: 35px;align-items:center;">
        <bars
                :data="data"
                :gradient="['#e7d7b7', '#ffa046']"
                :barWidth="8"
                :width="300"
                :height="100"
                :growDuration="2"
                style="border:1px solid rgba(255, 180, 0, 0.8); padding-right:5px;">
        </bars>
      </v-flex>

    </v-layout>
  </div>
</template>
<!-- <script src="path/to/chartjs/dist/Chart.js"></script> -->
<script>
  import GitlabService from '@/services/GitlabService'
  import VClamp from 'vue-clamp'
  export default {
    name: 'Repository',
    props: {
      repos: {type: null},
      token: {type: String},
      name: {type: String}
    },
    data() {
      return {
        stats: {},
        data: [],
        repo: [],
      }
    },
    components:{
      VClamp
    },
    mounted() {
      this.drawStatGraph(),
              this.getCommits()

    },
    methods: {
      async drawStatGraph() {
        let toD = new Date()
        this.commits = await GitlabService.getCommits(this.repos.id, this.token, toD.toISOString());

      },
      async getCommits() {
        let toD = new Date()
        const response = await GitlabService.getCommits(this.repos.id, this.token, toD.toISOString());

        if(response.status !== 200) {
          return
        }
        this.repo = response.data

        this.getChartData();
      },
      async getChartData() {
        const Cdata = [];
        let today = new Date();
        let lastDay = new Date();
        lastDay.setMonth(today.getMonth() - 1)
        while (today.getMonth() != lastDay.getMonth() || today.getDate() != lastDay.getDate()) {
          let month = ((lastDay.getMonth() + 1) + '').length == 1 ? '0' + (lastDay.getMonth() + 1) : (lastDay.getMonth() + 1) + ''
          let day = (lastDay.getDate() + '').length == 1 ? '0' + lastDay.getDate() : lastDay.getDate() + ''
          let chartData = {value: 0, title: month + '-' + day};
          lastDay.setDate(lastDay.getDate() + 1);
          Cdata.push(chartData);
        }
        let month = ((lastDay.getMonth() + 1) + '').length == 1 ? '0' + (lastDay.getMonth() + 1) : (lastDay.getMonth() + 1) + ''
        let day = (lastDay.getDate() + '').length == 1 ? '0' + lastDay.getDate() : lastDay.getDate() + ''
        let chartData = {value: 0, title: month + '-' + day};
        lastDay.setDate(lastDay.getDate() + 1);
        Cdata.push(chartData);

        while (this.repo.length != 0) {
          let key = Cdata.length - 1;
          let toD = this.repo[this.repo.length - 1].created_at

          for (const d of this.repo) {
            const date = (d.created_at + '').slice(5, 10);
            while (date != Cdata[key].title) {
              key--
            }
            Cdata[key].value += 1
          }

          let R = await GitlabService.getCommits(this.repos.id, this.token, toD);

          if(R.status !== 200) {
            return
          }
          this.repo = R.data

        }

        for (const c of Cdata) {
          c.title = c.value != 1 ? c.title + ' : ' + c.value + 'commits' : c.title + ' : ' + c.value + ' commit'
        }
        this.data = Cdata;

        return
      }

    }
  }

</script>
<style>
  .namespace {
    margin-left: 30px;
  }
</style>