<template>
    <v-layout
        v-if="getIsLogin && getId == this.$route.params.id"
        style="margin-top: 60px;"
        column
        align-center
    >
        <v-form ref="form" v-model="valid" style="width: 70%">
            <v-text-field disabled v-model="getId" :counter="20" label="ID" required></v-text-field>
            <v-text-field
                v-model="user_name"
                :counter="12"
                :rules="nameRules"
                label="Nickname"
                required
            ></v-text-field>
            <v-text-field v-model="gitlab_id" label="Gitlab_ID" required></v-text-field>
            <v-text-field v-model="gitlab_address" label="Gitlab_address" required></v-text-field>
            <v-text-field v-model="access_token" label="Access_token" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="aboutme" label="About_Me" required></v-text-field>
            <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                off-icon="check_circle_outline"
                on-icon="check_circle"
                required
            ></v-checkbox>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">정보 수정</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">정보 초기화</v-btn>
        </v-form>
    </v-layout>
</template>

<script>
import RestService from "@/services/RestService";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            user_name: "",
            user_grade: "",
            gitlab_id: "",
            gitlab_address: "",
            access_token: "",
            aboutme: "",

            valid: true,
            nameRules: [
                v => !!v || "Name is required",
                v =>
                    (v && v.length <= 10) ||
                    "Name must be less than 10 characters"
            ],
            email: "",
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+\..+/.test(v) || "E-mail must be valid"
            ],
            checkbox: false
        };
    },

    async created() {
      await this.setLoginInfo();
      this.userCheck();
      await this.getUserInfo();
    },
    computed: {
        getIsLogin: function () {
            return this.$store.getters.getIsLogin;
        },
        getId: function () {
            return this.$store.getters.getId;
        },
        getGrade: function () {
            return this.$store.getters.getGrade;
        }
    },
    methods: {
<<<<<<< HEAD
        ...mapActions(["setLogin"]),
        async setLoginInfo() {
            await this.setLogin();
        },
=======
      ...mapActions(['setLogin']),
      async setLoginInfo() {
        await this.setLogin();
      },
      userCheck() {
            if (!this.getIsLogin || this.$route.params.id != this.getId) {
              alert('권한이 없습니다.');
                this.$router.push("/");
            }
      },
>>>>>>> e3d200ec924d249196e65fccf045790e4c1552e8
        async getUserInfo() {
            const user = await RestService.getUser(this.getId);
            this.user_name = user.user_name;
            this.user_grade = user.user_grade;
            this.gitlab_id = user.user_gitId;
            this.gitlab_address = user.user_gitAdd;
            this.access_token = user.user_gitToken;
            this.aboutme = user.user_aboutMe;
            this.email = user.user_email;
        },
        async validate() {
            if (this.$refs.form.validate()) {
                const data = {
                    user_name: this.user_name,
                    user_grade: this.user_grade,
                    user_gitId: this.gitlab_id,
                    user_gitAdd: this.gitlab_address,
                    user_gitToken: this.access_token,
                    user_aboutMe: this.aboutme,
                    user_email: this.email
                };
                await RestService.updateUser(this.getId, data);
                this.$router.push("/");
            }
        },
<<<<<<< HEAD
        reset() {
            this.$refs.form.reset();
        }
    },
    computed: {
        getIsLogin: function() {
            return this.$store.getters.getIsLogin;
        },
        getId: function() {
            return this.$store.getters.getId;
        },
        getGrade: function() {
            return this.$store.getters.getGrade;
        }
=======
        reset () {
            this.$refs.form.reset()
        },
>>>>>>> e3d200ec924d249196e65fccf045790e4c1552e8
    }
};
</script>
<style>
</style>
