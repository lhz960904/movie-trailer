<template>
  <div class="category">
    <div class="nav-wrapper">
      <div class="tabs">
        <div
          v-for="(item, index) in cats"
          :key="item"
          class="item"
          :class="{'active': index === activeTabIdx, 'disable': index === 2 && type === 0}"
          @click="switchTab(index)"
        >
          <span class="text">{{ item }}</span>
          <i class="iconfont icon-drop-down" :class="{'icon-drop-up': index === activeTabIdx}"/>
        </div>
      </div>
      <div v-show="activeTabIdx !== -1" class="tab-content">
        <div v-show="activeTabIdx === 0" class="category-wrapper">
          <div class="list">
            <span
              v-for="item in cateList"
              :key="item._id"
              :class="{'active': categories.includes(item.name)}"
              class="item"
              @click="selectCategory(item.name)"
            >
              {{ item.name }}
            </span>
          </div>
          <button class="confirm-btn" @click="confirm">完成</button>
        </div>
        <div v-show="activeTabIdx === 1" class="type-wrapper">
          <div
            v-for="item in pubdates"
            :key="item.name"
            class="item"
            :class="{'active': type === item.type}"
            @click="selectType(item)"
          >
            <i class="iconfont icon-dui"/>
            <span class="text">{{ item.name }}</span>
          </div>
        </div>
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
import Card from 'components/Card'
import ScrollView from 'components/ScrollView'
import Loading from 'components/Loading'

export default {
  components: {
    Card,
    Loading,
    ScrollView
  },
  data () {
    return {
      cats: ['分类', '已上映', '评分'],
      activeTabIdx: -1,
      movies: [],
      categories: [],
      cateList: [],
      rate: [0, 10],
      type: 1,
      loading: true
    }
  },
  watch: {
    activeTabIdx (newVal, oldVal) {
      if (newVal !== 0 && this.cacheArr) {
        this.categories = this.cacheArr
      }
    }
  },
  created () {
    this.pubdates = [
      { name: '全部', type: '' },
      { name: '已上映', type: 1 },
      { name: '未上映', type: 0 }
    ]
    this.getCategories()
    this.getMovies()
  },
  methods: {
    getMovies () {
      this.loading = true
      const params = {
        categories: JSON.stringify(this.categories),
        rate: JSON.stringify(this.rate),
        type: this.type
      }
      this.$axios.get('/api/movie/get_special_movies', { params }).then(res => {
        if (res.code === 1001) {
          this.movies = res.result.movies
        }
        this.loading = false
      })
    },
    getCategories () {
      this.$axios.get('/api/category/get_cates').then(res => {
        if (res.code === 1001) {
          this.cateList = res.result.cates
        }
      })
    },
    switchTab (idx) {
      // 当选择未上映的时候，评分不可选
      if (this.type === 0 && idx === 2) return
      // 缓存分类
      if (idx === 0) {
        this.cacheArr = this.categories
      }
      this.activeTabIdx = idx
    },
    selectType ({ name, type }) {
      this.type = type
      this.cats[1] = name
      this.activeTabIdx = -1
      this.getMovies()
    },
    selectCategory (name) {
      const arr = this.categories.slice()
      const idx = arr.indexOf(name)
      if (idx > -1) {
        arr.splice(idx, 1)
      } else {
        arr.push(name)
      }
      this.categories = arr
    },
    confirm () {
      this.cacheArr = this.categories
      this.activeTabIdx = -1
      this.getMovies()
    },
    selectItem (id) {
      this.$router.push(`/movie/${id}`)
    },
    closeTab () {
      this.activeTabIdx = -1
    }
  }
}
</script>

<style lang="stylus" scoped>
.nav-wrapper
  position fixed
  width 100%
  z-index 100
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
      .category-wrapper
        padding 10px 25px
        .list
          display flex
          flex-wrap wrap
          .item
            padding 6px 12px
            margin: 0 10px 10px 0
            border-radius 5px
            font-size 13px
            color #777
            border 1px solid #ccc
            &.active
              border-color #faaf00
              background #faaf00
              color #fff
        .confirm-btn
          width 60px
          height 30px
          background #409eff
          color #fff
          border none
          outline none
          border-radius 3px
    .type-wrapper
      display flex
      flex-direction column
      background #fff
      .item
        position relative
        flex 1
        line-height 40px
        margin 0 30px
        color #333
        border-bottom 1px solid #e5e5e5
        .icon-dui
          display none
          position absolute
          left -25px
        &.active
          color #faaf00
          .icon-dui
            display inline
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
