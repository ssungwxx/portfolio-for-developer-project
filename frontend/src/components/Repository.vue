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
      <v-flex hidden-xs-only style="margin-right: 35px;align-items:center;">
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
      name: {type: String},
      cname: {type: String},
      cname2: {type:String},
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
        let toD = new Date();
        this.commits = await GitlabService.getCommits(this.repos.id, this.token, toD.toISOString());

      },
      async getCommits() {
        let toD = new Date();
        const response = await GitlabService.getCommits(this.repos.id, this.token, toD.toISOString());

        if(response.status !== 200) {
          return
        }
        this.repo = response.data;

        const responseRepo = await GitlabService.getAllRepos(this.repos.name, this.token);

        if (responseRepo.status !== 200) {
          return
        }
        // console.log(responseRepo.data)
        this.getDateTable();
        for (const data of responseRepo.data) {
          const repoName = data.path;
          const responseCommit = await GitlabService.getRepoCommit(this.repos.name, repoName, this.token);

          this.commits = responseCommit.data;
          // console.log(this.repos.name, this.commits);
          // console.log('commit', this.commits);
          this.getChartData();
        }
        this.finishData();
      },
      async getDateTable() {
        let Cdata = [];
        let today = new Date();
        // console.log(today.getMonth());
        let lastDay = new Date();
        lastDay.setMonth(today.getMonth() - 1)
        while (today.getMonth() != lastDay.getMonth() || today.getDate() != lastDay.getDate()) {
          let month = ((lastDay.getMonth() + 1) + '').length == 1 ? '0' + (lastDay.getMonth() + 1) : (lastDay.getMonth() + 1) + '';
          let day = (lastDay.getDate() + '').length == 1 ? '0' + lastDay.getDate() : lastDay.getDate() + '';
          let chartData = {value: 0, title: month + '-' + day};
          lastDay.setDate(lastDay.getDate() + 1);
          Cdata.push(chartData);
        }
        let month = ((lastDay.getMonth() + 1) + '').length == 1 ? '0' + (lastDay.getMonth() + 1) : (lastDay.getMonth() + 1) + '';
        let day = (lastDay.getDate() + '').length == 1 ? '0' + lastDay.getDate() : lastDay.getDate() + '';
        let chartData = {value: 0, title: month + '-' + day};
        lastDay.setDate(lastDay.getDate() + 1);
        Cdata.push(chartData);
        this.data = Cdata;

        return
      },
      async getChartData() {

        let Cdata = this.data;

        if (this.commits.length != 0) {
          let key = Cdata.length - 1;

          for (const d of this.commits) {
            // if (d.committer_name === this.cname || d.committer_name === this.cname2) {
            // console.log(d.committer_name, d.created_at);
            if (d.committer_name == this.cname || d.committer_name == this.name || d.committer_name == this.cname2) {
              console.log(this.name, this.cname, this.cname2, this.commits, d)
              const date = (d.created_at + '').slice(5, 10);
              console.log(d.created_at)
              // console.log(date, ' = ', Cdata[key]);
              // console.log(key)
              while (date != Cdata[key].title) {
                key--
              }
              Cdata[key].value += 1
            }
          }
        }
        this.data = Cdata;

        return
      },
      async finishData() {
        const Cdata = this.data;
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