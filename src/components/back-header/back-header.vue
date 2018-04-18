<template>
  <header class="header">
    <i class="icon icon-left" @click="$emit('back')"></i>
    <slot></slot>
  </header>
</template>

<style lang="stylus" scoped>
  .header
    position fixed
    width 100%
    height 56px
    line-height 56px
    color #fff
    background #1c2635
    text-align center
    .icon
      position absolute
      left 10px
      font-size 25px
</style>
