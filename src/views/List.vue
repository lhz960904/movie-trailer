<template>
  <div class="page-list">
    <TheBackHeader @back="onBack">
      <div class="tabs">
        <div
          v-for="(name, index) in tabs"
          :key="name"
          :class="{ active: +state.activeIdx === index }"
          class="item"
          @click="switchTab(index)"
        >
          <span>{{ name }}</span>
        </div>
      </div>
    </TheBackHeader>
    <div class="content-wrapper" v-show="movieList.length">
      <Scroll :data="movieList" :pull-up-load="true" @pulling-up="loadMore">
        <Card
          v-for="movie in movieList"
          :key="movie.id"
          :movie="movie"
          @select="gotoDetail"
        />
        <div class="pull-up-wrap">
          <p v-show="pullUpLoading">正在加载...</p>
          <p v-show="noMore">没有更多了~</p>
        </div>
      </Scroll>
    </div>
    <div v-show="totalLoading && !movieList.length" class="loading-wrap">
      <Loading />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import TheBackHeader from "@/components/TheBackHeader.vue";
import { useRequest } from "@/assets/js/request";
import useScrollMore from "@/assets/js/useScrollMore";
import { Movie } from "@/types/movie";

interface ListByStatusData {
  total: number;
  list: Movie[];
}

export default defineComponent({
  components: {
    TheBackHeader
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      page: 0,
      pageSize: 10,
      activeIdx: route.params.type,
      pullUpLoading: false
    });

    const initialData: ListByStatusData = { total: 0, list: [] };

    const params = computed(() => ({
      page: state.page,
      pageSize: state.pageSize,
      status: state.activeIdx
    }));

    const { data, loading, fetch } = useRequest("/api/movie/status", params, {
      initialData
    });

    const { refresh, loadMore, noMore, ...rest } = useScrollMore(
      data,
      state,
      fetch
    );
    const { loading: pullUpLoading, list: movieList } = rest;

    watch(toRef(state, "activeIdx"), refresh);

    const tabs = ["即将上映", "正在热映"];

    const switchTab = (idx: number) => {
      state.activeIdx = String(idx);
      router.push(`/list/${idx}`);
    };

    const gotoDetail = (id: string) => {
      router.push(`/movie/${id}`);
    };

    const onBack = () => {
      router.replace(`/recommend`);
    };

    return {
      state,
      movieList,
      totalLoading: loading,
      pullUpLoading,
      noMore,
      tabs,
      loadMore,
      switchTab,
      gotoDetail,
      onBack
    };
  }
});
</script>

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
  .loading-wrap
    layout-flex(center, center)
    height: 80%;
</style>
