<template>
<!--    <h1>개인정보 확인 및 수정할 수 있는 페이지 테스트 중</h1>-->
    <v-layout style="margin-top: 60px;" column align-center v-if="this.$store.getters.getUser_id === user_id">
        <v-form ref="form" v-model="valid">
            <v-text-field v-model="user_id" :counter="15" :rules="nameRules" label="ID" required></v-text-field>
            <v-text-field v-model="user_name" :counter="12" :rules="nameRules" label="Nickname" required></v-text-field>
            <v-text-field v-model= "gitlab_id" label="Gitlab_ID" required></v-text-field>
            <v-text-field v-model="gitlab_address" label="Gitlab_address" required></v-text-field>
            <v-text-field v-model="access_token" label="Access_token" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="aboutme" label="About_Me" required></v-text-field>
            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>
            <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>
        </v-form>
    </v-layout>
</template>

<script>
import RestService from "@/services/RestService";
export default {
    data() {
        return {
            user_id: this.$route.params.id,
            user_name: "",
            user_grade: "",
            gitlab_id: "",
            gitlab_address: "",
            access_token: "",
            aboutme: "",


            valid: true,
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            checkbox: false,
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const user = await RestService.getUser(this.user_id);
            console.log(user)
            this.user_name = user.user_name;
            this.user_grade = user.user_grade;
            this.gitlab_id = user.user_gitId;
            this.gitlab_address = user.user_gitAdd;
            this.access_token = user.user_gitToken;
            this.aboutme = user.user_aboutMe;
            this.email = user.user_email;
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
    },
}

</script>
<style>

</style>
