<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <div class="form">
        <v-text-field label="ID*" required></v-text-field>
        <v-text-field label="Password*" required></v-text-field>
      </div>
      <small>*indicates required field</small>
      <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:80%;">
        <v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인
      </v-btn>
      <br>
      <v-facebook-login app-id="2340768596039099" style="width:80%;"></v-facebook-login>
      <br>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="">Login</v-btn>
        <v-btn color="green darken-1" flat @click="">Forgot password?</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-layout>
</template>

<script>
import FirebaseService from '@/services/FirebaseService'
import {
  VFBLogin as VFacebookLogin
} from 'vue-facebook-login-component'
import RestService from "@/services/RestService";

export default {
  data() {
    return {
      dialog: false
    }
  },
  beforeMount() {
    this.insertLog();
  },
  components: {
    VFacebookLogin
  },
  methods: {
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle()
      this.$store.state.accessToken = result.credential.accessToken
      this.$store.state.user = result.user
    },
    async insertLog() {
      this.insertLog = await RestService.insertLog('LoginPage');
    }
  },
  mounted() {
    console.log(this.$store.state)
  }
}
</script>

<style>
.headline {
  padding-bottom: 50px;
}

.form {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
