<template>
  <div class="loading" v-show="!data.length > 0">
    <img src="./loading.gif">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '加载中...'
    },
    data: Array
  }
}
</script>

<style lang="stylus" scoped>
  .loading
    position absolute
    top 50%
    left 50%
    transform translateX(-50%)
    text-align center
</style>
