<script setup lang="ts">
import { Movie } from "@/types/movie";

interface Item {
  count: number;
  movies: Movie[];
}

interface RecommendData {
  comming: Item;
  playing: Item;
}

const { data, pending } = await useFetch<RecommendData>("/api/movie/hot");

const movies = $computed(() => {
  if (!data.value) return [];
  const { comming, playing } = data.value;
  return comming.movies.concat(playing.movies);
});

const playingData = computed(() => data.value?.playing);
const commingData = computed(() => data.value?.comming);
</script>

<template>
  <div class="recommend">
    <Scroll :data="movies">
      <ListBlock :movies="playingData?.movies || []" :title="`正在热映(${playingData?.count || 0})`" :type="0" :loading="pending" />
      <Spacing />
      <ListBlock :movies="commingData?.movies || []" :title="`即将上映(${commingData?.count || 0})`" :type="1" :loading="pending" />
    </Scroll>
  </div>
</template>
