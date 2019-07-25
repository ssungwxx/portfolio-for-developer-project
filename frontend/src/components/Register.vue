<template>
<v-layout row justify-center>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn class="headerButton" icon v-on="on">
        <v-icon color="white">person_add</v-icon>
      </v-btn>
      <v-btn class="sidebarButton" flat v-on="on" style="width: 160px; left: 0px; height: 48px; z-index: 2;" fixed>
        <v-icon style="margin-right: auto; margin-left: 17px;">person_add</v-icon>
      </v-btn>
    </template>
    <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-form
      ref="form"
      lazy-validation>

          <v-text-field
          v-model="user.user_name"
          :rules="[() => !!user.user_name || 'This field is required']"
          label="Full Name*"
          required></v-text-field>

          <v-text-field
          v-model="user.user_id"
          :rules="[
              () => !!user.user_id || 'This field is required',
              () => !!user.user_id && id.length <= 20 || 'ID must be less than 20 characters']"
              label="ID*"
              counter="20"
              required></v-text-field>

          <v-text-field
          v-model="user.user_pw"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :rules="[() => !!user.user_pw || 'This field is required',
            () => !!user.user_pw && password.length >= 8 || 'Password must be at least 8 characters']" :type="show ? 'text' : 'password'"
            counter
            @click:append="show = !show"
            label="Password"
            required></v-text-field>

          <v-text-field
          v-model="user.user_email"
          :rules="[
          () => !!user.user_email || 'This field is required',
          () => /.+@.+\..+/.test(user.user_email) || 'E-mail must be valid.']"
          label="E-mail"
          required></v-text-field>

          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" left>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>양식 새로고침</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" text @click="submit">Submit</v-btn>
      </v-form>
  </v-dialog>
</v-layout>
</template>

<script>
import RestService from "../services/RestService";

export default {
  data() {
    return {
      dialog: false,
      user: {
        user_id: "",
        user_pw: "",
        user_name: "",
        user_email: ""
      },
      formHasErrors: false,
      show: false,
      check: [{
        cnt: ""
      }],
      err_stat: {
        status: "",
        code: ""
      }
    };
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.check_user();
      }
    },
    resetForm() {
      this.$refs.form.reset();
    },
    async check_user() {
      if (this.check_email()) {
        this.err_stat = await RestService.insertUser(this.user);
        if (this.err_stat.status == 200) {
          alert("가입 성공!");
          this.clear_user();
          this.dialog = false;
        } else {
          if (this.err_stat.msg.equals("overlap id")) {
            alert("중복된 ID입니다.");
          } else {
            alert(this.err_stat.msg);
          }
        }
      } else {
        alert("E-mail형식이 올바르지 않습니다.");
      }
    },
    clear_user() {
      this.user.user_id = "";
      this.user.user_pw = "";
      this.user.user_name = "";
      this.user.user_email = "";
      this.user.user_gitAdd = "";
      this.user.user_gitToken = "";
    },
    check_email() {
      let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (this.user.user_email.match(regExp) != null) {
        return true;
      } else {
        return false;
      }
    },
    check_null() {
      if (this.user.user_id == "") {
        document.getElementById('iddd').focus();
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
@media screen and (max-width: 599px) {
  .headerButton {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .sidebarButton {
    display: none;
  }
}
</style>
