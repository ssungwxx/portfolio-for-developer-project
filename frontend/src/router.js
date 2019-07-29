import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import PortfolioWrite from "./views/PortfolioWrite.vue";
import DetailPortfolio from "./views/DetailPortfolio.vue";
import DetailPost from "./views/DetailPost.vue";
import Admin from "./views/Admin.vue";
import Delegate from "./views/Delegate.vue";
import MainPage from "./views/MainPage.vue";
import UserPage from "./views/UserPage.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "mainpage",
            component: MainPage
        },
        {
            path: "/post",
            name: "post",
            component: PostPage
        },
        {
            path: "/portfolio",
            name: "portfolio",
            component: PortfolioPage
        },
        /*  Login Page 삭제
  {
      path: "/login",
      name: "login",
      component: LoginPage
    },
         */
        {
            path: "/detailportfolio/:id",
            name: "detailportfolio",
            component: DetailPortfolio
        },
        {
            path: "/portfoliowrite",
            name: "portfoliowrite",
            component: PortfolioWrite
        },
        {
            path: "/detailpost/:id",
            name: "detailpost",
            component: DetailPost
        },
        {
            path: "/admin",
            name: "admin",
            component: Admin
        },
        {
          path: "/delegate",
          name: "delegate",
          component: Delegate
        },
        {
            path: "/:id",
            name: "UserPage",
            component: UserPage,
        }
    ]
});
