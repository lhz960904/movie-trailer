<template>
  <Transition name="fade">
    <div class="list">
      <TheBackHeader :back="onBack">
        <div class="tabs">
          <div
            v-for="(name, index) in tabs"
            :key="name"
            :class="{ active: state.activeIdx === index }"
            class="item"
            @click="switchTab(index)"
          >
            <span>{{ name }}</span>
          </div>
        </div>
      </TheBackHeader>
      <div class="content-wrapper">
        <ScrollView
          :data="state.movieList"
          :pull-up-load="true"
          @pulling-up="loadMore"
        >
          <Card
            v-for="movie in state.movieList"
            :key="movie._id"
            :movie="movie"
            @select="gotoDetail"
          />
          <div class="pull-up-wrap">
            <p v-show="state.pullUpLoading">正在加载...</p>
            <p v-show="state.noMore">没有更多了~</p>
          </div>
        </ScrollView>
      </div>
      <div v-show="!state.movieList.length" class="loading-wrap">
        <Loading />
      </div>
    </div>
  </Transition>
</template>

<script>
import TheBackHeader from "components//TheBackHeader";
import { reactive, computed, onMounted, watch, toRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/common/js/axios";

export default {
  name: "List",
  components: {
    TheBackHeader
  },
  setup() {
    const tabs = ["即将上映", "正在热映"];

    const route = useRoute();
    const router = useRouter();

    const state = reactive({
      movieList: [],
      count: 0,
      page: 1,
      activeIdx: +route.params.type,
      pullUpLoading: false,
      noMore: computed(() => {
        return state.count === state.movieList.length && state.count !== 0;
      })
    });

    onMounted(async () => {
      getMovieList();
    });

    const activeIdx = toRef(state, "activeIdx");

    watch(activeIdx, () => {
      state.page = 1;
      state.movieList = [];
      state.count = 0;
      getMovieList();
    });

    const getMovieList = async () => {
      const params = {
        page: state.page,
        page_size: 10,
        type: state.activeIdx
      };
      const { count, movies } = await axios.get("/api/movie/get_movies", {
        params
      });
      state.movieList = state.movieList.concat(movies);
      state.count = count;
      state.pullUpLoading = false;
    };

    const switchTab = idx => {
      state.activeIdx = idx;
      router.push(`/list/${idx}`);
    };

    const loadMore = () => {
      const { movieList, count } = state;
      if (movieList.length === count) return;
      state.page += 1;
      state.pullUpLoading = true;
      getMovieList();
    };

    const gotoDetail = id => {
      router.push(`/movie/${id}`);
    };

    const onBack = () => {
      router.replace(`/recommend`);
    };

    return { state, tabs, switchTab, loadMore, gotoDetail, onBack };
  }
};
</script>

<style lang="stylus" scoped>
.list
  page-fixed()
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
      font-size: 15px;
      border-radius: 100px;
      &.active
        background: $theme-color;
  .content-wrapper
    position: absolute;
    top: $headerHeight;
    bottom: 0;
    width: 100%;
    .pull-up-wrap
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: $gray;
  .loading-wrap
    display: flex;
    align-items: center;
    height: 100%;
.fade-leave-active
  transition: all .5s;
.fade-leave-to
  transform: translateX(100%);
</style>
