import { createApp } from "vue";
import { createPinia } from "pinia";

// 載入bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// 載入axios
import axios from "axios";
import VueAxios from "vue-axios";

// 載入loading套件
import { LoadingPlugin } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(LoadingPlugin);
app.provide("axios", app.config.globalProperties.axios);

app.mount("#app");
