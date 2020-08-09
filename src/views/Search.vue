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
      <div class="search-history-wrapper">历史</div>
    </Scroll>
    <div>{{ hotSearchKeys }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRequest } from "@/assets/js/request";
import useDebounce from "@/assets/js/useDebounce";

export default defineComponent({
  setup() {
    const state = reactive({
      isShow: false,
      keyword: ""
    });

    const { data: hotSearchKeys } = useRequest("/api/keyword");

    const params = computed(() => ({ keyword: state.keyword }));
    const { data: movieList, fetch } = useRequest("/api/movie", params, {
      immediate: false
    });

    const search = useDebounce(() => {
      if (!state.keyword.trim()) {
        movieList.value = [];
        state.isShow = false;
        // todo 搜索历史缓存
      } else {
        fetch();
      }
    });

    return {
      state,
      hotSearchKeys,
      movieList,
      search
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
</style>
