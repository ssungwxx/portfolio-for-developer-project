<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">

    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon color="white">assignment_ind</v-icon>
      </v-btn>
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
    insertUser: async function(event) {
      await RestService.insertUser(this.user);
    }
  }
}
</script>
