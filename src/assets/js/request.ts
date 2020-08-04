import axios, { AxiosResponse, AxiosRequestConfig, Method } from "axios";
import { reactive, toRefs, onMounted, ComputedRef } from "vue";

interface RequestResponse<T> {
  code: number;
  data: T;
  errMsg: string;
}

interface RequestState<T> {
  loading: boolean;
  error: boolean;
  data: T;
}

interface RequestParams {
  [propName: string]: unknown;
}

interface RequestConfig<T> extends AxiosRequestConfig {
  initialData?: T;
  immediate: boolean;
}

const defaultConfig = {
  immediate: true
};

export function useRequest<T>(
  url: string,
  params?: ComputedRef<RequestParams>,
  config?: Partial<RequestConfig<T>>
) {
  const combineConfig: RequestConfig<T> = { ...defaultConfig, ...config };

  const { initialData, immediate, ...axiosConfig } = combineConfig;

  const state: RequestState<T> = reactive({
    loading: false,
    error: false,
    data: initialData
  }) as RequestState<T>;

  // 请求函数
  const fetchFunc = () => {
    state.loading = true;

    const matched = url.match(/:(\S+)/);
    const method: Method = matched ? (matched[1] as Method) : "get"; //

    const isGetMethod = method.toLowerCase() === "get";

    return axios({
      url,
      method,
      params: isGetMethod ? params?.value : undefined,
      data: isGetMethod ? undefined : params?.value,
      ...axiosConfig
    })
      .then((response: AxiosResponse<RequestResponse<T>>) => {
        const result = response.data;
        if (result.code === 200) {
          state.data = result.data;
          state.loading = false;
        } else {
          // messaage.error
        }
      })
      .catch(() => {
        state.error = true;
        state.loading = false;
      });
  };

  onMounted(() => {
    if (immediate) {
      fetchFunc();
    }
  });

  return { ...toRefs(state), fetch: fetchFunc };
}
