import lazyPlugin from "vue3-lazy";
import loadingImg from "~/assets/images/loading.png";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(lazyPlugin, {
    loading: loadingImg,
    error: loadingImg,
  });
});
