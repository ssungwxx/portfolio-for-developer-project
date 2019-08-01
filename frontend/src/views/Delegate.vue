<template>
    <v-layout my-5>
      <table>
      <thead>
        <tr>
          <th class="title">ID</th><th class="title">NICKNAME</th><th class="title">GRADE NUM</th><th class="title">VISITOR</th><th class="title">MEMBER</th>
        </tr>
      </thead>
      <tbody>
          <tr  v-for="i in users" v-if="i.user_grade!==10">
          <td class="userdata">{{i.user_id}}</td><td class="userdata">{{i.user_name}}</td>
          <td class="userdata">{{i.user_grade}}</td>
          <td class="userdata">
            <select class="customselect" id="TestSelect" name="SelectValue" v-if="i.user_grade===0" @change="updateUser(i.user_id)">
              <option value="0" selected>방문자</option>
              <option value="5">팀원</option>
            </select>
          </td>
          <td class="userdata">
            <select class="customselect2" id="TestSelect" name="SelectValue" v-if="i.user_grade===5" @change="updateUser(i.user_id)">
              <option value="0">방문자</option>
              <option value="5" selected>팀원</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    </v-layout>
</template>
<script>



import RestService from "@/services/RestService";
export default {
    name: "Delegate",
    props: {
        user_id: { type: String },
        user_name: { type: String },
        user_grade: { type: Number }
    },
    data() {
        return {
            users: []
        };
    },
    components: {},
    mounted() {
        this.getUsers();
        this.insertLog();
    },
    methods: {
        async getUsers() {
            this.users = await RestService.getUsers();
        },
        async insertLog() {
            this.insertLog = await RestService.insertLog("Delegate");
        },
        updateUser(id){
          var yourTestSelect = document.getElementById("TestSelect");
          var selectedValue = {
            "user_grade" : yourTestSelect.options[yourTestSelect.selectedIndex].value
          };
          RestService.updateUser(id,selectedValue);
          yourTestSelect="";
          selectedValue="";
          location.reload();
        }
    }
};
</script>
<style>
.title{
  width : 20%;
  text-align: center;
}
.userdata{
  width:20%;
  text-align: center;
  padding-top: 20px;
  font-size: 16px;
}


table {
      width: 100%;
    }

.customselect{
  position: relative;
  font-family: Arial;
  color : green;
}

.customselect2{
  position: relative;
  font-family: Arial;
  color : blue;
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
  background-color: none;
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
