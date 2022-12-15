<template>
  <div class="rank">
    <Scroll v-show="movieList.length && !pending" :data="movieList">
      <Card v-for="(movie, index) in movieList" :key="movie.id" :movie="movie" :sort="index + 1" />
    </Scroll>
    <Loading v-show="pending" />
  </div>
</template>

<script lang="ts" setup>
import { Movie } from "@/types/movie";

const { data, pending } = useFetch<Movie[]>("/api/movie/rank");

const movieList = computed(() => data.value || []);
</script>
