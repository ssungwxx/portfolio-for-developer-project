<!--<template>-->
<!--  <v-layout column px-4>-->
<!--    <v-flex v-for="i in repositories.length > limits ? limits : repositories.length">-->
<!--      <v-divider v-if="i === 1"></v-divider>-->
<!--      <Repository :repos="repositories[i - 1]"></Repository>-->
<!--      <v-divider></v-divider>-->
<!--    </v-flex>-->
<!--  </v-layout>-->
<!--</template>-->

<!--<script>-->
<!--import Repository from '@/components/Repository'-->
<!--import GitlabService from '@/services/GitlabService'-->

<!--export default {-->
<!--	name: 'RepositoryList',-->
<!--	props: {-->
<!--		limits: {type: Number, default: 5},-->
<!--		loadMore: {type: Boolean, default: false}-->
<!--	},-->
<!--	data() {-->
<!--		return {-->
<!--			repositories: []-->
<!--    }-->
<!--	},-->
<!--	components: {-->
<!--		Repository-->
<!--	},-->
<!--	mounted() {-->
<!--		this.getGitlabRepos('hackurity01')-->
<!--	},-->
<!--	methods: {-->
<!--		async getGitlabRepos(userName) {-->
<!--			const response = await GitlabService.getRepos(userName);-->
<!--			if(response.status !== 200) {-->
<!--				return-->
<!--			}-->


<!--			this.repositories = response.data-->
<!--		}-->
<!--	}-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--  .reponame {-->
<!--    white-space: nowrap;-->
<!--    overflow: hidden;-->
<!--    -ms-text-overflow: ellipsis;-->
<!--    text-overflow: ellipsis;-->
<!--  }-->
<!--</style>-->

<template>
  <v-layout column px-4>
    <v-flex v-for="i in repositories.length">
      <v-divider v-if="i === 1"></v-divider>
      <Repository class="graph" :repos="repositories[i - 1]" :token="groups[i - 1].access_token" :name="groups[i - 1].name" :cname="groups[i-1].cname" :cname2="groups[i-1].cname2"></Repository>
      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
  import Repository from '@/components/Repository'
  import GitlabService from '@/services/GitlabService'

  export default {
    name: 'RepositoryList',
    props: {
      loadMore: {type: Boolean, default: false}
    },
    data() {
      return {
        repositories: [],
        groups: [
          {name: '김성우', username: 'rlatjddn23@gmail.com', access_token: 'Qqs1R7PD9T8v98HXyzKh', cname:'ykk2006', cname2: "김성우"},
          {name: '신승민', username: 'sammiffy77@naver.com', access_token: 'AkY21v72oZBaUposZ2cs', cname:'신승민', cname2: ""},
          {name: '이원진', username: 'lzeroll@naver.com', access_token: 'hbDYs64QQoNquzmhCkm9', cname:'Terpe66', cname2: "이원진"},
          {name: '이지선', username: 'yjs1002', access_token: 'wTE9n9Ye1MZujw4BPd2j', cname:'jisun1002', cname2: "이지선"},
          {name: '이형주', username: 'gudwn8439@naver.com', access_token: 'Bo9wikujLgGNyhZ97oSw', cname:'이형주', cname2: ""}
        ]
      }
    },
    components: {
      Repository
    },
    mounted() {
      this.getGitlabRepos()
    },
    methods: {
      async getGitlabRepos() {
        for (const g of this.groups) {
          const response = await GitlabService.getRepos(g.username, g.access_token);
          // console.log('1 -> ', response.data);
          if(response.status !== 200) {
            return
          }
          // console.log(g.username);
          this.repositories.push(response.data[0])
          // console.log('2 -> ', this.repositories);
        }

      },

    }
  }
</script>