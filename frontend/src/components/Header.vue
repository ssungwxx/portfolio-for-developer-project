<template>
    <div class="Header">
        <v-toolbar dark color="#ffc0cb" fixed>
            <div style="display: flex;">
                <router-link :to="'/'" style="text-decoration: none;">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon>
                            <v-icon>home</v-icon>
                        </v-btn>
                        <span>홈으로 이동</span>
                    </v-tooltip>
                </router-link>
            </div>
            <div>
                <div style="display: flex; margin-left: 10px;">
                    <v-text-field class="vinput" id="search" v-model="search" @click="resetInput"></v-text-field>
                    <v-icon style="margin-left: 10px;">search</v-icon>
                </div>
                <v-card class="card" v-if="search !== ''">
                    <v-list-tile v-for="(user, i) in users" :key="i">
                        <router-link :to="'/users/' + user" style="text-decoration: none">
                            <div style="display: flex; margin: 0 15px;">
                                <v-icon>people</v-icon>
                                <v-list-tile-title
                                        style="margin-left: 1vw; color: white;"
                                >{{ user }}
                                </v-list-tile-title>
                            </div>
                        </router-link>
                    </v-list-tile>
                </v-card>
            </div>

            <v-spacer></v-spacer>

            <div class="icons" v-if="this.$store.getters.getIsLogin">
                <router-link to style="text-decoration: none;">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon v-on:click="favorite()">
                            <v-icon color="white" id="bookMark">star</v-icon>
                        </v-btn>
                        <span>Bookmark</span>
                    </v-tooltip>
                </router-link>

                <router-link
                    :to="`/users/${this.$store.getters.getUser_id}/repos`"
                    style="text-decoration: none;"
                >
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon>
                            <v-icon color="white">markunread_mailbox</v-icon>
                        </v-btn>
                        <span>Repository</span>
                    </v-tooltip>
                </router-link>

                <router-link
                    :to="`/users/${this.$store.getters.getUser_id}/posts`"
                    style="text-decoration: none;"
                >
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon>
                            <v-icon color="white">description</v-icon>
                        </v-btn>
                        <span>Post</span>
                    </v-tooltip>
                </router-link>

                <v-tooltip bottom>
                    <v-btn slot="activator" icon @click="Logout">
                        <v-icon color="white">exit_to_app</v-icon>
                    </v-btn>
                    <span>Logout</span>
                </v-tooltip>
            </div>

            <div class="LogReg" v-else>
                <div class="icons">
                    <v-tooltip bottom>
                        <Login slot="activator"/>
                        <span>Login</span>
                    </v-tooltip>
                </div>

                <div class="icons">
                    <v-tooltip bottom>
                        <Register slot="activator"/>
                        <span>Register</span>
                    </v-tooltip>
                </div>
            </div>
        </v-toolbar>
    </div>
</template>

<script>
    import Login from "../components/Login";
    import Register from "../components/Register";
    import RestService from "../services/RestService";
    import UserPage from "../views/UserPage";
    import {mapActions} from "vuex";

    export default {
        name: "Header",
        data: () => ({
            title: document.title,
            posts: "/posts",
            repos: "/repos",
            login: "/Login",
            search: "검색할 아이디를 입력해주세요.",
            users: []
        }),
        components: {
            Login,
            Register,
            UserPage
        },
        watch: {
            search: function () {
                if (this.search !== "") {
                    this.getUsers();
                }
            },
            $route: function () {
                this.search = "";
            }
        },
        methods: {
            favorite() {
                var bookmarkURL = window.location.href;
                var bookmarkTitle = document.title;
                var triggerDefault = false;
                if (window.sidebar && window.sidebar.addPanel) {
                    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
                } else if (
                    (window.sidebar &&
                        navigator.userAgent.toLowerCase().indexOf("firefox") >
                        -1) ||
                    (window.opera && window.print)
                ) {
                    var $this = $(this);
                    $this.attr("href", bookmarkURL);
                    $this.attr("title", bookmarkTitle);
                    $this.attr("rel", "sidebar");
                    $this.off(e);
                    triggerDefault = true;
                } else if (window.external && "AddFavorite" in window.external) {
                    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                } else {
                    alert(
                        (navigator.userAgent.toLowerCase().indexOf("mac") != -1 ?
                            "Cmd" :
                            "Ctrl") +
                        "+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다."
                    );
                }
                return triggerDefault;
            },
            async getUsers() {
                const users = await RestService.getUsers();
                const userGroup = [];
                for (let i = 0; i < users.length && this.users.length < 5; i++) {
                    if (
                        this.search ===
                        users[i].user_id.slice(0, this.search.length) &&
                        users[i].user_grade !== 10
                    ) {
                        userGroup.push(users[i].user_id);
                    }
                }
                this.users = userGroup;
            },
            resetInput() {
                this.search = "";
            },
            ...mapActions(['logout']),
            Logout() {
                this.logout();
            }
        }
    };
</script>

<style>
    .theme--light.v-list {
        background: #ffc0cb;
        color: white;
        font-weight: bold;
    }

    @media screen and (max-width: 599px) {
        .icons {
            display: none;
        }
    }

    .Header {
        z-index: 2;
        background-color: yellow;
        position: absolute;
        height: 64px;
    }

    #search {
        background: white;
        width: 30vw;
        min-width: 25vw;
        color: black;
        padding: 5px;
        border: solid yellow 2px;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
    }

    .v-input__slot {
        margin-bottom: 0px;
    }

    .vinput {
        width: 30vw;
        min-width: 25vw;
    }

    .card {
        position: absolute;
        min-width: auto;
        margin-left: 10px;
    }

    .v-list__tile {
        padding: 0;
    }

    .LogReg {
        display: flex;
    }

</style>
