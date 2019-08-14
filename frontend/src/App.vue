<template>
    <v-app>
        <v-content class="v-header">
            <Header/>
            <Sidebar/>
        </v-content>

        <v-content>
            <router-view/>
            <TopButton/>
        </v-content>

        <v-content class="footerwrap">
            <Footer/>
        </v-content>
    </v-app>
</template>
<script>
    import Footer from "./components/Footer";
    import Header from "./components/Header";
    import Sidebar from "./components/Sidebar";
    import TopButton from "./components/TopButton";
    import SidebarMenu from "vue-sidebar-menu";
    import {store} from "./vuex/store";

    export default {
        name: "App",
        components: {
            store,
            Footer,
            Header,
            Sidebar,
            TopButton,
            SidebarMenu
        },
        data() {
            return {};
        },
        mounted() {
            const userAgent = navigator.userAgent;
            if (
                userAgent.indexOf("Chrome") === -1 ||
                userAgent.indexOf("Edge") !== -1
            ) {
                alert("해당 사이트는 크롬에 최적화 되어 있습니다.");
            }
        },
    };
</script>

<style>
    #app {
        font-family: Consolas;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: black;
        background-color: white;
    }

    .v-content.footerwrap > .v-content__wrap {
        margin-top: auto;
    }

    .v-header {
        height: 64px;
        max-height: 64px;
    }

    .blockdrag {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
