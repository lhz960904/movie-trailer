<template>
  <Transition name="fade">
    <div class="list">
      <TheBackHeader>
        <div class="tabs">
          <div
            v-for="(name, index) in tabs"
            :key="name"
            :class="{ 'active': activeIdx === index }"
            class="item"
            @click="switchTab(index)"
          >
            <span>{{ name }}</span>
          </div>
        </div>
      </TheBackHeader>
      <div class="content-wrapper">
        <ScrollView :data="movieList" :pull-up-load="true" @pulling-up="loadMore">
          <Card
            v-for="movie in movieList"
            :key="movie._id"
            :movie="movie"
            @select="gotoDetail"
          />
          <div class="pull-up-wrap">
            <p v-show="pullUpLoading">正在加载...</p>
            <p v-show="noMore">没有更多了~</p>
          </div>
        </ScrollView>
      </div>
      <div v-show="!movieList.length" class="loading-wrap">
        <Loading/>
      </div>
    </div>
  </Transition>
</template>

<script>
import TheBackHeader from 'components//TheBackHeader'

export default {
  name: 'List',
  components: {
    TheBackHeader
  },
  data () {
    return {
      movieList: [],
      count: 0,
      page: 1,
      tabs: ['即将上映', '正在热映'],
      activeIdx: +this.$route.params.type,
      pullUpLoading: false
    }
  },
  computed: {
    noMore () {
      return this.count === this.movieList.length && this.count !== 0
    }
  },
  created () {
    this.getMovieList()
  },
  beforeRouteUpdate  (to, from, next) {
    this.page = 1
    this.movieList = []
    this.count = 0
    this.activeIdx = +to.params.type
    next()
    this.getMovieList()
  },
  methods: {
    getMovieList () {
      const params = {
        page: this.page,
        page_size: 10,
        type: this.$route.params.type
      }
      this.$axios.get('/api/movie/get_movies', { params }).then(res => {
        if (res.code === 1001) {
          this.movieList = this.movieList.concat(res.result.movies)
          this.count = res.result.count
        }
        this.$nextTick(() => {
          this.pullUpLoading = false
        })
      })
    },
    switchTab (idx) {
      this.activeIdx = idx
      this.$router.push(`/list/${idx}`)
    },
    loadMore () {
      const { movieList, count } = this
      if (movieList.length === count) return
      this.page += 1
      this.pullUpLoading = true
      this.getMovieList()
    },
    gotoDetail (id) {
      this.$router.push(`/movie/${id}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.list
  position fixed
  top 0
  right 0
  bottom 0
  left 0
  background #fff
  z-index 10
  .tabs
    width 210px
    height 30px
    line-height 30px
    font-size 0
    border 1px solid #0d121a
    border-radius 100px
    background #0d121a
    .item
      display inline-block
      width 50%
      font-size 15px
      border-radius 100px
      &.active
        background $theme-color
  .content-wrapper
    position absolute
    top 56px
    bottom 0
    width 100%
    .pull-up-wrap
      height 30px
      line-height 30px
      text-align center
      color $gray
  .loading-wrap
    display flex
    align-items center
    height 100%
.fade-leave-active
  transition all .5s
.fade-leave-to
  transform translateX(100%)
</style>
