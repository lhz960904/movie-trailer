<template>
  <div class="detail" ref="detail">
    <div class="player-wrapper" @touchmove.prevent>
      <div class="player" ref="player"></div>
      <i class="icon icon-left" @click="back"></i>
      <section class="info"  v-if="movie.title">
      <div class="title">{{movie.title}}</div>
      <div class="descript">{{getDesc}}</div>
      <div class="switch-wrapper" @click="show">
        <span>简介</span>
        <i class="icon icon-right"></i>
      </div>
      </section>
    </div>
    <spacing :height="10"></spacing>
    <section class="relative-movies" v-if="relative_movies">
      <h1>相关推荐</h1>
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
    <transition name="layer">
      <div class="layer-wrapper" ref="layer" v-show="isShow">
        <div class="title">
          <span>{{movie.title}}</span>
          <i class="icon icon-down" @click="close"></i>
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
import 'DPlayer/dist/DPlayer.min.css'
import DPlayer from 'DPlayer'
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
    getDesc () {
      const length = this.movie.pubdate.length
      const duration = this.movie.duration || moment(this.movie.pubdate[length - 1].date).format('DD-MM')
      const rate = this.movie.rate ? `${this.movie.rate}分` : '即将上映'
      return `${rate}  · ${this.movie.movieTypes.join(' ')} · ${duration}`
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    show () {
      this.isShow = true
      this.$refs.detail.style.overflow = 'hidden'
    },
    close () {
      this.isShow = false
      this.$refs.detail.style.overflow = 'scroll'
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
    width 100%
    background #f9f9f9
    z-index: 10
    overflow scroll
    .player-wrapper
      position relative
      .icon-left
        position absolute
        top 15px
        left 15px
        font-size 25px
        color #fff
        font-weight bold
    section
      position relative
      padding 15px
      min-height 70px
      border-bottom 1px solid #eee
      background #fff
    .info
      height 70px
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
        span
          font-size 15px
        .icon
          font-weight bold
          vertical-align text-bottom
    .relative-movies
      h1
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
            white-space nowrap
            .title
              overflow hidden
              text-overflow ellipsis
            .rate
              .text
                font-size 15px
                font-weight 700
                color #faaf00
    .layer-wrapper
      position fixed
      left 0
      right 0
      bottom 0
      background #fff
      overflow hidden
      .title
        padding 5px 10px
        height 20px
        line-height 20px
        font-size 14px
        .icon-down
          float right
  .layer-enter-active, .layer-leave-active
    transition all .3s
  .layer-enter, .layer-leave-to
    transform translateY(100%)
</style>
