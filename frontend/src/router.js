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
import WebLog from "./views/WebLog.vue";
import MainPage from "./views/MainPage.vue";
import UserPage from "./views/UserPage.vue";
// import Charts from "./views/Charts.vue";
import RepoPage from "./views/RepoPage.vue";
import WritePost from "./views/WritePost.vue";


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
            path: "/:id/posts",
            name: "Posts",
            component: PostPage
        },
        // {
        //     path: "/portfolio",
        //     name: "portfolio",
        //     component: PortfolioPage
        // },
        // {
        //     path: "/detailportfolio/:id",
        //     name: "detailportfolio",
        //     component: DetailPortfolio
        // },
        // {
        //     path: "/portfoliowrite",
        //     name: "portfoliowrite",
        //     component: PortfolioWrite
        // },
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
            path: "/WebLog",
            name: "weblog",
            component: WebLog
        },
        // {
        //     path: "/Charts",
        //     name: "charts",
        //     component: Charts
        // },
        {
            path: "/:id/repos",
            name: "Repositories",
            component: RepoPage
        },
        {
            path: "/:id/writepost",
            name: "WritePost",
            component: WritePost
        }
    ]
});
