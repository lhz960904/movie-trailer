<template>
  <div class="detail" ref="detail">
    <div class="player-wrapper" @touchmove.prevent>
      <div class="player" ref="player"></div>
      <i class="icon icon-left" @click="back"></i>
    </div>
    <div class="info-wrapper" ref="info">
      <section class="info"  v-if="movie.title">
        <div class="title">{{movie.title}}</div>
        <div class="descript">{{getDesc}}</div>
        <div class="switch-wrapper" @click="show">
          <span>简介</span>
          <i class="icon icon-right"></i>
        </div>
      </section>
      <spacing :height="10" bgcolor="#f9f9f9"></spacing>
      <section class="relative-movies" v-if="relative_movies">
        <h1 class="text">相关推荐</h1>
        <div class="list">
          <div class="item" v-for="item in relative_movies" :key="item._id" @click="goToDetail(item._id)">
            <img v-lazy="getUrl(item.posterKey)" width="56" height="70">
            <div class="desc">
              <p class="title">{{item.title}}</p>
              <div class="rate" v-if="item.rate !== 0">
                <span>豆瓣评分: </span>
                <span class="text">{{item.rate}}</span>
              </div>
              <p class="pubdate" v-else>{{scalPubdate(item.pubdate)}}</p>
              <p class="en_title">类型: {{item.movieTypes.join('/')}}</p>
            </div>
          </div>
        </div>
      </section>
      <loading :data="relative_movies"></loading>
    </div>
    <transition name="layer">
      <div class="layer-wrapper" ref="layer" v-show="isShow">
        <div class="title">
          <span class="text">{{movie.title}}</span>
          <i class="icon icon-down" @click="close"></i>
        </div>
        <div class="desc" v-if="movie.title">
          <div class="descript">
            <div class="star item" v-if="movie.rate !== 0">
              <span class="name">评分: </span>
              <span class="text">{{movie.rate}}</span>
            </div>
            <div class="pubdate item" v-else>
              <span class="name">上映时间: </span>
              <span class="text">{{pubdate}}</span>
            </div>
            <div class="author item">
              <span class="name">导演: </span>
              <span class="text">{{movie.author}}</span>
            </div>
            <div class="cast item">
              <span class="name">影人: </span>
              <span class="text">{{getCast}}</span>
            </div>
            <div class="category item">
              <span class="name">类型: </span>
              <span class="text">{{movie.movieTypes.join('·')}}</span>
            </div>
          </div>
          <div class="casts">
            <div class="cast" v-for="item in movie.casts" :key="item._id">
              <img v-lazy="getUrl(item.avatar)" class="img">
              <h3 class="name">{{item.name}}</h3>
            </div>
          </div>
          <div class="summary">
            <h1 class="title">简介</h1>
            <span class="text">{{movie.summary}}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Spacing from '@/components/spacing/spacing'
