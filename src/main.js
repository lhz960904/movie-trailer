import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import globalComponent from "./common/js/component";

import "./common/styles/reset.styl";

createApp(App)
  .use(router)
  .use(store)
  .use(globalComponent)
  .mount("#app");
