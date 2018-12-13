<template>
  <div id="app">
    <TheHeader />
    <div class="content">
      <KeepAlive>
        <RouterView />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import TheHeader from 'components/TheHeader'
export default {
  name: 'App',
  components: {
    TheHeader
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
