<template>
  <div class="recommend">
    <div>recommend {{ loading }}</div>
    {{ data.comming.count }}
    <button @click="getList">改变</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/assets/js/request";
import { Movie } from "@/types/movie";

interface Item {
  count: number;
  movies: Movie[];
}

interface RecommendData {
  comming: Item;
  playing: Item;
}

export default defineComponent({
  setup() {
    const initialData = {
      comming: { count: 0, movies: [] },
      playing: { count: 0, movies: [] }
    };

    const { data, loading } = useRequest<RecommendData>(
      "/api/movie/hot",
      {},
      { initialData, immediate: true }
    );

    return { data, loading };
  }
});
</script>
