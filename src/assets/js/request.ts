import axios, { AxiosResponse, AxiosRequestConfig, Method } from "axios";
import { reactive, toRefs, onMounted } from "vue";

export const requestKey = Symbol("_axios_");

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
  initialData: T;
  immediate?: boolean;
}

// todo有待完善
export function useRequest<T>(
  url: string,
  params?: RequestParams,
  config?: RequestConfig<T>
) {
  const state: RequestState<T> = reactive({
    loading: false,
    error: false,
    data: config?.initialData
  }) as RequestState<T>;

  // 请求函数
  const fetchFunc = () => {
    state.loading = true;

    const matched = url.match(/:(\S+)/);
    const method: Method = matched ? (matched[1] as Method) : "get"; //

    const isGetMethod = method.toLowerCase() === "get";

    delete config?.initialData;

    return axios({
      url,
      method,
      params: isGetMethod ? params : undefined,
      data: isGetMethod ? undefined : params,
      ...config
    })
      .then((response: AxiosResponse<RequestResponse<T>>) => {
        const result = response.data;
        if (result.code === 200) {
          state.data = result.data;
        }
      })
      .catch(() => {
        state.error = true;
      })
      .finally(() => {
        state.loading = false;
      });
  };

  onMounted(() => {
    if (config?.immediate) {
      fetchFunc();
    }
  });

  return { ...toRefs(state), fetch: fetchFunc };
}
