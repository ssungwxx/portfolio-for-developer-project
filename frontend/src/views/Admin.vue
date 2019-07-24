<template>
    <div>
        <v-layout>
            <v-flex xs12>
                <Header></Header>
            </v-flex>
             <sidebar-menu :menu="menu" />
        </v-layout>
    </div>
</template>

<script>
import RestService from "@/services/RestService";

export default {
    name: "Admin",
    beforeMount() {
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
                          title : 'Portfolio',
                          href: '/charts/sublink',

                      },
                      {
                        title : 'Post',
                        href: '',
                      },
                      {
                        title : 'Log',
                        href: '',
                      }

                  ]
              },
              {
                  title: 'Delegate',
                  icon: 'fa fa-hand-o-right',
                  child: [
                      {
                          href: '../Delegate',
                          title: 'Delegate Admin',
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
        }
    }
}
</script>
