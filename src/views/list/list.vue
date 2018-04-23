<template>
  <div class="list">
    <backHeader @back="back">
      <tabs :tab="tab" :idx="type" @select="changeTab"></tabs>
    </backHeader>
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
      <template v-for="movie in movies">
        <card :movie=movie :key="movie._id" @select="gotoDetail"></card>
      </template>
      <div class="loading-wrapper" v-show="busy && this.max_page!==0">
        <p>加载中...</p>
      </div>
    </div>
    <loading :data="movies"></loading>
  </div>
</template>

<script>
import Tabs from '@/components/tab/tab'
import Card from '@/components/card/card'
import Loading from '@/components/loading/loading'
import backHeader from '@/components/back-header/back-header'
import { getMovies } from '@/api/movie'
import { ERR_OK } from '@/api/config'
export default {
  data () {
    return {
      movies: [],
      page: 1,
      busy: true,
      max_page: 0,
      name: 'list'
    }
  },
  created () {
    this.tab = ['正在上映', '即将上映']
    this._getMovies(this.$route.params.type)
  },
  beforeRouteEnter (to, from, next) {
    if (+to.params.type !== 1 && +to.params.type !== 0) {
      next('/movie')
    }
    next()
  },
  beforeRouteUpdate  (to, from, next) {
    this.page = 1
    this.max_page = 0
    this.movies = []
    this._getMovies(to.params.type)
    next()
  },
  computed: {
    type () {
      return +this.$route.params.type === 1 ? 0 : 1
    }
  },
  methods: {
    changeTab (index) {
      let type = index === 1 ? 0 : 1
      this.$router.push({
        name: 'list',
        params: {
          type: type
        }
      })
    },
    back () {
      this.$router.push({
        name: 'movie'
      })
    },
    gotoDetail (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id: id
        }
      })
    },
    loadMore () {
      this.busy = true
      this.page++
      this._getMovies(this.$route.params.type)
    },
    _getMovies (type) {
      if (this.page > this.max_page && this.max_page !== 0) {
        this.busy = false
        return
      }
      getMovies({
        page: this.page,
        page_size: 10,
        type
      }).then(res => {
        if (res.code === ERR_OK) {
          this.movies = this.movies.concat(res.data.movies)
          this.max_page = this.max_page || Math.ceil(res.data.count / 10)
          this.busy = false
        }
      })
    }
  },
  components: {
    Tabs,
    Card,
    Loading,
    backHeader
  }
}
</script>

<style lang="stylus" scoped>
  .list
    position fixed
    top 0
    bottom 0
    width 100%
    z-index 10
    .content
      .loading-wrapper
        height 30px
        text-align center
</style>
