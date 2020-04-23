<template>
  <div class="search">
    <ScrollView :data="state.list">
      <div class="input-wrap">
        <SearchBox ref="searchBox" @input="search" @clear="clear" />
      </div>
      <div class="hotkey-wrap">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span
            v-for="item in state.hotKeys"
            :key="item._id"
            class="item"
            @click="addQuery(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div v-if="state.searchHistory.length" class="history-wrap">
        <div class="title">
          <span>搜索历史</span>
          <i class="iconfont icon-clear" @click="showConfirm" />
        </div>
        <div v-for="item in state.searchHistory" :key="item" class="item">
          <i class="iconfont icon-history" />
          <span class="text" @click="addQuery(item)">{{ item }}</span>
          <i class="iconfont icon-del" @click="deleteSearchHistory(item)" />
        </div>
      </div>
    </ScrollView>
    <div v-show="state.isShow" class="result-wrap">
      <ScrollView :data="state.movieList" v-show="state.movieList.length">
        <Card
          v-for="movie in state.movieList"
          :key="movie._id"
          :movie="movie"
          @select="selectItem"
        />
      </ScrollView>
      <NoResult v-show="!state.movieList.length" />
    </div>
    <Confirm
      ref="confirm"
      content="是否删除所有搜索历史"
      @confirm="clearSearchHistory"
    />
  </div>
</template>

<script>
import SearchBox from "@/components/SearchBox";
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore, mapMutations } from "vuex";
import axios, { useAxios } from "@/common/js/axios";
import useDebounce from "@/common/js/useDebounce";

export default {
  name: "Search",
  components: {
    SearchBox
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const searchBox = ref(null);
    const confirm = ref(null);

    const state = reactive({
      hotKeys: [],
      movieList: [],
      isShow: false,
      list: computed(() => {
        return state.hotKeys;
      }),
      searchHistory: computed(() => {
        return store.state.searchHistory;
      })
    });

    const { loading } = useAxios("/api/movie/get_hot_search", result => {
      state.hotKeys = result.keywords;
    });

    const search = useDebounce(async query => {
      if (!query.trim()) {
        clear();
        return;
      }

      const params = { keyword: query };

      const { movies } = await axios.get("api/movie/search", { params });
      state.movieList = movies;
      state.isShow = true;
      store.commit("saveSearchHistory", query);
    });

    const addQuery = query => {
      searchBox.value.setQuery(query);
      search(query);
    };

    const clear = () => {
      state.movieList = [];
      state.isShow = false;
    };

    const selectItem = id => {
      router.push(`/movie/${id}`);
    };

    const showConfirm = () => {
      confirm.value.show();
    };

    return {
      state,
      searchBox,
      confirm,
      loading,
      search,
      clear,
      addQuery,
      selectItem,
      showConfirm,
      ...mapMutations(["deleteSearchHistory", "clearSearchHistory"])
    };
  }
};
</script>

<style lang="stylus" scoped>
.search
  height: 100%;
  background: #f9f9f9;
  .input-wrap
    background: #f5f5f5;
    padding: 10px 15px;
  .hotkey-wrap
    padding: 0 0 8px 15px;
    background-color: #fff;
    .title
      padding: 15px 0;
      font-size: 15px;
      color: #666;
    .list
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;
      .item
        padding: 6px 12px;
        margin: 0 12px 12px 0;
        border-radius: 4px;
        font-size: 13px;
        color: #333;
        background-color: #f5f5f5;
  .history-wrap
    .title
      padding: 15px 0;
      font-size: 15px;
      color: #666;
      .icon-clear
        float: right;
        font-size: 15px;
    margin-top: 10px;
    padding: 0 15px 8px 15px;
    .item
      height: 40px;
      line-height: 40px;
      display: flex;
      font-size: 15px;
      color: #333;
      border-bottom: 1px solid #e5e5e5;
      .icon
        font-size: 15px;
        color: #999;
      .icon-history
        margin-right: 10px;
      .text
        flex: 1;
  .result-wrap
    position: fixed;
    top: 111px;
    bottom: 0;
    width: 100%;
    overflow: scroll;
    background: #fff;
    .no-result
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: #999;
      text-align: center;
      .img
        width: 100px;
        height: 100px;
        filter: grayscale(1);
        margin-bottom: 15px;
</style>
