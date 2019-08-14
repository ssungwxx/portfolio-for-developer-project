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

        <v-card>
            <v-card-title>
                <span class="headline">Register</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout column wrap>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="user.user_name" :rules="nameRules" label="Full name*" required></v-text-field>

                            <v-text-field v-model="user.user_id" :rules="idRules" label="ID*" :counter="20" required></v-text-field>

                            <v-text-field v-model="user.user_pw" :append-icon="show ? 'visibility' : 'visibility_off'" :rules="pwRules" :type="show ? 'text' : 'password'" label="Password*" hint="Password must be at least 4 characters." counter
                              @click:append="show = !show" required></v-text-field>

                            <v-text-field v-model="user.user_email" :rules="emailRules" label="E-mail*" required></v-text-field>
                        </v-form>
                    </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="reset">Reset</v-btn>
                <v-btn color="blue darken-1" flat @click="submit">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
import RestService from "../services/RestService";

export default {
    data() {
        return {
            valid: true,
            dialog: false,
            nameRules: [v => !!v || 'User name is required'],
            idRules: [
                v => !!v || 'ID is required',
                v => (v && v.length <= 20) || 'ID must be less than 20 characters'
            ],
            pwRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 8) || 'Password must be at least 8 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            show: false,
            user: {
                user_id: "",
                user_pw: "",
                user_name: "",
                user_email: ""
            },
            err_stat: {
                status: "",
                msg: ""
            }
        };
    },
    watch: {
        dialog: function() {
            this.$refs.form.reset();
        }
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                this.err_stat = await RestService.insertUser(this.user);
                if (this.err_stat.status == 200) {
                    alert("가입 성공!");
                    this.$refs.form.reset();
                    this.dialog = false;
                } else {
                    if (this.err_stat.msg == "overlap id") {
                        alert("중복된 ID입니다.");
                    } else {
                        alert("유효하지 않은 양식이 있습니다.");
                    }
                }
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        close() {
            this.$refs.form.reset();
            this.dialog = false;
        },
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
