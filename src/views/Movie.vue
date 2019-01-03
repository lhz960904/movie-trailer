<template>
  <Transition name="fade">
    <div class="movie">
      <div class="player-wrapper" @touchmove.prevent>
        <div ref="player" class="player" @click="back"/>
        <i class="iconfont icon-left"/>
      </div>
    <!-- <div ref="info" class="info-wrapper">
      <section v-if="movie.title" class="info">
        <div class="title">{{ movie.title }}</div>
        <div class="descript">{{ getDesc }}</div>
        <div class="switch-wrapper" @click="show">
          <span>简介</span>
          <i class="icon icon-right"/>
        </div>
      </section>
      <Spacing :height="10" bgcolor="#f9f9f9"/>
      <section v-if="relative_movies" class="relative-movies">
        <h1 class="text">相关推荐</h1>
        <div class="list">
          <div
            v-for="item in relative_movies"
            :key="item._id"
            class="item"
            @click="goToDetail(item._id)"
          >
            <img v-lazy="getUrl(item.posterKey)" width="56" height="70">
            <div class="desc">
              <p class="title">{{ item.title }}</p>
              <div v-if="item.rate !== 0" class="rate">
                <span>豆瓣评分: </span>
                <span class="text">{{ item.rate }}</span>
              </div>
              <p v-else class="pubdate">{{ scalPubdate(item.pubdate) }}</p>
              <p class="en_title">类型: {{ item.movieTypes.join('/') }}</p>
            </div>
          </div>
        </div>
      </section>
      <Loading :data="relative_movies"/>
    </div>
    <Transition name="layer">
      <div v-show="isShow" ref="layer" class="layer-wrapper">
        <div class="title">
          <span class="text">{{ movie.title }}</span>
          <i class="icon icon-down" @click="close"/>
        </div>
        <div v-if="movie.title" class="desc">
          <div class="descript">
            <div v-if="movie.rate !== 0" class="star item">
              <span class="name">评分: </span>
              <span class="text">{{ movie.rate }}</span>
            </div>
            <div v-else class="pubdate item">
              <span class="name">上映时间: </span>
              <span class="text">{{ pubdate }}</span>
            </div>
            <div class="author item">
              <span class="name">导演: </span>
              <span class="text">{{ movie.author }}</span>
            </div>
            <div class="cast item">
              <span class="name">影人: </span>
              <span class="text">{{ getCast }}</span>
            </div>
            <div class="category item">
              <span class="name">类型: </span>
              <span class="text">{{ movie.movieTypes.join('·') }}</span>
            </div>
          </div>
          <div class="casts">
            <div v-for="item in movie.casts" :key="item._id" class="cast">
              <img v-lazy="getUrl(item.avatar)" class="img">
              <h3 class="name">{{ item.name }}</h3>
            </div>
          </div>
          <div class="summary">
            <h1 class="title">简介</h1>
            <span class="text">{{ movie.summary }}</span>
          </div>
        </div>
      </div>
    </Transition> -->
    </div>
  </Transition>
</template>

<script>
import 'dplayer/dist/DPlayer.min.css'
import DPlayer from 'dplayer'

export default {
  name: 'Movie',
  data () {
    return {
      movie: {}
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      const { id } = this.$route.params
      this.$axios.get(`/api/movie/get_detail/${id}`).then(res => {
        if (res.code === 1001) {
          this.movie = res.result.movie
          this.relativeMovies = res.result.relativeMovies
          this.initPlayer()
        }
      })
    },
    back () {

    },
    initPlayer () {
      this.player = new DPlayer({
        container: this.$refs.player,
        video: {
          url: 'http://cdn.m.ihaoze.cn/' + this.movie.doubanId,
          pic: this.movie.cover
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.movie
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index: 20
  overflow hidden
  background #fff
.fade-leave-active
  transition all .5s
.fade-leave-to
  transform translateX(100%)
</style>
