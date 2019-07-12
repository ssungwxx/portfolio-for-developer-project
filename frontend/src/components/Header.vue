<template>
    <div class="header">
        <v-toolbar dark color="success darken-1" fixed>

            <v-btn icon href="/">
                <v-icon>home</v-icon>
            </v-btn>

            <v-btn>
              <v-facebook-login app-id="2340768596039099"></v-facebook-login>
            </v-btn>
            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <div class="icons">
                <router-link :to="port" style="text-decoration: none;">
                    <v-btn icon>
                        <v-icon color="yellow">markunread_mailbox</v-icon>
                    </v-btn>
                </router-link>

                <router-link :to="posts" style="text-decoration: none;">
                    <v-btn icon href="./Post">
                        <v-icon color="yellow">description</v-icon>
                    </v-btn>
                </router-link>

                <router-link :to="login" style="text-decoration: none;">
                  <v-btn icon href="./Login">
                  <v-icon color="yellow">perm_identity</v-icon>
                  </v-btn>
                </router-link>

            </div>
        </v-toolbar>
    </div>
</template>

<script>
import { VFBLogin as VFacebookLogin } from 'vue-facebook-login-component'

    export default {
        name: "Header",
        data: () => ({
            title: document.title,
            port: "/Portfolio",
            posts: "/Post",
            login: "/Login",
            items: [
                {
                    title: "perm_identity",
                    go: "/Login"
                },
                {
                    title: "description",
                    go: "/Post"
                },
                {
                    title: "markunread_mailbox",
                    go: "/Portfolio"
                },
            ]
        }),
        components: {
          VFacebookLogin
        },
        methods: {
        }
    }
</script>

<style>
    .theme--light.v-list {
        background: yellow;
        color: darkgreen;
        font-weight: bold;
    }

    @media screen and (max-width: 600px) {
        .icons {
            display: none;
        }
    }

    .header {
        z-index: 1;
        position: relative;
    }

    @media screen and (min-width: 600px) {
        .menu {
            display: none;
        }
    }
</style>
