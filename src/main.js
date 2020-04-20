import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalComponent from "./common/js/component";
import lazyPlugin from "vue3-lazy";

import "./common/styles/reset.styl";

createApp(App)
  .use(router)
  .use(store)
  .use(globalComponent)
  .use(lazyPlugin, {
    loading: require("common/images/loading.png"),
    error: require("common/images/loading.png")
  })
  .mount("#app");
