<template>


    <v-layout mt-5 wrap>
      <sidebar-menu :menu="menu" class="menubar"/>
      <div class="post">
        <h1>POST COUNT</h1>
      <h2>{{post_cnt[0].cnt}}</h2>
      </div>
      <br>
      <div class="repo">
        <h1>REPO COUNT</h1>
      <h2>{{repo_cnt[0].cnt}}</h2>
      </div>
    </v-layout>
</template>


<script>
import RestService from "@/services/RestService";
export default {
    name: "Admin",
    beforeMount() {
        this.insertLog();
        this.count();
    },
    mounted(){

    },
    components: {
    },
    data() {
        return {
          menu: [
              {
                  header: true,
                  title: 'Admin Page',
                },
              {
                  title: 'Log',
                  icon: 'fa fa-bar-chart',
                  child: [
                      {
                        title : 'Log',
                        href: '../WebLog',
                      }

                  ]
              },
              {
                  title: 'Delegate',
                  icon: 'fa fa-hand-o-right',
                  child: [
                      {
                          href: '../Delegate',
                          title: 'Delegate',
                      }
                  ]
              }
          ],
          post_cnt:[{
            cnt : ""
          }],
          repo_cnt:[{
            cnt : ""
          }],
            home: "/"
        };
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("Admin");
        },
        async insertLog() {
            this.insertLog = await RestService.insertLog("Delegate");
        },
        async count(){
          this.post_cnt = await RestService.countRepositories();
          this.repo_cnt = await RestService.countPost();

        }
    }
}
</script>

<style>
<style>
.post{
  width : 40%;
  text-align: center;
  margin-left: 10%;
}

.repo{
  width : 40%;
  text-align: center;
  margin-left: 10%;
}
</style>
