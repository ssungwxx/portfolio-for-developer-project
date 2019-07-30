<template>
    <v-layout mt-5 wrap>

        <v-flex v-for="log in Logs" >
          {{log.wlog_no}}
          <br />
          {{log.user_id}}
          <br />
          {{log.wlog_path}}
          <br />
          {{log.wlog_date}}
        </v-flex>
    </v-layout>
</template>
<script>


import RestService from "@/services/RestService";
export default {
    name: "WebLog",
    props: {
        wlog_no: { type: String },
        user_id: { type: String },
        wlog_path: { type: String },
        wlog_date: { type: String }
    },
    data() {
        return {
            Logs: []
        };
    },
    components: {},
    mounted() {
        console.log("aaa");
        this.getLog();
    },
    methods: {
        async getLog() {
            console.log("TTT");
            this.Logs = await RestService.getLog();
        }
    }
};
</script>
