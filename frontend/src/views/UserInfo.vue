<template>
<!--    <h1>개인정보 확인 및 수정할 수 있는 페이지 테스트 중</h1>-->
    <v-layout column align-center>
        <v-layout wrap justify-space-around>
            <v-switch v-model="valid" class="ma-4" label="Valid" readonly></v-switch>
            <v-switch v-model="lazy" class="ma-4" label="Lazy"></v-switch>
        </v-layout>
        <v-form
                ref="form"
                v-model="valid"
                :lazy-validation="lazy"
        >
            <v-text-field
                    v-model="user_id"
                    :counter="10"
                    :rules="nameRules"
                    label="ID"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="user_name"
                    :counter="10"
                    :rules="nameRules"
                    label="Nickname"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="user_grade"
                    :counter="10"
                    :rules="nameRules"
                    label="User_grade"
                    required
            ></v-text-field>

            <v-text-field
                    v-model= "gitlab_id"
                    :counter="10"
                    :rules="nameRules"
                    label="Gitlab_ID"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="gitlab_address"
                    :counter="10"
                    :rules="nameRules"
                    label="Gitlab_address"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="access_token"
                    :counter="10"
                    :rules="nameRules"
                    label="Access_token"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
            ></v-text-field>

            <v-text-field
                    v-model="aboutme"
                    :counter="10"
                    :rules="nameRules"
                    label="About_Me"
                    required
            ></v-text-field>

            <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
            ></v-select>

            <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required
            ></v-checkbox>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validate"
            >
                Validate
            </v-btn>

            <v-btn
                    color="error"
                    class="mr-4"
                    @click="reset"
            >
                Reset Form
            </v-btn>

            <v-btn
                    color="warning"
                    @click="resetValidation"
            >
                Reset Validation
            </v-btn>
        </v-form>
    </v-layout>
</template>

<script>
import RestService from "@/services/RestService";
export default {
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,
        lazy: false,
    }),

    methods: {
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
