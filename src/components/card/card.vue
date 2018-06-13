<template>
  <div class="card" @click="$emit('select', movie._id)" :class="{'rank-active': rank}">
    <p class="text" v-if="rank" :class="'rank-' + index">{{index}}</p>
    <div class="image">
      <img v-lazy="getImageUrl" :alt="movie.title" width="100%">
    </div>
    <div class="descript">
      <h1 class="title">{{movie.title}}</h1>
      <div class="rate" v-if="movie.rate !== 0">
        <span>观众评</span>
        <span class="text">{{movie.rate}}</span>
      </div>
      <p class="pubdate" v-else>上映时间: {{pubdate}}</p>
      <p class="cast">主演:{{casts}} </p>
      <p class="duration">时长: {{movie.duration || '未知'}}</p>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    movie: Object,
    index: Number,
    rank: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    casts () {
      let str = ''
      this.movie.casts.forEach(item => {
        str += ',' + item.name
      })
      return str.substr(1)
    },
    pubdate () {
      const pubdate = this.movie.pubdate
      const date = pubdate[pubdate.length - 1].date
      return dayjs(date).format('YYYY-MM-DD')
    },
    getImageUrl () {
      return `http://movies.kyriel.cn/${this.movie.posterKey}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card
    display flex
    padding 10px 20px
    height 140px
    align-items center
    box-sizing border-box
    &.rank-active
      padding-left 0
    .text
      width 30px
      height 30px
      margin 0 10px
      line-height 30px
      text-align center
      background-color #f7f7f7
      color #999
      font-weight 700
      &.rank-1
        background #ef4238
        color #fff
      &.rank-2
        background #ffb400
        color #fff
      &.rank-3
        background #FFB47A
        color #fff
    .image
      width 80px
    .descript
      flex 1
      margin-left 10px
      display flex
      flex-direction column
      box-sizing border-box
      line-height: 30px
      font-size 13px
      color #666
      border-bottom 1px solid #e6e6e6
      overflow hidden
      white-space nowrap
      .title
        flex 1
        color #333
        font-size 17px
        font-weight 700
        overflow hidden
        text-overflow ellipsis
      .rate
        flex 1
        .text
          font-size 15px
          font-weight 700
          color #faaf00
      .cast
        flex 1
        overflow hidden
        text-overflow ellipsis
      .duration
        flex 1
</style>
