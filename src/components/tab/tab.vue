<template>
  <div class="tabs">
    <div class="item"
      v-for="(name, index) in tab"
      :key="name"
      :class="{'active': idx == index}"
      @click="$emit('select', index)"
    >
      {{name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tab: {
      type: Array,
      required: true
    },
    idx: Number
  }
}
</script>

<style lang="stylus" scoped>
  .tabs
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 260px
    height 30px
    line-height 30px
    font-size 0
    border 1px solid #0d121a
    border-radius 100px
    background #0d121a
    .item
      display inline-block
      width 50%
      height 100%
      font-size 15px
      text-align center
      border-radius 100px
      &.active
        background #1c2635
</style>
