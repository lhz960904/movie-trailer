<template>
  <div class="movie" ref="movie">
    <scroll :data="hot_movies">
      <block :movies="hot_movies" title="正在上映" :count="hot_count" @select="selectItem" @more="goMore(1)"></block>
      <spacing bgcolor="#f6f6f6" :height="10"></spacing>
      <block :movies="comming_movies" title="即将上映" :count="comming_count" @select="selectItem" @more="goMore(0)"></block>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import Block from 'components/block/block'
import Scroll from 'components/scroll/scroll'
import Spacing from 'components/spacing/spacing'
import { getMovies } from 'api/movie'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      hot_movies: [],
      hot_count: 0,
      comming_movies: [],
      comming_count: 0
    }
  },
  created () {
    this._getMovies()
  },
  methods: {
    selectItem (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    },
    goMore (type) {
      this.$router.push({
        name: 'list',
        params: {
          type
        }
      })
    },
    _getMovies () {
      const params = {page: 1, page_size: 8}
      getMovies({
        ...params,
        type: 1
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.hot_movies = res.data.movies
          this.hot_count = res.data.count
        }
      })
      getMovies({
        ...params,
        type: 0
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.comming_movies = res.data.movies
          this.comming_count = res.data.count
        }
      })
    }
  },
  components: {
    Block,
    Scroll,
    Spacing
  }
}
</script>

<style lang="stylus" scoped>
  .movie
    position fixed
    top 56px
    bottom 0
    width 100%
</style>