import Loading from '@/components/loading/loading'
import moment from 'moment'
import { getDetail, getRelative } from '@/api/movie'
import { ERR_OK } from '@/api/config'
export default {
  data () {
    return {
      movie: {},
      relative_movies: [],
      isShow: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getDetail()
      vm._getRelative()
    })
  },
  beforeRouteUpdate  (to, from, next) {
    next()
    this._getDetail()
    this._getRelative()
  },
  mounted () {
    this._scaleHeight()
  },
  computed: {
    imgUrl () {
      return `http://movies.kyriel.cn/${this.movie.posterKey}`
    },
    pubdate () {
      const pubdate = this.movie.pubdate
      const date = pubdate[pubdate.length - 1].date
      return moment(date).format('YYYY-MM-DD')
    },
    getDesc () {
      const length = this.movie.pubdate.length
      const duration = this.movie.duration || moment(this.movie.pubdate[length - 1].date).format('DD-MM')
      const rate = this.movie.rate ? `${this.movie.rate}分` : '即将上映'
      return `${rate}  · ${this.movie.movieTypes.join(' ')} · ${duration}`
    },
    getCast () {
      const casts = this.movie.casts
      let str = ''
      casts.forEach((item, index) => {
        str += `/${item.name}`
      })
      return str.substr(1)
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    show () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    },
    getUrl (key) {
      return `http://movies.kyriel.cn/${key}`
    },
    scalPubdate (pubdate) {
      const date = pubdate[pubdate.length - 1].date
      return moment(date).format('YYYY-MM-DD')
    },
    goToDetail (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    },
    _getDetail () {
      getDetail(this.$route.params.id).then(res => {
        if (res.code === ERR_OK) {
          this.movie = res.data.movie
          this._initPlayer()
        } else {
          this.$router.push('/movie')
        }
      })
    },
    _getRelative () {
      getRelative(this.$route.params.id).then(res => {
        if (res.code === ERR_OK) {
          this.relative_movies = res.data.movies
        } else {
          this.$router.push('/movie')
        }
      })
    },
    _initPlayer () {
      const prefix = 'http://movies.kyriel.cn/'
      // eslint-disable-next-line
      this.player = new DPlayer({
        container: this.$refs.player,
        video: {
          url: prefix + this.movie.videoKey,
          pic: prefix + this.movie.coverKey
        }
      })
    },
    _scaleHeight () {
      const width = window.innerWidth
      const height = Math.round(width * 0.56) + 'px'
      this.$refs.player.style.height = height
      this.$refs.info.style.top = height
      this.$refs.layer.style.top = height
    }
  },
  components: {
    Spacing,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  .detail
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    z-index: 10
    overflow hidden
    background #fff
    .player-wrapper
      position fixed
      z-index 10
      .icon-left
        position absolute
        top 15px
        left 15px
        font-size 25px
        color #fff
        font-weight bold
    .info-wrapper
      position fixed
      bottom 0
      width 100%
      overflow scroll
    section
      position relative
      padding 15px
      min-height 70px
      border-bottom 1px solid #eee
      background #fff
    .info
      .title
        font-size 20px
        font-weight bold
        padding-right 100px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .descript
        margin-top 20px
        color #777
        font-size 15px
      .switch-wrapper
        position absolute
        top 15px
        right 15px
        color #777
        .text
          font-size 15px
        .icon
          font-weight bold
          vertical-align text-bottom
          line-height 20px
    .relative-movies
      .text
        font-weight bold
        font-size 15px
      .list
        margin-top 15px
        .item
          display flex
          flex-direction row
          margin-bottom 5px
          padding-bottom 5px
          line-height 23px
          border-bottom: 1px solid #eee
          .desc
            flex 1
            margin-left 10px
            overflow hidden
            .title
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .rate
              .text
                color #faaf00
    .layer-wrapper
      position fixed
      bottom 0
      width 100%
      background #fff
      overflow hidden
      .title
        padding 5px 10px
        height 20px
        line-height 20px
        font-size 15px
        font-weight bold
        .icon-down
          float right
      .desc
        position absolute
        top 30px
        bottom 0
        left 0
        right 0
        padding 0 10px
        overflow scroll
        .descript
          margin 10px 0
          font-size 13px
          border-bottom 1px solid #eee
          .item
            display flex
            margin-bottom 10px
            line-height 20px
            .name
              margin-right 8px
              white-space nowrap
        .casts
          height 100px
          font-size 0
          white-space nowrap
          overflow-x scroll
          border-bottom 1px solid #eee
          .cast
            width 70px
            overflow hidden
            margin-right 8px
            display inline-block
            font-size 13px
            text-align center
            .img
              width 60px
              height 60px
              border-radius 50%
            .name
              overflow hidden
              margin-top 10px
              text-overflow ellipsis
        .summary
          .title
            font-size 14px
            font-weight bold
            margin 15px 0
            padding 0
          .text
            font-size 12px
            line-height 20px
  .layer-enter-active, .layer-leave-active
    transition all .3s
  .layer-enter, .layer-leave-to
    transform translateY(100%)
</style>
