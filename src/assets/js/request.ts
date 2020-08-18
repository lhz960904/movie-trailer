import axios, { AxiosResponse, AxiosRequestConfig, Method } from "axios";
import { reactive, toRefs, onMounted, ComputedRef, Ref } from "vue";

export interface RequestResponse<T> {
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
  onSuccess?: (data: RequestResponse<T>) => void;
  onFail?: (data: RequestResponse<T>) => void;
}

interface ReturnResult<T> {
  loading: Ref<boolean>;
  error: Ref<boolean>;
  data: Ref<T>;
  fetch: () => Promise<void>;
}

const defaultConfig = {
  immediate: true
};

function useRequest<T>(
  url: string | ComputedRef<string>,
  config?: Partial<RequestConfig<T>>
): ReturnResult<T>;
function useRequest<T>(
  url: string | ComputedRef<string>,
  params?: ComputedRef<RequestParams>,
  config?: Partial<RequestConfig<T>>
): ReturnResult<T>;
function useRequest<T>(...args: any[]): ReturnResult<T> {
  let _url: { value: string };
  let _params: ComputedRef<RequestParams> | undefined;
  let _config: Partial<RequestConfig<T>> = {};

  if (args.length >= 1) {
    _url = args[0].value ? args[0] : { value: args[0] };
  }

  if (args.length > 2) {
    _params = args[1];
    _config = args[2];
  } else {
    if (args[1] && args[1].value) {
      _params = args[1];
    } else if (typeof args[1] === "object") {
      _config = args[1];
    }
  }

  const combineConfig: RequestConfig<T> = { ...defaultConfig, ..._config };

  const {
    initialData,
    immediate,
    onSuccess,
    onFail,
    ...axiosConfig
  } = combineConfig;

  const state: RequestState<T> = reactive({
    loading: false,
    error: false,
    data: initialData
  }) as RequestState<T>;

  // 请求函数
  const fetchFunc = () => {
    state.loading = true;

    const matched = _url.value.match(/:(\S+)/);
    const method: Method = matched ? (matched[1] as Method) : "get"; //

    const isGetMethod = method.toLowerCase() === "get";

    return axios({
      url: _url.value,
      method,
      params: isGetMethod ? _params?.value : undefined,
      data: isGetMethod ? undefined : _params?.value,
      ...axiosConfig
    })
      .then((response: AxiosResponse<RequestResponse<T>>) => {
        const result = response.data;
        if (result.code === 200) {
          state.data = result.data;
          if (typeof onSuccess === "function") {
            onSuccess(result);
          }
        } else {
          if (typeof onFail === "function") {
            onFail(result);
          }
          // messaage.error
        }
        state.loading = false;
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

export { useRequest };

const instance = axios.create({
  timeout: 60000,
  baseURL: "/"
});

instance.interceptors.response.use(
  res => res.data,
  () => {
    // messaage.error
  }
);

export default instance;
