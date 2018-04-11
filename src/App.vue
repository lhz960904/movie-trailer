<template>
  <div id="app">
    <Header></Header>
    <div class="content">
      <router-view></router-view>
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
