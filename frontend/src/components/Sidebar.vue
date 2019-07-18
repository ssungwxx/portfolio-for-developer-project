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
      items: [
      {
          title: "bookmark_border",
          go: "/Bookmark",
          tooltip: "즐겨찾기"
      },
        {
          title: "markunread_mailbox",
          go: "/Portfolio",
          tooltip: "포트폴리오"
        },
      {
          title: "description",
          go: "/Post",
          tooltip: "포스트"
      },
      {
          title: "perm_identity",
          go: "/Login",
          tooltip: "로그인"
      },
      {
        title: "person_add",
        go: "/Signup",
        tooltip: "회원가입"
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
}

.theme--light.v-list {
  background: lightgrey;
  color: white;
  /*font-weight: bold;*/
}
</style>
