import { toRefs, reactive, computed, watch, Ref } from "vue";

interface ScrollMoreState<T> {
  list: T[];
  loading: boolean;
  noMore: boolean;
}

interface OuterState {
  page: number;
}

type OuterData<T> = Ref<{
  total: number;
  list: T[];
}>;

//
/**
 * 处理滚动加载更多通用逻辑
 * @param data useRequest请求的列表
 * @param outerState 调用时的state，用于改变page
 * @param fetch 请求函数
 */
export default function useScrollMore<T>(
  data: OuterData<T>,
  outerState: OuterState,
  fetch: () => Promise<void>
) {
  const state: ScrollMoreState<T> = reactive({
    list: [],
    loading: false,
    noMore: computed(() => {
      return data.value.total <= state.list.length && data.value.total !== 0;
    })
  });

  const loadMore = async () => {
    const { list } = state;
    const { total } = data.value;
    if (list.length >= total) return;
    outerState.page += 1;
    state.loading = true;
    await fetch();
    state.loading = false;
  };

  watch(data, newVal => {
    state.list = state.list.concat(newVal.list);
  });

  const refresh = () => {
    outerState.page = 0;
    state.list = [];
    fetch();
  };

  return {
    ...toRefs(state),
    loadMore,
    refresh
  };
}
