<template>
  <div class="movie">
    <block :movies="hot_movies" title="正在上映" :count="20" @select="selectItem" @more="goMore(1)"></block>
    <spacing bgcolor="#f6f6f6" :height="10"></spacing>
    <block :movies="hot_movies" title="即将上映" :count="60" @select="selectItem" @more="goMore(0)"></block>
    <router-view></router-view>
  </div>
</template>

<script>
import Block from '@/components/block/block'
import Spacing from '@/components/spacing/spacing'
import { getMovies } from '@/api/movie'
import { ERR_OK } from '@/api/config'
export default {
  data () {
    return {
      hot_movies: [],
      comming_movies: []
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
      getMovies({
        page: 1,
        page_size: 8
      }).then((res) => {
        if (res.code === ERR_OK) {
          this.hot_movies = res.data.movies
        }
      })
    }
  },
  components: {
    Block,
    Spacing
  }
}
</script>
