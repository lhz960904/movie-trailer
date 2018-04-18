<template>
  <div class="detail">
    <div class="player-wrapper">
      <div class="player" ref="player"></div>
      <i class="icon icon-left" @click="back"></i>
    </div>
    <section class="info"  v-if="movie.title">
      <div class="title">{{movie.title}}</div>
      <div class="descript">{{getDesc}}</div>
      <div class="switch-wrapper" @click="getMore">
        <span>简介</span>
        <i class="icon icon-right"></i>
      </div>
    </section>
    <spacing :height="10"></spacing>
    <section class="relative-movies">
      <h1>相关推荐</h1>
      <div class="list">
        <div class="item" v-for="item in 6" :key="item.name">
          <img src="http://movies.kyriel.cn/Fb1HYoBeqp2fCHgf~KtSl.jpg" width="56" height="100%">
          <div class="text">
            <span class="title">{{movie.title}}</span>
            <span class="en_title">{{movie.en_title}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Spacing from '@/components/spacing/spacing'
import moment from 'moment'
import { getDetail } from '@/api/movie'
import { ERR_OK } from '@/api/config'
import 'DPlayer/dist/DPlayer.min.css'
import DPlayer from 'DPlayer'
export default {
  data () {
    return {
      movie: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getDetail()
    })
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
    getMore () {
      console.log('more')
    },
    _getDetail () {
      getDetail(this.$route.params.id).then(res => {
        if (res.code === ERR_OK) {
          this.movie = res.data.movie
          this._initPlayer()
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
      this.$refs.player.style.height = Math.round(width * 0.56) + 'px'
    }
  },
  components: {
    Spacing
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
      .icon
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
      .descript
        margin-top 20px
        color #777
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
          margin-bottom 10px
</style>
