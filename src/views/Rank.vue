<template>
  <div class="rank">
    <Scroll v-show="movieList.length && !loading" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie.id"
        :movie="movie"
        :sort="index + 1"
      />
    </Scroll>
    <Loading v-show="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/assets/js/request";
import { Movie } from "@/types/movie";

export default defineComponent({
  setup() {
    const initialData: Movie[] = [];

    const { data, loading } = useRequest("/api/movie/rank", undefined, {
      initialData
    });

    return { movieList: data, loading };
  }
});
</script>
