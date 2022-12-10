<template>
  <div class="rank">
    <Scroll v-show="movieList.length && !pending" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie.id"
        :movie="movie"
        :sort="index + 1"
      />
    </Scroll>
    <Loading v-show="pending" />
  </div>
</template>

<script lang="ts" setup>
import { Movie } from "@/types/movie";
import { Response } from "@/types/response";

const { data, pending } = useFetch<Response<Movie[]>>("/api/movie/rank", {
  server: false,
});

const movieList = computed(() => data.value?.data || []);
</script>
