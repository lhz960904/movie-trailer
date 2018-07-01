<template>
  <div class="category">
    <div class="nav-wrapper">
      <div class="tabs">
        <div class="item"
          v-for="(item, index) in cats"
          :key="item"
          :class="{'active': index === currentIdx}"
          @click="selectTab(index)"
        >
          <span class="text">{{ item }}</span>
          <i class="icon icon-drop-down" :class="{'icon-drop-up': index === currentIdx}"></i>
        </div>
      </div>
      <div class="tab-content" v-show="currentIdx !== 99">
        <div class="category-wrapper" v-show="currentIdx === 0">
          <div class="list">
            <span
              v-for="item in category"
              :key="item._id"
              @click="selectCategory(item.name)"
              class="item"
              :class="{'active': item.name === currentCat}">{{item.name}}</span>
          </div>
        </div>
        <div class="type-wrapper" v-show="currentIdx === 1">
          <div class="item"
            v-for="item in pubdates"
            :key="item.name"
            :class="{'active': type === item.type}" @click="selectType(item)"
          >
            <i class="icon icon-dui"></i>
            <span class="text">{{item.name}}</span>
          </div>
        </div>
        <div class="range-wrapper" v-show="currentIdx === 2">
          <div class="slider-wrap" @click="clickRate" ref="slideWrap">
            <div
              class="slide-dot"
              v-for="(num, index) in 11"
              :key="num"
              :style="{left: `${index * 10}%`}"
              :class="{'active': getCls(index)}"
              @click.stop="selectRate(index)">
                <span
                  class="text"
                  v-if="index === 5 || index === rate[0] || index === rate[1]"
                  :class="{'active': index === rate[0] || index === rate[1]}"
                  >
                    {{index}}分
                  </span>
              </div>
              <div class="slide-bar" :style="{left: `${rate[0] * 10}%`, right: `${(10 - rate[1]) * 10}%`}"></div>
          </div>
        </div>
      </div>
      <div class="mask" @click="close" v-show="currentIdx !== 99"></div>
    </div>
    <div class="movie-wrapper" style="color: red">
      <div class="item" v-for="movie in movies" :key="movie._id">
        <card :movie="movie" @select="selectItem"></card>
      </div>
      <div class="no-result" v-show="!movies.length">
        <img src="./loading.png" class="img" width="100" height="100">
        <p class="text">没有找到相关内容</p>
      </div>
    </div>
  </div>
</template>

<script>
import Card from 'components/card/card'
import { getSpecialMovies, getCats } from 'api/movie'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      cats: ['分类', '已上映', '评分'],
      currentIdx: 99,
      movies: [],
      type: 1,
      category: [],
      rate: [0, 10],
      currentCat: ''
    }
  },
  created () {
    this.pubdates = [
      {name: '全部', type: ''},
      {name: '已上映', type: 1},
      {name: '未上映', type: 0}
    ]
    this._getSpecialMovies()
    this._getCats()
  },
  computed: {
    params () {
      return {
        type: this.type,
        category: this.currentCat,
        rate: this.rate.join(',')
      }
    }
  },
  watch: {
    params (newVal) {
      this.close()
      this._getSpecialMovies()
      if (this.type === 1) {
        this.cats[2] = this.rate.join('-')
      } else {
        this.cats[2] = '评分'
      }
    }
  },
  methods: {
    selectTab (index) {
      if (this.currentIdx === 99 || this.currentIdx !== index) {
        this.currentIdx = index
      } else {
        this.close()
      }
    },
    close () {
      this.currentIdx = 99
    },
    getCls (index) {
      if (index >= this.rate[0] && index <= this.rate[1]) {
        return true
      }
    },
    selectItem (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    },
    selectType ({name, type}) {
      this.type = type
      this.cats[1] = name
    },
    selectCategory (name) {
      this.currentCat = name
      this.cats[0] = this.currentCat
    },
    selectRate (index) {
      if (index < this.rate[1]) {
        this.rate[0] = index
      } else {
        this.rate[1] = index
      }
      // 单独修改数组元素不会触发更新
      this.rate = this.rate.slice()
    },
    clickRate (e) {
      const length = this.$refs.slideWrap.offsetWidth
      // 22 是range-wrapper的padding
      const x = Math.round((e.clientX - 22) / length * 10)
      this.selectRate(x)
    },
    _getSpecialMovies () {
      getSpecialMovies(this.params).then(res => {
        if (res.code === ERR_OK) {
          this.movies = res.data.movies
        }
      })
    },
    _getCats () {
      getCats().then(res => {
        if (res.code === ERR_OK) {
          this.category = res.data
        }
      })
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="stylus" scoped>
  .category
    position fixed
    top 56px
    bottom 0
    width 100%
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
            color #1c2635
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
             overflow hidden
            .item
              float left
              padding 6px 12px
              margin: 0 12px 10px 0
              border-radius 4px
              font-size 13px
              color #777
              border 1px solid #ccc
              &.active
                border-color #faaf00
        .type-wrapper
          display flex
          flex-direction column
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
        .range-wrapper
          padding 22px
          .slider-wrap
            position relative
            height 3px
            background-color #ccc
            border-radius 3px
            vertical-align middle
            .slide-dot
              position absolute
              top -2px
              width 7px
              height 7px
              border-radius 50%
              background-color #ccc
              z-index 10
              &.active
                background-color #ffc46c
              .text
                position absolute
                top -15px
                left -50%
                display block
                width 30px
                color rgb(204, 204, 204)
                font-size 13px
                &.active
                  color #999
            .slide-bar
              height 3px
              left 0
              right 0
              background-color #ffc46c
              position absolute
      .mask
        position fixed
        top 96px
        bottom 0
        width 100%
        background rgba(0, 0, 0, .3)
    .movie-wrapper
        position fixed
        top 96px
        bottom 0
        width 100%
        overflow scroll
        .no-result
          position absolute
          top 40%
          left 50%
          transform translate(-50%,-50%)
          color #999
          text-align center
          .img
            filter grayscale(1)
</style>
