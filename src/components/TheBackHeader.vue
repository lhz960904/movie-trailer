<template>
  <header class="back-header">
    <i class="iconfont icon-left" @click="onBack()" />
    <slot />
  </header>
</template>

<script>
export default {
  name: "TheBackHeader",
  props: {
    back: {
      type: Function
    }
  },
  setup(props) {
    const onBack = () => {
      if (typeof props.back === "function") {
        props.back();
        return;
      }
      window.history.back();
    };

    return { onBack };
  }
};
</script>

<style lang="stylus" scoped>
.back-header
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: $headerHeight;
  color: $white;
  background: $theme-color;
  text-align: center;
  .iconfont
    position: absolute;
    left: 10px;
    font-size: 25px;
</style>
