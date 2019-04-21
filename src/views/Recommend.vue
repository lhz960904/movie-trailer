<template>
  <div class="recommend">
    <ScrollView :data="movies">
      <ListBLock
        :movies="playingMovies"
        :title="`正在热映(${playingCount})`"
        @more="goMore(1)"
        @select="selectItem"
      />
      <Spacing bg-color="#f6f6f6" :height="10"/>
      <ListBLock
        :movies="commingMovies"
        :title="`即将上映(${commingCount})`"
        @more="goMore(0)"
        @select="selectItem"
      />
    </ScrollView>
  </div>
</template>

<script>
import ListBLock from 'components/ListBlock'

export default {
  components: {
    ListBLock
  },
  data () {
    return {
      commingMovies: [],
      commingCount: 0,
      playingMovies: [],
      playingCount: 0
    }
  },
  computed: {
    movies () {
      return this.commingMovies.concat(this.playingMovies)
    }
  },
  created () {
    this.getMovie()
  },
  methods: {
    getMovie () {
      this.$axios.get('/api/movie/get_hot').then(res => {
        if (res.code === 1001) {
          const { comming, playing } = res.result
          this.commingMovies = comming.movies
          this.commingCount = comming.count
          this.playingMovies = playing.movies
          this.playingCount = playing.count
        }
      })
    },
    goMore (type) {
      this.$router.push(`/list/${type}`)
    },
    selectItem (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.recommend
  height 100%
</style>
