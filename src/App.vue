<template>
  <TheHeader />
  <div class="content">
    <RouterView />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";

export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="stylus">
.content {
  position: absolute;
  top: $headerHeight;
  bottom: 0;
  width: 100%;
}
</style>
