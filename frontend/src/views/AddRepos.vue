<template>
    <v-container class="title-div">

        <div>
            <p class="port-title">Add New Repository</p>
        </div>
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
                        v-model="gitlab_address"
                        :counter="100"
                        :rules="inputRules"
                        label="Gitlab Repository Address"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="access_token"
                        :counter="100"
                        :rules="inputRules"
                        label="Gitlab Access Token"
                        required
                ></v-text-field>

                <v-text-field
                        v-model="project_id"
                        :counter="100"
                        :rules="inputRules"
                        label="Project ID"
                        required
                ></v-text-field>

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
    </v-container>
</template>

<script>
import RestService from "@/services/RestService";
import FirebaseService from "@/services/FirebaseService";

    export default {
        name: "AddRepo",
        components: {
        },
        // beforeMount() {
        //     this.insertLog();
        // },
        data: () => ({
            valid: true,
            gitlab_address: '',
            inputRules: [
                v => !!v || 'This field can not be empty',
                v => (v && v.length > 1) || 'Name must be more than 1 characters',
            ],
            access_token:'',
            project_id:'',

            checkbox: false,
            lazy: false,
        }),

        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.snackbar = true
                }
            },
            reset() {
                this.$refs.form.reset()
            },
            resetValidation() {
                this.$refs.form.resetValidation()
            },
        },
    }

</script>
<style>
    .port-title {
        font-size: 5vw;
    }

    .title-div {
        margin-top: 50px;
    }
</style>
