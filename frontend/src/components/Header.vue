<template>
    <div class="header">
        <v-toolbar class="insta" dark color="#ffc0cb" fixed>
            <v-btn icon href="/">
                <v-icon>home</v-icon>
            </v-btn>

            <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <div class="icons">
              <router-link to style="text-decoration: none;">
                  <v-btn icon>
                      <v-icon color="white" id="bookMark">star</v-icon>
                  </v-btn>
            </router-link>

            <router-link :to="port" style="text-decoration: none;">
                    <v-btn icon>
                        <v-icon color="white">markunread_mailbox</v-icon>
                    </v-btn>
            </router-link>

                <router-link :to="posts" style="text-decoration: none;">
                    <v-btn icon href="./Post">
                        <v-icon color="white">description</v-icon>
                    </v-btn>
                </router-link>
            </div>

            <div class="icons">
                <Login />
            </div>

            <div class="icons">
                <Register />
            </div>
        </v-toolbar>
    </div>
</template>

<script>
import Login from "../components/Login";
import Register from "../components/Register";

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
        ]
    }),
    components: {
        Login,
        Register
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
        }
    }
};
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
    background-color: yellow;
}

@media screen and (min-width: 600px) {
    .menu {
        display: none;
    }
}
</style>
