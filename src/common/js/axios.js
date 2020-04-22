import axios from "axios";
import { useRouter } from "vue-router";
import router from "@/router";
import { ref } from "vue";

// 请求出错跳转error页面
const redirectError = () => {
  router.push("/error");
};

const instance = axios.create({
  timeout: 60000,
  baseURL: "/"
});

instance.interceptors.request.use(config => {
  return config;
}, redirectError);

instance.interceptors.response.use(res => {
  const { data } = res;
  // 登录失效
  if (data.code === 1003) {
    router.replace("/login");
    return;
  }
  if (data.code === 1001) {
    return Promise.resolve(data.result);
  }
  return Promise.resolve(data);
}, redirectError);

export default instance;

export function useAxios(url, config, callback) {
  const loading = ref(true);
  const result = ref(null);

  if (typeof config === "function") {
    callback = config;
    config = {};
  }

  const router = useRouter();

  axios({
    url,
    ...config,
    timeout: 60000,
    baseURL: "/"
  })
    .then(res => {
      const { data } = res;
      if (data.code === 1001) {
        result.value = data.result;
        callback(data.result);
        loading.value = false;
        return;
      }
      // 登录失效
      if (data.code === 1003) {
        router.replace("/login");
        return;
      }
    })
    .catch(() => {
      router.push("/error");
    });

  return { loading: loading, result: result };
}
