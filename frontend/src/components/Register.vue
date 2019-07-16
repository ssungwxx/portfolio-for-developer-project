<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Join Us</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="user.user_name" label="Full name*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="user.user_id" label="ID*" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field v-model="user.user_pw" label="Password*" type="password" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" flat @click="insertUser">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import RestService from "../services/RestService"

export default {
  data: () => ({
    dialog: false,
    user: {
      user_id: '',
      user_pw: '',
      user_name: ''
    }
  }),
  methods: {
    insertUser: function(event) {
      var tmp = RestService.insertUser(this.user);
      console.log(tmp);
      if (tmp == true) {
        alert('가입 성공!');
        this.dialog = false;
      } else {
        alert('중복된 ID입니다!')
      }
      // console.log(this.result);
      // alert(this.result.message);
      // if(this.result.success == true) {
      //   this.dialog = false;
      // }
        // .then(data => {
        //   console.log(data);
        //   if (data[0].success == true) {
        //     this.dialog = false;
        //     alert(data[0].message);
        //   } else {
        //     alert(data[0].message);
        //   }
        // })
        // .catch(function(error) {
        //   alert(error);
        // })
    }
  }
}
</script>
