<template>
    <div class="Header">
        <v-toolbar dark color="#ffc0cb" fixed>
            <div style="display: flex;" v-if="this.$store.state.user">
                <v-tooltip bottom>
                    <v-btn slot="activator" icon href="/">
                        <v-icon>home</v-icon>
                    </v-btn>
                    <span>홈으로 이동</span>
                </v-tooltip>

                <v-toolbar-title style="align-self: center" class="white--text">{{ title }}</v-toolbar-title>
            </div>
            <div v-else>
                <div style="display: flex; ">
                    <v-icon style="margin-right: 10px;">search</v-icon>
                    <v-text-field id="search" v-model="search" @click="resetInput"></v-text-field>
                </div>
                <v-card v-if="search !== ''">
                    <v-list-tile v-for="(user, i) in users" :key="i">
                        <!--                        <router-link :to="'/users/' + user" :user="user" style="text-decoration: none">-->
                        <v-btn :href="'/users/' + user" style="width: 100%; height: 100%;">
                            <div style="display: flex;">
                                <v-icon>people</v-icon>
                                <v-list-tile-title
                                    style="margin-left: 1vw; color: white;"
                                >{{ user }}</v-list-tile-title>
                            </div>
                        </v-btn>
                        <!--                        </router-link>-->
                    </v-list-tile>
                </v-card>
            </div>

            <v-spacer></v-spacer>

            <div class="icons" v-if="this.$store.state.user">
                <router-link to style="text-decoration: none;">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon v-on:click="favorite()">
                            <v-icon color="white" id="bookMark">star</v-icon>
                        </v-btn>
                        <span>북마크</span>
                    </v-tooltip>
                </router-link>

                <router-link :to="port" style="text-decoration: none;">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon>
                            <v-icon color="white">markunread_mailbox</v-icon>
                        </v-btn>
                        <span>포트폴리오</span>
                    </v-tooltip>
                </router-link>

                <router-link :to="posts" style="text-decoration: none;">
                    <v-tooltip bottom>
                        <v-btn slot="activator" icon href="./Post">
                            <v-icon color="white">description</v-icon>
                        </v-btn>
                        <span>포스트</span>
                    </v-tooltip>
                </router-link>
            </div>

            <div class="icons">
                <v-tooltip bottom>
                    <Login slot="activator" />
                    <span>로그인</span>
                </v-tooltip>
            </div>

            <div class="icons">
                <v-tooltip bottom>
                    <Register slot="activator" />
                    <span>회원가입</span>
                </v-tooltip>
            </div>
        </v-toolbar>
    </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";
import RestService from "../services/RestService";
import UserPage from "../views/UserPage";

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
            }
        ],
        search: "검색할 아이디를 입력해주세요.",
        users: []
    }),
    components: {
        Login,
        Register,
        UserPage
    },
    watch: {
        search: function() {
            if (this.search !== "") {
                this.getUsers();
            }
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
                    (navigator.userAgent.toLowerCase().indexOf("mac") != -1
                        ? "Cmd"
                        : "Ctrl") +
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
    position: absolute;
    background-color: yellow;
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

.v-input {
    width: 30vw;
    min-width: 25vw;
}

.v-card {
    position: absolute;
    min-width: auto;
    margin-left: 34px;
}

.v-list__tile {
    padding: 0;
}
</style>
