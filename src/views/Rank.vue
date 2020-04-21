<template>
  <div class="rank">
    <ScrollView v-show="movieList.length && !loading" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie._id"
        :movie="movie"
        :sort="index + 1"
        @select="gotoDetail"
      />
    </ScrollView>
    <NoResult v-show="!loading && !movieList.length" />
    <div v-show="loading" class="loading-wrap">
      <Loading />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "@/common/js/axios";

export default {
  setup() {
    const router = useRouter();

    const movieList = ref([]);

    const { loading } = useAxios("/api/movie/get_rank", result => {
      movieList.value = result.movies;
    });

    const gotoDetail = id => {
      router.push(`/movie/${id}`);
    };

    return { movieList, gotoDetail, loading };
  }
};
</script>

<style lang="stylus" scoped>
.rank
  height: 100%;
  .loading-wrap
    display: flex;
    align-items: center;
    height: 100%;
</style>
