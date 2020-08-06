<template>
  <div class="rank">
    <Scroll v-show="movieList.length && !loading" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie.id"
        :movie="movie"
        :sort="index + 1"
        @select="gotoDetail"
      />
    </Scroll>
    <Loading v-show="loading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "@/assets/js/request";
import { Movie } from "@/types/movie";

export default defineComponent({
  setup() {
    const router = useRouter();

    const initialData: Movie[] = [];

    const { data, loading } = useRequest("/api/movie/rank", undefined, {
      initialData
    });

    const gotoDetail = (id: string) => {
      router.push(`/movie/${id}`);
    };

    return { gotoDetail, movieList: data, loading };
  }
});
</script>
