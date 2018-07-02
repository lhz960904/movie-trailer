<template>
  <div class="rank">
    <scroll>
      <template v-for="(item, index) in movies">
        <div class="movie-item" :key="item._id">
          <card  :movie="item" :index="index + 1" :rank="true" @select="selectItem"/>
        </div>
      </template>
    </scroll>
  </div>
</template>

<script>
import Card from 'components/card/card'
import Scroll from 'components/scroll/scroll'
import { getHotKey } from 'api/movie'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      movies: []
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    _getRank () {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.movies = res.data.movies
        }
      })
    },
    selectItem (id) {
      this.$router.push({
        name: 'detail',
        params: {id}
      })
    }
  },
  components: {
    Card,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  .rank
    position fixed
    top 56px
    bottom 0
    width 100%
</style>
