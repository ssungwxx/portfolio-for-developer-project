<template>
  <v-layout mt-5 wrap>

      <v-flex v-for="cnt in post_cnt" >
        {{cnt.cnt}}
      </v-flex>

      <v-flex v-for="cnt in repo_cnt" >
        {{cnt.cnt}}
      </v-flex>

  </v-layout>
</template>
<script>


import RestService from "@/services/RestService";

export default {
    name: "Charts",
    props: {
        cnt: {type : String}
          },
    data() {
        return {
            post_cnt:[],
            repo_cnt:[]
        };
    },
    components: {},
    mounted() {
        this.count();
    },
    methods: {
        async count(){
          this.post_cnt = await RestService.countRepositories();
          this.repo_cnt = await RestService.countPost();
        }
    }
};
</script>
<style>

</style>
