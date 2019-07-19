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
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field v-model="user.user_name" label="Full name*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field v-model="user.user_id" label="ID*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field
                                    v-model="user.user_pw"
                                    label="Password*"
                                    type="password"
                                    required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="check_user()">Register</v-btn>
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
            dialog: false,
            user: {
                user_id: "",
                user_pw: "",
                user_name: ""
            },
            check: [
                {
                    cnt: ""
                }
            ],
            err_stat: {
                status: "",
                code: ""
            }
        };
    },
    methods: {
        async check_user() {
            if (this.check_null()) {
                if (this.check_email()) {
                    this.check = await RestService.getUser(this.user.user_id);
                    if (this.check[0].cnt == 0) {
                        this.err_stat = await RestService.insertUser(this.user);
                        if (this.err_stat.status == 1) {
                            alert("가입 성공!");
                        } else {
                            alert(this.err_stat.code);
                        }
                    } else {
                        alert("중복된 Email입니다.");
                    }
                    this.clear_user();
                } else {
                    alert("ID를 Email형식으로 입력해주세요");
                }
            } else {
                alert("입력된 데이터에 공백값이 포함되어 있습니다.");
            }
        },
        clear_user() {
            this.user.user_id = "";
            this.user.user_pw = "";
            this.user.user_name = "";
            this.user.user_pw = "";
        },
        check_email() {
            let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            if (this.user.user_id.match(regExp) != null) {
                return true;
            } else {
                return false;
            }
        },
        check_null() {
            if (
                this.user.user_id == "" ||
                this.user.user_pw == "" ||
                this.user.user_name == ""
            )
                return false;
            return true;
        }
    }
};
</script>

<style>
    @media screen and (max-width: 600px) {
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