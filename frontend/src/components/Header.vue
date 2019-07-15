<template>
  <div class="header">
    <v-toolbar dark color="success darken-1" fixed>
      <v-btn icon href="/">
        <v-icon>home</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <div class="icons">
        <router-link to style="text-decoration: none;">
          <v-btn icon>
            <v-icon color="yellow" id="bookMark">star</v-icon>
          </v-btn>
        </router-link>

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
  components: {},
  methods: {}
};

$(document).ready(function() {
  $("#bookMark").on("click", function(e) {
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;
    var triggerDefault = false;
    if (window.sidebar && window.sidebar.addPanel) {
      window.sidebar.addPanel(bookmarkTitle, bookmarkURL, "");
    } else if (
      (window.sidebar &&
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1) ||
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
          : "Ctrl") + "+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다."
      );
    }
    return triggerDefault;
  });
});
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

.login {
  display: inline-block;
}
</style>
