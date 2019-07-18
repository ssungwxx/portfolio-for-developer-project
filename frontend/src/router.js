import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import PortfolioWrite from "./views/PortfolioWrite.vue";
import DetailPortfolio from "./views/DetailPortfolio.vue";
import en from "./views/en.vue";

//import LoginPage from "./views/LoginPage.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: HomePage
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
<<<<<<< HEAD
        //Login Page 삭제
        {
            path: "/login",
            name: "login",
            component: LoginPage
        },

=======
        /*  Login Page 삭제
  {
      path: "/login",
      name: "login",
      component: LoginPage
    },
         */
>>>>>>> master
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
            path: "/en",
            name: "en",
            component: en
        }
    ]
});
