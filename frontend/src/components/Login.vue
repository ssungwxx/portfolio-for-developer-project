<template>
<v-layout>
    <v-dialog v-model="dialog" max-width="500">
        <template v-slot:activator="{ on }">
            <v-btn class="headerButton" icon v-on="on">
                <v-icon color="white">perm_identity</v-icon>
            </v-btn>
            <v-btn class="sidebarButton" flat v-on="on" style="width: 160px; left: 0px; height: 48px; z-index: 2;" fixed>
                <v-icon style="margin-right: auto; margin-left: 17px;">perm_identity</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-card-title class="headline">Login</v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout column wrap>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field
                            v-model="data.user_id"
                            :rules="idRules"
                            label="ID"
                            required></v-text-field>

                            <v-text-field
                            v-model="data.user_pw"
                            :append-icon="show ? 'visibility' : 'visibility_off'"
                            :rules="pwRules" :type="show ? 'text' : 'password'"
                            label="Password"
                            @click:append="show = !show"
                            required></v-text-field>
                        </v-form>
                    </v-layout>
                </v-container>

                <small>*indicates required field</small>
            </v-card-text>

            <br />

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="Login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-layout>
</template>

<script>
import RestService from "@/services/RestService";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            valid: true,
            dialog: false,
            idRules: [
                v => !!v || "ID is required"
            ],
            pwRules: [
                v => !!v || "Password is required"
            ],
            show: false,
            data: {
                user_id: "",
                user_pw: ""
            }
        };
    },
    beforeMount() {
        this.insertLog();
    },
    methods: {
        async insertLog() {
            this.insertLog = await RestService.insertLog("LoginPage");
        },
        ...mapActions(['setLogin']),
        async Login() {
            if (this.$refs.form.validate()) {
                let data = await RestService.loginUser(this.data);
                if (data.status == 200) {
                    sessionStorage.setItem('jwt', data.token);
                    this.setLogin();
                    axios.defaults.headers.jwt = sessionStorage.jwt;
                    alert('로그인 되었습니다.');
                    this.dialog = false;
                } else {
                    if (data.msg == 'wrong id') {
                        alert('존재하지 않는 ID입니다.');
                    } else {
                        alert('비밀번호가 올바르지 않습니다.');
                    }
                }
            }
        },
        reset() {
            this.$refs.form.reset();
        }
    },
    watch: {
        dialog: function() {
            this.reset();
        }
    }
};
</script>

<style>
.headline {
    padding-bottom: 50px;
}

.modalface {
    width: 100%;
}

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
