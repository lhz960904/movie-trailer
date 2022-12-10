<script lang="ts" setup>
import { Movie } from "@/types/movie";
import { Response } from "@/types/response";
import { SizerState } from "@/types/sizer";

const state: Required<SizerState> = reactive({
  status: "1",
  rate: [0, 10],
  categories: [],
});

const params = computed(() => ({
  status: state.status,
  rate: state.status !== "0" ? JSON.stringify(state.rate) : undefined,
  categories: !state.categories.length
    ? undefined
    : JSON.stringify(state.categories),
}));

const initialData: Movie[] = [];
const { data, pending, refresh } = useFetch<Response<Movie[]>>("/api/movie", {
  server: false,
  params,
});

const movieList = computed(() => data.value?.data || []);

const handleSizerChange = (item: SizerState) => {
  for (const key in item) {
    state[key] = item[key];
  }
  refresh();
};
</script>

<template>
  <div class="category">
    <SizerTab :sizerState="state" @change="handleSizerChange" />
    <div v-show="!pending" class="movie-list">
      <Scroll v-show="movieList.length" :data="movieList">
        <Card v-for="movie in movieList" :key="movie.id" :movie="movie" />
      </Scroll>
      <NoResult v-show="!movieList.length" />
    </div>
    <Loading v-show="pending" height="80%" />
  </div>
</template>

<style lang="stylus" scoped>
.movie-list
  page-fixed(97px);
</style>
