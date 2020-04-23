<template>
  <div class="category">
    <div class="nav-wrapper">
      <div class="tabs">
        <div
          v-for="(item, index) in cats"
          :key="item"
          class="item"
          :class="getCls(index)"
          @click="switchTab(index)"
        >
          <span class="text">{{ item }}</span>
          <i
            class="iconfont icon-drop-down"
            :class="{ 'icon-drop-up': index === activeTabIdx }"
          />
        </div>
      </div>
      <div v-show="activeTabIdx !== -1" class="tab-content">
        <SizerCategory
          v-if="activeTabIdx === 0"
          ref="sizerCategory"
          v-model="params.categories"
          @change="getMovies"
        />
        <SizerType
          v-if="activeTabIdx === 1"
          v-model="params.type"
          @change="changeType"
        />
        <SizerRate
          v-if="activeTabIdx === 2"
          ref="sizerRate"
          v-model="params.rate"
          @change="getMovies"
        />
      </div>
      <div v-show="activeTabIdx !== -1" class="mask" @click="closeTab" />
    </div>
    <div v-show="!loading" class="movie-wrapper">
      <ScrollView v-show="movies.length" :data="movies">
        <Card
          v-for="movie in movies"
          :key="movie._id"
          :movie="movie"
          @select="selectItem"
        />
      </ScrollView>
      <NoResult v-show="!movies.length" />
    </div>
    <div v-show="loading" class="loading-wrap">
      <Loading />
    </div>
  </div>
</template>

<script>
import SizerCategory from "@/components/SizerCategory";
import SizerType from "@/components/SizerType";
import SizerRate from "@/components/SizerRate";
import axios from "@/common/js/axios";
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    SizerType,
    SizerRate,
    SizerCategory
  },
  name: "Category",
  setup() {
    const router = useRouter();

    const cats = ["分类", "已上映", "评分"];

    const activeTabIdx = ref(-1);
    const movies = ref([]);
    const loading = ref(true);
    const params = reactive({
      categories: [],
      rate: [0, 10],
      type: 1
    });

    onMounted(() => {
      getMovies();
    });

    const getMovies = async () => {
      activeTabIdx.value = -1;
      loading.value = true;
      const { categories, type, rate } = params;
      const finnalParams = {
        categories: JSON.stringify(categories),
        rate: JSON.stringify(rate),
        type: type
      };
      const result = await axios.get("/api/movie/get_special_movies", {
        params: finnalParams
      });
      movies.value = result.movies;
      loading.value = false;
    };

    // 切换 type、tab[1] 名字
    const changeType = ({ name }) => {
      cats[1] = name;
      getMovies();
    };

    // 切换tab
    const switchTab = idx => {
      // 点击相同相当于关闭
      if (idx === activeTabIdx.value) {
        activeTabIdx.value = -1;
        return;
      }
      // 当选择未上映的时候，评分不可选
      if (params.type === 0 && idx === 2) return;
      activeTabIdx.value = idx;
    };

    const selectItem = id => {
      router.push(`/movie/${id}`);
    };

    const closeTab = () => {
      activeTabIdx.value = -1;
    };

    const getCls = index => {
      return {
        active: index === activeTabIdx.value,
        disable: index === 2 && params.type === 0
      };
    };

    return {
      cats,
      movies,
      activeTabIdx,
      params,
      loading,
      changeType,
      switchTab,
      closeTab,
      selectItem,
      getCls,
      getMovies
    };
  }
};
</script>

<style lang="stylus" scoped>
.nav-wrapper
  position: fixed;
  width: 100%;
  z-index: 10;
  background: $white;
  .tabs
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    .item
      position: relative;
      flex: 1;
      text-align: center;
      font-size: 13px;
      color: #777;
      &.active
        color: $theme-color
      &.disable
        color: #eee
      &+.item:before
        position: absolute
        content: "";
        display: block;
        height: 20px;
        top: 10px;
        left: 0;
        border-left: 1px solid #e8e8e8;
      .icon
        font-size: 12px;
  .tab-content
      position: absolute;
      width: 100%;
      min-height: 50px;
      background: #fff;
      z-index: 10;
  .mask
    position: fixed;
    top: 96px;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .3);
.movie-wrapper, .loading-wrap
  position: fixed;
  top: 96px;
  bottom: 0;
  width: 100%;
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
.loading-wrap
  display: flex;
  align-items: center;
</style>
