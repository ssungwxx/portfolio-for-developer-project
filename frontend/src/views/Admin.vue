<template>
    <sidebar-menu :menu="menu" class="menubar"/>
</template>


<script>
import RestService from "@/services/RestService";
export default {
    name: "Admin",
    beforeMount() {
        this.insertLog();
    },
    mounted(){
        this.insertLog();
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
                  title: 'Charts',
                  icon: 'fa fa-bar-chart',
                  child: [
                      {
                          title : 'Portfolio/Post',
                          href: '../Charts',

                      },

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
            home: "/"
        };
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("Admin");
        },
        async insertLog() {
            this.insertLog = await RestService.insertLog("Delegate");
        }
    }
}
</script>
