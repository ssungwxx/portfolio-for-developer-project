<template>
<div class="sidebar">
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-tooltip left>
          <v-icon slot="activator" color="white">menu</v-icon>
          <span> 메뉴</span>
        </v-tooltip>
      </v-btn>
    </template>
    <v-list class="menus">
      <v-list-tile v-for="item in items" @click="">
        <v-list-tile-title>
          <router-link :to="item.go" text-decoration="none">
            <v-tooltip left>
              <v-icon slot="activator" color="white">{{ item.title }}</v-icon>
              <span>{{ item.tooltip }}</span>
            </v-tooltip>
          </router-link>
        </v-list-tile-title>
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
      items: [{
          title: "perm_identity",
          go: "/Login",
          tooltip: "로그인"
        },
        {
          title: "description",
          go: "/Post",
          tooltip: "포스트"
        },
        {
          title: "markunread_mailbox",
          go: "/Portfolio",
          tooltip: "포트폴리오"
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
  background: pink;
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
