<template>
  <div class="error">
    <img src="~common/images/error.png" width="150">
    <h1 class="text">出现未知错误</h1>
    <RouterLink to="/" class="back-btn">回到首页</RouterLink>
  </div>
</template>

<style lang="stylus" scoped>
.error
  height 100%
  display flex
  flex-direction column
  align-items center
  justify-content center
  .text
    margin 20px 0
    color gray
  .back-btn
    width 100px
    height 30px
    line-height 30px
    text-align center
    color #000
    border-radius 5px
    border: 1px solid $theme-color
</style>
