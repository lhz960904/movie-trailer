<template>
  <div class="category">
    <div class="nav-wrapper">
      <div class="tabs">
        <div
          v-for="(item, index) in cats"
          :key="item"
          class="item"
          :class="getCls(index)"
          @click="switchTab(index)"
        >
          <span class="text">{{ item }}</span>
          <i class="iconfont icon-drop-down" :class="{'icon-drop-up': index === activeTabIdx}"/>
        </div>
      </div>
      <div v-show="activeTabIdx !== -1" class="tab-content">
        <SizerCategory
          v-show="activeTabIdx === 0"
          ref="sizerCategory"
          v-model="params.categories"
          @change="getMovies"
        />
        <SizerType
          v-show="activeTabIdx === 1"
          :status="params.type"
          @change="changeType"
        />
        <SizerRate
          v-show="activeTabIdx === 2"
          ref="sizerRate"
          v-model="params.rate"
          @change="getMovies"
        />
      </div>
      <div v-show="activeTabIdx !== -1" class="mask" @click="closeTab"/>
    </div>
    <div v-show="!loading" class="movie-wrapper">
      <ScrollView :data="movies">
        <Card
          v-for="movie in movies"
          :key="movie._id"
          :movie="movie"
          @select="selectItem"
        />
      </ScrollView>
      <div v-show="!movies.length" class="no-result">
        <img src="~common/images/noresult.png" class="img">
        <p class="text">没有找到相关内容</p>
      </div>
    </div>
    <div v-show="loading" class="loading-wrap">
      <Loading/>
    </div>
  </div>
</template>

<script>
import SizerCategory from 'components/SizerCategory'
import SizerType from 'components/SizerType'
import SizerRate from 'components/SizerRate'

export default {
  components: {
    SizerType,
    SizerRate,
    SizerCategory
  },
  data () {
    return {
      cats: ['分类', '已上映', '评分'],
      activeTabIdx: 2,
      movies: [],
      params: {
        categories: [],
        rate: [0, 10],
        type: 1
      },
      loading: true
    }
  },
  created () {
    this.getMovies()
  },
  methods: {
    getMovies () {
      this.activeTabIdx = -1
      this.loading = true
      const { categories, rate, type } = this.params
      const params = {
        categories: JSON.stringify(categories),
        rate: JSON.stringify(rate),
        type: type
      }
      this.$axios.get('/api/movie/get_special_movies', { params }).then(res => {
        if (res.code === 1001) {
          this.movies = res.result.movies
        }
        this.loading = false
      })
    },
    // 切换 type、tab[1] 名字
    changeType ({ type, name }) {
      this.params.type = type
      this.cats[1] = name
      this.getMovies()
    },
    switchTab (idx) {
      // 点击相同
      if (idx === this.activeTabIdx) {
        this.activeTabIdx = -1
        return
      }

      // 当选择未上映的时候，评分不可选
      if (this.params.type === 0 && idx === 2) return

      this.activeTabIdx = idx

      // 当从其他tab点击第一个时，重置组件cacheList
      if (idx === 0) {
        this.$refs.sizerCategory.resetCache()
      }

      if (idx === 2) {
        this.$nextTick(() => {
          this.$refs.sizerRate.resetCache()
        })
      }
    },
    selectItem (id) {
      this.$router.push(`/movie/${id}`)
    },
    closeTab () {
      this.activeTabIdx = -1
    },
    getCls (index) {
      return {
        'active': index === this.activeTabIdx,
        'disable': index === 2 && this.params.type === 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-wrapper
  position fixed
  width 100%
  z-index 10
  background #fff
  .tabs
    display flex
    height 40px
    line-height 40px
    border-bottom 1px solid #eee
    .item
      position relative
      flex 1
      text-align center
      font-size 13px
      color #777
      &.active
        color $theme-color
      &.disable
        color #eee
      &+.item:before
        position absolute
        content ""
        display block
        height 20px
        top 10px
        left 0
        border-left 1px solid #e8e8e8
      .icon
        font-size 12px
  .tab-content
      position absolute
      width 100%
      min-height 50px
      background #fff
      z-index 10
  .mask
    position fixed
    top 96px
    bottom 0
    width 100%
    background rgba(0, 0, 0, .3)
.movie-wrapper, .loading-wrap
  position fixed
  top 96px
  bottom 0
  width 100%
  .no-result
    position absolute
    top 40%
    left 50%
    transform translate(-50%,-50%)
    color #999
    text-align center
    .img
      width 100px
      height 100px
      filter grayscale(1)
      margin-bottom 15px
.loading-wrap
  display flex
  align-items center
</style>
