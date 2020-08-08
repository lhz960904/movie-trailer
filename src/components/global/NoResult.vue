<template>
  <div class="no-result-page">
    <img src="@/assets/images/noresult.png" class="img" />
    <p class="text">{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    text: {
      type: String,
      default: "没有找到相关内容"
    }
  }
});
</script>

<style lang="stylus" scoped>
.no-result-page
  height: 100%;
  layout-flex(center, center);
  flex-direction: column;
  color: $color-text-secondary;
  .img
    width: 100px;
    height: 100px;
    filter: grayscale(1);
    margin-bottom: 15px;
</style>
