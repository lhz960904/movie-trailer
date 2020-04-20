<template>
  <div class="recommend">
    <ScrollView :data="movies">
      <ListBlock
        :movies="data.playingMovies"
        :title="`正在热映(${data.playingCount})`"
        :type="0"
        :loading="data.loading"
      />
      <ListBlock
        :movies="data.commingMovies"
        :title="`即将上映(${data.commingCount})`"
        :type="1"
        :loading="data.loading"
      />
    </ScrollView>
  </div>
</template>

<script>
import axios from "@/common/js/axios";
import { reactive, computed, onMounted } from "vue";
import ListBlock from "@/components/ListBlock";

export default {
  name: "Recommend",
  components: {
    ListBlock
  },
  setup() {
    /* 响应式数据 */
    const data = reactive({
      commingMovies: [],
      commingCount: 0,
      playingMovies: [],
      playingCount: 0,
      loading: true
    });

    /* 请求电影推荐电影列表 */
    onMounted(async () => {
      data.loading = true;
      const { comming, playing } = await axios.get("/api/movie/get_hot");
      data.commingMovies = comming.movies;
      data.commingCount = comming.count;
      data.playingMovies = playing.movies;
      data.playingCount = playing.count;
      data.loading = false;
    });

    /* 推荐电影总列表 */
    const movies = computed(() => {
      return data.commingMovies.concat(data.playingMovies);
    });

    return { data, movies };
  }
};
</script>

<style lang="stylus" scoped>
.recommend
  height: 100%;
</style>
