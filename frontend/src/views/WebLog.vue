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
<style>

.customselect{
  position: relative;
  font-family: Arial;
   background-color: DodgerBlue;
}

.customselect-selected::after{
  position: absolute;
  content: "";
  top: 14px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #ffftransparent transparent transparent;
}

.customselect-itemsdiv,.select-selected {
  color: #ffffff;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-color: transparent transparentrgba(0, 0, 0, 0.1) transparent;
  cursor: pointer;
}

/* Style items (options): */
.customselect-items {
  position: absolute;
  background-color: DodgerBlue;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

/* Hide the itemswhen the select box is closed: */
.customselect-hide {
  display: none;
}

.customselect-items div:hover, .same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
}


.mw-700 {
    max-width: 700px;
    margin: auto;
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
</style>
