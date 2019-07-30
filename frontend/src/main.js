import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueSimplemde from "vue-simplemde";
import "simplemde/dist/simplemde.min.css";
import "font-awesome/css/font-awesome.min.css";
import Chat from "vue-beautiful-chat";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

//그래프 관련
import Bars from "vuebars";

Vue.use(Bars);

Vue.use(axios);

Vue.use(Chat);

// date 관련
Vue.use(require("vue-moment"));

//날씨 관련 Vue-Resource
// npm install vue-resource"
import VueResource from "vue-resource";
Vue.use(VueResource);

//관리자 페이지를 위한 side bar
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
Vue.use(VueSidebarMenu);

Vue.use(Vuetify, {
    iconfont: "fa",
    theme: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c"
    }
});

Vue.use(VueSimplemde);

Vue.use(axios);

import VueResizeText from "vue-resize-text";

Vue.use(VueResizeText);

// 배경화면 캐러셀
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
