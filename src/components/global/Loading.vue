<template>
  <div class="spinner">
    <div class="rect rect1"/>
    <div class="rect rect2"/>
    <div class="rect rect3"/>
    <div class="rect rect4"/>
    <div class="rect rect5"/>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="stylus" scoped>
.spinner
  display flex
  justify-content center
  width 100%
  height 40px
  .rect
    background $theme-color
    height 100%
    width 5px
    margin-right 1px
    animation scale-y 1.2s infinite ease-in-out
    &.rect2
      animation-delay -1.1s
    &.rect3
      animation-delay -1.0s
    &.rect4
      animation-delay -0.9s
    &.rect5
      animation-delay -0.8s
@keyframes scale-y
  0%, 40%, 100%
    transform scaleY(0.4)
  20%
    transform scaleY(1)
</style>
