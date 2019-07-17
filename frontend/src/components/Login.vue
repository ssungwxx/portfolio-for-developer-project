<template>
<v-layout>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">

      <v-btn icon v-on="on">
        <v-icon color="white">perm_identity</v-icon>
      </v-btn>

    </template>



    <v-card>
      <v-card-title class="headline">Login</v-card-title>
      <div class="form">
        <v-text-field v-model="id" label="ID*" required></v-text-field>
        <v-text-field v-model="password" label="Password*" required></v-text-field>
      </div>
      <small>*indicates required field</small>

      <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:80%;">
        <v-icon size="25" class="mr-2">fa-google</v-icon> Google 로그인
      </v-btn>
      <br>

      <div class="modalface">
        <v-facebook-login app-id="2340768596039099" style="width:100%;">
        </v-facebook-login>
      </div>

      <br>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="defaultLogin()">Login</v-btn>
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
      dialog: false,
      id: '',
      password: '',
      check: [{
        cnt: ''
      }],
      token: {
        token: '',
        refresh: ''
      }
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
    },
    async defaultLogin() {
      this.check = await RestService.getUser(this.id);
      if (this.check[0].cnt == 0) {
        alert('ID가 존재하지 않습니다.');
      } else {
        this.token = await RestService.loginUser(this.id, this.password);
        if (this.token.token == null) {
          alert('비밀번호를 확인해주세요.');
        } else {
          alert('로그인 성공!');
          this.dialog = false;
          this.clear_user();
        }
      }
    },
    clear_user() {
      this.id = '';
      this.password = ''
    }
  },
  mounted() {
    console.log(this.$store.state)
  }
};
</script>

<style>
.headline {
  padding-bottom: 50px;
}

.modalface {
  padding-left: 10%;
  padding-right: 11%;
  width: 100%;
}

.form {
  padding-left: 10px;
  padding-right: 10px;
}
</style>
