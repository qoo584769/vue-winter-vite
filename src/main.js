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

import { defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { loadLocaleFromURL, localize, setLocale } from "@vee-validate/i18n";

// 載入全部驗證
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
// 中文語系
loadLocaleFromURL("../zh_TW.json");
// 把本地語系加入主套件
configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
setLocale("zh_TW");

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
