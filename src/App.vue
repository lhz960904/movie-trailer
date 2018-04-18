<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/header'
export default {
  components: {
    Header
  }
}
</script>

<style lang="stylus">
  .content
    position absolute
    top 56px
    bottom 0
    width 100%
    overflow scroll
    background #fff
</style>
