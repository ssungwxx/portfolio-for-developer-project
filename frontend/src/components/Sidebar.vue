<template>
<div class="sidebar">
    <v-menu class="move" offset-y>
          <v-btn slot="activator" icon >
            <v-tooltip left>
              <v-icon slot="activator" color="white">menu</v-icon>
              <span>메뉴</span>
            </v-tooltip>
          </v-btn>
        <div>
        </div>

        <v-list class="menuButton" style="overflow: hidden;">

            <v-list-tile @click="favorite()">
                <v-list-tile-action >
<!--                    <v-btn slot="activator" icon v-on:click="favorite()">-->
                        <v-icon>star</v-icon>
<!--                    </v-btn>-->
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Bookmark</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
          <v-list-tile
                  v-for="(item, i) in items"
                  :key="i"
                  :to="item.url"
          >
              <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
            <v-list-tile>
                <v-list-tile-action style="margin-bottom: 48px;">
                    <Login/>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Login</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
                <v-list-tile-action style="margin-bottom: 48px;">
                    <Register/>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>SignUp</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-menu>
</div>
</template>

<script>

import Login from "./Login";
import Register from "./Register";

export default {

    name: 'Sidebar',
    components: {
      Login,
      Register
    },
    data: () => ({
        title: document.title,
        items: [
            // { title: 'Bookmark', icon: 'star', url: './bookmark'},
            { title: 'Post', icon: 'description', url: './post' },
            { title: 'Portfolio', icon: 'assignment_ind', url: './portfolio' },
            // { title: 'Login', icon: 'face', url: './login'},
            // { title: 'Signup', icon: 'person_add', url: './signup'}
        ]
    }),
    props: {
        imgSrc: {type: String},
        text: {type: String}
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
</style>
