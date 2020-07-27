import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import request from "@/assets/js/request";

import "@/assets/styles/reset.styl";

createApp(App)
  .use(router)
  .use(store)
  .use(request)
  .mount("#app");
