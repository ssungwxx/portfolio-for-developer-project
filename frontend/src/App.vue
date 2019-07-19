<template>
    <v-app>
        <v-content>
            <Header />
            <Sidebar />
        </v-content>

        <v-content>
            <router-view />
            <TopButton />
            <TranslateButton/>
        </v-content>

        <v-content class="footerwrap">
            <Footer />
        </v-content>
    </v-app>
</template>

<script>
import store from "./store";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TopButton from "./components/TopButton";
import TranslateButton from "./components/TranslateButton";

export default {
    name: "App",
    components: {
        store,
        Footer,
        Header,
        Sidebar,
        TopButton,
        TranslateButton,

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
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.v-content.footerwrap > .v-content__wrap {
    margin-top: auto;
}
</style>
