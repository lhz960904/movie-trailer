<template>
  <div class="recommend">
    <ScrollView :data="state.movies">
      <ListBlock
        :movies="state.playingMovies"
        :title="`正在热映(${state.playingCount})`"
        :type="0"
        :loading="loading"
      />
      <Spacing bg-color="#f6f6f6" :height="10" />
      <ListBlock
        :movies="state.commingMovies"
        :title="`即将上映(${state.commingCount})`"
        :type="1"
        :loading="loading"
      />
    </ScrollView>
    {{ state.loading }}
  </div>
</template>

<script>
import { useAxios } from "@/common/js/axios";
import { reactive, computed } from "vue";
import ListBlock from "@/components/ListBlock";

export default {
  name: "Recommend",
  components: {
    ListBlock
  },
  setup() {
    /* 响应式数据 */
    const state = reactive({
      commingMovies: [],
      commingCount: 0,
      playingMovies: [],
      playingCount: 0,
      movies: computed(() => {
        return state.commingMovies.concat(state.playingMovies);
      })
    });

    const { loading } = useAxios("/api/movie/get_hot", result => {
      const { comming, playing } = result;
      state.commingMovies = comming.movies;
      state.commingCount = comming.count;
      state.playingMovies = playing.movies;
      state.playingCount = playing.count;
    });

    return { state, loading };
  }
};
</script>

<style lang="stylus" scoped>
.recommend
  height: 100%;
</style>
