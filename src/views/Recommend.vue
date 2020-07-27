<template>
  <div class="recommend">
    <div>recommend {{ loading }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRequest } from "@/assets/js/request";

export default defineComponent({
  setup() {
    const { data, error, loading } = useRequest("/api/movie/hot");

    return { data, error, loading };
  }
});
</script>
