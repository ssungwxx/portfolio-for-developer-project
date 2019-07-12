<template>
  <div class="py-3">
    <v-layout row wrap>
      <v-flex xl3 lg3 md3 sm3 xs3>
        <v-flex text-xs-left>
          <h2 class="font-weight-regular headline_truncate">{{member.name}}</h2>
          <p class="subheading mb-1 grey--text text--darken-1
             font-weight-light">Point : {{allCommits}}</p>
        </v-flex>
        <v-flex text-xs-left>
          <v-btn :href="member.web_url" small flat icon outline>
            <v-icon small>fa-arrow-right</v-icon>
          </v-btn>
        </v-flex>
        <p>{{pushMessage}}</p>
      </v-flex>
      <v-flex xl8 lg8 md8 sm8 hidden-xs-only>
        <v-sheet
                class="v-sheet--offset mx-auto"
                color="grey lighten-5"
                elevation="12"
                max-width="calc(100% - 32px)"
                height="60%"
        >
          <v-sparkline
                  :labels="labels"
                  :value="valueall"
                  :smooth="radius || false"
                  :stroke-linecap="lineCap"
                  :gradient="gradient"
                  color="grey"
                  line-width="2"
                  padding="16"
                  auto-draw

                  class="zoom"
          ></v-sparkline>
        </v-sheet>
      </v-flex>

    </v-layout>
  </div>
</template>

<script>
  import GitlabService from '@/services/GitlabService'

  const gradients = [
    ['#1feaea','#ffd200', '#f72047']
  ]


  export default {
    name: 'Repository',
    props: {
      member: {
        type: Object,
        default: function(){
          return {
            name:"로딩중",
            web_url:"lab.ssafy.com",
            todayDate:0,
          }}
      },
    },
    data() {
      return {
        numberPush: 0,
        pushMessage:"아직 Push 하지 않았습니다.",
        stats: {},
        labels: [
          '7/8',
          '7/9',
          '7/10',
          '7/11',
          '7/12',
          '7/13',
          '7/14',
          '7/15',
          '7/16',
          '7/17',
          '7/18',
          '7/19',
        ],
        valueall: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        allCommits: 0,
        radius: 5,
        gradient: gradients[0],
        lineCap: 'round'
      }
    },
    mounted() {
      const today = new Date();
      this.todayDate = String(today.getDate()).padStart(2, '0');
      this.setCommit();
    },
    methods: {
      commitToValue(oneData) {
        // let authorId = oneData.author_id
        const new_value = this.valueall.slice()
        const gitrepoDay = parseInt(oneData.created_at.slice(8, 10));
        if (gitrepoDay === parseInt(this.todayDate)){
          this.numberPush +=1
          this.pushMessage = `${this.numberPush}번 push했습니다.`
        }
        if (new_value[gitrepoDay-8]<10){
          new_value[gitrepoDay-8] += 1;
        }
        this.valueall = new_value
        // console.log(this.value)
      },
      commitToVuex(severalData) {
        severalData.data.forEach(this.commitToValue);
      },
      async setCommit() {
        const result = await GitlabService.getCommits(this.member.id)
        this.allCommits = result.data.length
        this.commitToVuex(result)
      }
    },
    watch:{
      valueall: function(new_val){
        console.log("hihi")
      },
    }
  }
</script>
<style>
  .zoom {
    /*zoom: 200%;*/
    width: 100%;
    height: 100%;
  }

  .headline_truncate {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .content_truncate {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
