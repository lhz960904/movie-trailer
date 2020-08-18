<template>
  <div class="search">
    <Scroll>
      <div class="search-input-wrapper">
        <Input v-model="state.keyword" @change="search" />
      </div>
      <div class="search-keys-wrapper">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span
            v-for="item in hotSearchKeys"
            :key="item.name"
            class="item"
            @click="addQuery(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div v-if="state.searchHistory.length" class="search-history-wrapper">
        <h1 class="title">
          <span>历史</span>
          <i class="iconfont icon-clear" @click="state.isShowConfirm = true" />
        </h1>
        <div class="list">
          <div v-for="item in state.searchHistory" :key="item" class="item">
            <i class="iconfont icon-history" />
            <span class="text" @click="addQuery(item)">{{ item }}</span>
            <i class="iconfont icon-del" @click="deleteSearchHistory(item)" />
          </div>
        </div>
      </div>
    </Scroll>
    <div v-show="state.isShow" class="movie-list">
      <Scroll :data="movieList" v-show="movieList.length">
        <Card v-for="movie in movieList" :key="movie.id" :movie="movie" />
      </Scroll>
      <NoResult v-show="!movieList.length" />
    </div>
  </div>
  <Confirm
    v-model="state.isShowConfirm"
    content="是否删除所有搜索历史"
    @confirm="clearSearch"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore, mapMutations } from "vuex";
import { useRequest } from "@/assets/js/request";
import useDebounce from "@/assets/js/useDebounce";

export default defineComponent({
  setup() {
    const store = useStore();

    const state = reactive({
      isShow: false,
      isShowConfirm: false,
      keyword: "",
      searchHistory: computed(() => {
        return store.state.searchHistory;
      })
    });

    const { data: hotSearchKeys } = useRequest("/api/keyword");

    const params = computed(() => ({ keyword: state.keyword }));
    const { data: movieList, fetch } = useRequest("/api/movie/search", params, {
      immediate: false,
      initialData: []
    });

    const search = useDebounce(() => {
      if (!state.keyword.trim()) {
        movieList.value = [];
        state.isShow = false;
      } else {
        fetch().then(() => {
          state.isShow = true;
          store.commit("saveSearchHistory", state.keyword);
        });
      }
    });

    const addQuery = (word: string) => {
      state.keyword = word;
      search();
    };

    const clearSearch = () => {
      store.commit("clearSearchHistory", state.keyword);
      state.isShowConfirm = false;
    };

    return {
      state,
      hotSearchKeys,
      movieList,
      addQuery,
      search,
      clearSearch,
      ...mapMutations(["deleteSearchHistory"])
    };
  }
});
</script>

<style lang="stylus" scoped>
.search-input-wrapper
  background: $color-background;
  padding: 10px 15px;
.search-keys-wrapper
  padding: 0 15px 8px 15px;
  background-color: $color-white;
  .title
    padding: 15px 0;
    font-size: $font-size-base;
    color: $color-text-regular;
  .list
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .item
      padding: 6px 12px;
      margin: 0 12px 12px 0;
      border-radius: $border-radius-base;
      font-size: $font-size-small;
      color: $color-text-primary ;
      background-color: $color-background;
.search-history-wrapper
  padding: 0 15px 8px 15px;
  background-color: $color-white;
  .title
    padding-bottom: 15px;
    font-size: $font-size-base;
    color: $color-text-regular;
    .icon-clear
      float: right;
      font-size: $font-size-base;
  .list
    .item
      height: 40px;
      line-height: 40px;
      display: flex;
      font-size: $font-size-base;
      color: $color-text-primary;
      border-bottom: 1px solid $border-color-base;
      .icon
        font-size: $font-size-base;
        color: $color-text-secondary;
      .icon-history
        margin-right: 10px;
      .text
        flex: 1;
.movie-list
  page-fixed(111px);
</style>
