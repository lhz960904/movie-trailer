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
        <div class="" v-show="currentIdx === 0">
          <span>分类</span>
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
        <div class="" v-show="currentIdx === 2">
          <span>评分</span>
        </div>
      </div>
      <div class="mask" @click="close" v-show="currentIdx !== 99"></div>
    </div>
    <div class="movie-wrapper" style="color: red">
      <div class="item" v-for="movie in movies" :key="movie._id">
        <card :movie="movie" @select="selectItem"></card>
      </div>
    </div>
  </div>
</template>

<script>
import { getSpecialMovies } from 'api/movie'
import { ERR_OK } from 'api/config'
import Card from '@/components/card/card'
export default {
  data () {
    return {
      cats: ['分类', '已上映', '评分'],
      currentIdx: 99,
      movies: [],
      type: 1,
      category: '',
      rate: ''
    }
  },
  created () {
    this.pubdates = [
      {name: '全部', type: ''},
      {name: '已上映', type: 1},
      {name: '未上映', type: 0}
    ]
    this._getSpecialMovies()
  },
  methods: {
    selectTab (index) {
      this.currentIdx = index
    },
    close () {
      this.currentIdx = 99
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
      this.currentIdx = 99
      this.cats[1] = name
      this._getSpecialMovies()
    },
    _getSpecialMovies () {
      getSpecialMovies({
        type: this.type
      }).then(res => {
        if (res.code === ERR_OK) {
          this.movies = res.data.movies
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
    position absolute
    top 0
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
        min-height 130px
        background #fff
        z-index 10
        .type-wrapper
          display flex
          flex-direction column
          height 120px
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
    .movie-wrapper
        position fixed
        top 96px
        bottom 0
        width 100%
        overflow scroll
</style>
