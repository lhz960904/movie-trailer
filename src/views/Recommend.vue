<template>
  <div class="recommend">
    <h1>recommend</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {
    this.getMovie()
  },
  methods: {
    getMovie () {
      this.$axios.get('/api/movie/get_detail/5c0e941541dc26484002c94a').then(res => {
        console.log(res)
      })
    }
  }
}
</script>
