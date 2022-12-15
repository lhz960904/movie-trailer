<template>
  <header class="back-header">
    <i class="iconfont icon-left" @click="onBack()" />
    <slot />
  </header>
</template>

<script lang="ts" setup>
const props = defineProps<{ onBack?: () => void }>();

const onBack = () => {
  if (typeof props.onBack === "function") {
    return;
  }
  window.history.back();
};
</script>

<style lang="stylus" scoped>
.back-header
  position: fixed;
  top: 0;
  layout-flex(center, center); width: 100%;
  height: $headerHeight;
  color: $color-white;
  background: $color-theme;†
  .iconfont
    position: absolute;
    left: 10px;
    font-size: $font-size-extra-large;
</style>
