<template>
  <div class="rank">
    <ScrollView v-show="movieList.length" :data="movieList">
      <Card
        v-for="(movie, index) in movieList"
        :key="movie._id"
        :movie="movie"
        :sort="index + 1"
        @select="gotoDetail"
      />
    </ScrollView>
    <div v-show="!movieList.length" class="loading-wrap">
      <Loading/>
    </div>
  </div>
</template>

<script>
import ScrollView from 'components/ScrollView'
import Loading from 'components/Loading'
import Card from 'components/Card'

export default {
  components: {
    ScrollView,
    Loading,
    Card
  },
  data () {
    return {
      movieList: []
    }
  },
  created () {
    this.getMovieList()
  },
  methods: {
    getMovieList () {
      this.$axios.get('/api/movie/get_rank').then(res => {
        if (res.code === 1001) {
          this.movieList = this.movieList.concat(res.result.movies)
        }
      })
    },
    gotoDetail (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rank
  height 100%
  .loading-wrap
    display flex
    align-items center
    height 100%
</style>
