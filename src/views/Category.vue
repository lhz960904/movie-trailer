<template>
  <div class="category">
    <SizerTab :sizerState="state" @change="handleSizerChange" />
    <div v-show="!loading" class="movie-list">
      <Scroll v-show="movieList.length" :data="movieList">
        <Card
          v-for="movie in movieList"
          :key="movie.id"
          :movie="movie"
          @select="gotoDetail"
        />
      </Scroll>
      <NoResult v-show="!movieList.length" />
    </div>
    <Loading v-show="loading" height="80%" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useRequest } from "@/assets/js/request";
import SizerTab from "@/components/SizerTab.vue";
import { Movie } from "@/types/movie";
import { SizerState } from "@/types/sizer";

export default defineComponent({
  components: {
    SizerTab
  },
  setup() {
    const router = useRouter();

    const state: Required<SizerState> = reactive({
      status: "1",
      rate: [0, 10],
      categories: []
    });

    const params = computed(() => ({
      status: state.status,
      rate: state.status !== "0" ? JSON.stringify(state.rate) : undefined,
      categories: !state.categories.length
        ? undefined
        : JSON.stringify(state.categories)
    }));

    const initialData: Movie[] = [];
    const { data, loading, fetch } = useRequest("/api/movie", params, {
      initialData
    });

    const handleSizerChange = (item: SizerState) => {
      for (const key in item) {
        state[key] = item[key];
      }
      fetch();
    };

    const gotoDetail = (id: string) => {
      router.push(`/movie/${id}`);
    };

    return {
      state,
      movieList: data,
      loading,
      handleSizerChange,
      gotoDetail,
      fetch
    };
  }
});
</script>

<style lang="stylus" scoped>
.movie-list
  page-fixed(97px);
</style>
