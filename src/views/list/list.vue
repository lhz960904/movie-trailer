<template>
  <transition name="list">
    <div class="list">
      <h1>列表页</h1>
    </div>
  </transition>
</template>

<style lang="stylus" scoped>
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    background #fff
    z-index: 10
  .list-enter-active, .list-leave-active
    transition all .5s
  .list-enter, .list-leave-to
    transform translateX(100%)
</style>
