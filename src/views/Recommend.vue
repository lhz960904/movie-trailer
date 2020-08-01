<template>
  <div class="recommend">
    <Scroll :data="movies">
      <ListBlock
        :movies="data.playing.movies"
        :title="`正在热映(${data.playing.count})`"
        :type="0"
        :loading="loading"
      />
      <Spacing />
      <ListBlock
        :movies="data.comming.movies"
        :title="`即将上映(${data.comming.count})`"
        :type="1"
        :loading="loading"
      />
    </Scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRequest } from "@/assets/js/request";
import ListBlock from "@/components/ListBlock.vue";
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
  components: {
    ListBlock
  },
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

    const movies = computed(() => {
      const { comming, playing } = data.value;
      return comming.movies.concat(playing.movies);
    });

    return { data, loading, movies };
  }
});
</script>
