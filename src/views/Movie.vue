<template>
  <div>{{ $route.params }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useRequest } from "@/assets/js/request";

export default defineComponent({
  setup() {
    const route = useRoute();

    const { data, loading } = useRequest(`/api/movie/${route.params.id}`, {
      initialData: {}
    });

    setTimeout(() => {
      console.log(data);
    }, 2000);

    return {
      loading
    };
  }
});
</script>
