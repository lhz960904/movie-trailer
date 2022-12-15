<script lang="ts" setup>
import { Movie } from "@/types/movie";

interface ListByStatusData {
  total: number;
  list: Movie[];
}
const route = useRoute();
const router = useRouter();

const state = reactive({
  page: 0,
  pageSize: 10,
  activeIdx: route.params.type,
  pullUpLoading: false,
});

const params = computed(() => ({
  page: state.page,
  pageSize: state.pageSize,
  status: state.activeIdx,
}));

const { data, pending, refresh: fetch } = useFetch<ListByStatusData>("/api/movie/status", { params });

const { refresh, loadMore, noMore, ...rest } = useScrollMore<Movie>(data, state, fetch);
const { loading: pullUpLoading, list } = rest;

watch(toRef(state, "activeIdx"), refresh);

const tabs = ["即将上映", "正在热映"];

const switchTab = (idx: number) => {
  state.activeIdx = String(idx);
  router.push(`/list/${idx}`);
};

const onBack = () => {
  router.push(`/recommend`);
};

const movieList = computed(() => (list.value?.length ? list.value : data.value?.list || []));
</script>

<template>
  <div class="page-list">
    <TheBackHeader @back="onBack">
      <div class="tabs">
        <div v-for="(name, index) in tabs" :key="name" :class="{ active: +state.activeIdx === index }" class="item" @click="switchTab(index)">
          <span>{{ name }}</span>
        </div>
      </div>
    </TheBackHeader>
    <div class="content-wrapper" v-show="movieList.length">
      <Scroll :data="movieList" :pull-up-load="true" @pulling-up="loadMore">
        <Card v-for="movie in movieList" :key="movie.id" :movie="movie" />
        <div class="pull-up-wrap">
          <p v-show="pullUpLoading">正在加载...</p>
          <p v-show="noMore">没有更多了~</p>
        </div>
      </Scroll>
    </div>
    <Loading v-show="pending" height="80%" />
  </div>
</template>
<style lang="stylus" scoped>
.page-list
  page-fixed($headerHeight);
  .tabs
    width: 210px;
    height: 30px;
    line-height: 30px;
    font-size: 0;
    border: 1px solid #0d121a;
    border-radius: 100px;
    background: #0d121a;
    .item
      display: inline-block;
      width: 50%;
      text-align: center;
      font-size: 15px;
      border-radius: 100px;
      &.active
        background: $color-theme;
  .content-wrapper
    height: calc(100% - 56px);
    .pull-up-wrap
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: $font-size-small;
      color: $color-text-regular;
</style>
