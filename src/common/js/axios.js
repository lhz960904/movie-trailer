import axios from "axios";
import router from "@/router";

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
  if (data.code === 1001) {
    return Promise.resolve(data.result);
  }
  // 登录失效
  if (data.code === 1003) {
    router.replace("/login");
    return;
  }
  redirectError();
}, redirectError);

export default instance;
