<template>
  <header class="back-header">
    <i class="iconfont icon-left" @click="onBack()" />
    <slot />
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TheBackHeader",
  setup(props, { attrs, emit }) {
    const onBack = () => {
      if (typeof attrs.onBack === "function") {
        emit("back");
        return;
      }
      window.history.back();
    };

    return { onBack };
  }
});
</script>

<style lang="stylus" scoped>
.back-header
  position: fixed;
  top: 0;
  layout-flex(center, center);
  width: 100%;
  height: $headerHeight;
  color: $color-white;
  background: $color-theme;
  .iconfont
    position: absolute;
    left: 10px;
    font-size: $font-size-extra-large;
</style>
