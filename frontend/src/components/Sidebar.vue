<template>
<div class="sidebar">
    <v-menu class="move" offset-y>
        <v-btn slot="activator" icon>
            <v-tooltip left>
                <v-icon slot="activator" color="white">menu</v-icon>
                <span>메뉴</span>
            </v-tooltip>
        </v-btn>
        <div>
        </div>

        <v-list class="menuButton" style="overflow: hidden;" v-if="getIsLogin">
            <v-list-tile v-if="getGrade != 10" :to="`/users/${getId}/posts`">
                <v-list-tile-action>
                    <v-icon style="margin-right: auto; margin-left: 17px;">description</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Posts</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-if="getGrade != 10" :to="`/users/${getId}/repos`">
                <v-list-tile-action>
                    <v-icon style="margin-right: auto; margin-left: 17px;">assignment_ind</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Repositories</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="getGrade != 10" :to="`/users/${getId}/userinfo`">
                <v-list-tile-action>
                    <v-icon style="margin-right: auto; margin-left: 17px;">settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Settings</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile v-if="getGrade == 10" :to="`/admin`">
                <v-list-tile-action>
                    <v-icon style="margin-right: auto; margin-left: 17px;">lock</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Admin</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>

            <v-list-tile @click="Logout">
                <v-list-tile-action>
                    <v-icon style="margin-right: auto; margin-left: 17px;">exit_to_app</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Logout</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-list class="menuButton" style="overflow: hidden" v-else>
            <v-list-tile>
                <v-list-tile-action style="margin-bottom: 48px;">
                    <Login />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Login</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-action style="margin-bottom: 48px;">
                    <Register />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title class="vtitle">Register</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
</div>
</template>

<script>
import Login from "./Login";
import Register from "./Register";
import { mapActions } from "vuex";
import RestService from "@/services/RestService";

export default {

    name: 'Sidebar',
    components: {
        Login,
        Register
    },
    data: () => ({
        title: document.title,
        id: '',
        grade: ''
    }),
    props: {
        imgSrc: { type: String },
        text: { type: String }
    },
    mounted() {
        this.setLoginInfo();
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
    },
    methods: {
        ...mapActions(['setLogin']),
        setLoginInfo() {
            this.setLogin();
        },
        ...mapActions(['logout']),
        async Logout() {
            await RestService.deleteRefreshToken(this.getId);
            sessionStorage.clear();
            this.logout();
            this.$router.push('/');
        }
    },
}
</script>

<style>
.sidebar {
    position: fixed;
    z-index: 2;
    margin-top: 5px;
    width: 50%;
    display: flex;
    right: 0%;
}

.v-btn {
    margin-left: auto;
}

.menuButton {
    width: 100%;
}

@media screen and (min-width: 600px) {
    .sidebar {
        display: none;
    }

    .menuButton {
        display: none;
    }
}

.theme--light.v-list {
    background: #ffc0cb;
    color: white;
    font-weight: bold;
}

.move {
    margin-left: auto;
}

.vtitle {
    margin-right: 17px;
}
</style>
