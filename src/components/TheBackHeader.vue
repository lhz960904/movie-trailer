<template>
  <header class="back-header">
    <i class="iconfont icon-left" @click="$router.back()"/>
    <slot/>
  </header>
</template>

<script>
export default {
  name: 'TheBackHeader'
}
</script>

<style lang="stylus" scoped>
.back-header
  position fixed
  top 0
  display flex
  align-items center
  justify-content center
  width 100%
  height 56px
  color #fff
  background $theme-color
  text-align center
  .iconfont
    position absolute
    left 10px
    font-size 25px
</style>
