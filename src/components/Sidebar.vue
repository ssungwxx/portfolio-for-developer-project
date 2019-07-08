<template>
    <div class="sidebar">
        <v-menu offset-y>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon color="yellow">menu</v-icon>
                </v-btn>
            </template>
            <v-list class="menus">
                <v-list-tile v-for="item in items" @click="">
                    <v-list-tile-title><router-link :to="item.go" text-decoration="none"><v-icon colot="yellow">{{ item.title }}</v-icon></router-link></v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>

    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        data() {
            return {
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
            }
        }
    }
</script>

<style>
    .sidebar {
        position: fixed;
        z-index: 2;
        margin-top: 5px;
        width: 100%;
        display: flex;
    }
    .v-btn {
        margin-left: auto;
    }

    @media screen and (min-width: 600px) {
        .sidebar {
            display: none;
        }
    }

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
