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
        <v-btn color="blue darken-1" flat @click="check_user()">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import RestService from "../services/RestService"

export default {
  data() {
    return {
      dialog: false,
      user: {
        user_id: '',
        user_pw: '',
        user_name: ''
      },
      check: [{
        cnt: ""
      }],
      err_stat: {
        status: '',
        code: ''
      }
    }
  },
  methods: {
    async check_user() {
      this.check = await RestService.getUser(this.user.user_id);
      if (this.check[0].cnt == 0) {
        this.err_stat = await RestService.insertUser(this.user);
        if (this.err_stat.status == 1) {
          alert('가입 성공!');
        } else {
          alert(this.err_stat.code);
        }
      } else {
        alert('중복된 ID입니다.');
      }
    },
  }
}
</script>
