import Vue from "vue";
import Router from "vue-router";
import Admin from "./views/Admin.vue";
import MainPage from "./views/MainPage.vue";
import UserPage from "./views/UserPage.vue";
import RepoPage from "./views/RepoPage.vue";
import PostPage from "./views/PostPage.vue";
import PostDetail from "./views/PostDetail.vue";
import UserInfo from "./views/UserInfo";
import AddRepos from "./views/AddRepos";
import {store} from "./vuex/store";

Vue.use(Router);

const requireAuth = () => (to, from, next) => {
  if (store.getters.getIsLogin) {
    console.log(store.getters.getIsLogin);
    return next();
  }
  console.log(store.getters.getIsLogin);
  next('/');
};

const requireAdmin = () => (to, from, next) => {
  if(store.getters.getIsLogin && store.getters.getGrade == 10) {
    return next();
  }
  next('/');
};

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "MainPage",
            component: MainPage
        },
        {
            path: "/users/:id/posts",
            name: "Posts",
            component: PostPage
        },
        {
            path: "/users/:id/posts/:post_id",
            name: "PostDetail",
            component: PostDetail
        },
        {
            path: "/users/:id/repos",
            name: "Repositories",
            component: RepoPage
        },
        {
            path: "/users/:id",
            name: "UserPage",
            component: UserPage
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin,
            beforeEnter: requireAdmin()
        },
        {
          path: "/users/:id/userinfo",
          name: "userinfo",
          component: UserInfo,
          beforeEnter: requireAuth()
        },
        {
            path: "/users/:id/addrepo",
            name: "Addrepo",
            component: AddRepos,
            beforeEnter: requireAuth()
        }
    ]
});
