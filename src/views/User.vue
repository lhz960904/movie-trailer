<template>
  <div class="user">
    <h1>{{ user.username }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style lang="stylus" scoped>
</style>
