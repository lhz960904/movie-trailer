<template>
  <div id="app">
    <my-header></my-header>
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import MyHeader from 'components/Header/Header'
export default {
  components: {
    MyHeader
  }
}
</script>

<style lang="stylus" scoped>
.content
  position fixed
  top 56px
  bottom 0
  width 100%
</style>
