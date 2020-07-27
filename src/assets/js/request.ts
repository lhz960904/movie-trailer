import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { App, reactive, toRefs } from "vue";

export const requestKey = Symbol("_axios_");

interface Response {
  code: number;
  data: unknown;
}

interface RequestState {
  loading: boolean;
  error: boolean;
  data: unknown;
}

export default {
  install: (app: App) => {
    app.provide(requestKey, () => console.log("hah"));
  }
};

export function useRequest(url: string, config?: AxiosRequestConfig) {
  const state: RequestState = reactive({
    loading: true,
    error: false,
    data: null
  });

  axios({
    url,
    ...config,
    timeout: 60000,
    baseURL: "/"
  })
    .then((res: AxiosResponse<Response>) => {
      const { data } = res;
      if (data.code === 200) {
        state.data = data.data;
      }
    })
    .catch(() => {
      state.error = true;
    })
    .finally(() => {
      state.loading = false;
    });

  return toRefs(state);
}
