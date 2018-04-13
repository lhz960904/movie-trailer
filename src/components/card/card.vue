<template>
  <div class="card" @click="$emit('select', movie._id)">
    <div class="image">
      <img v-lazy="`http://movies.kyriel.cn/${movie.posterKey}`" :alt="movie.title" width="100%">
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
import moment from 'moment'
export default {
  props: {
    movie: Object
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
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .card
    display flex
    padding 10px 20px
    height 140px
    box-sizing border-box
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
      .title
        flex 1
        color #333
        font-size 17px
        font-weight 700
        overflow hidden
      .rate
        flex 1
        .text
          font-size 15px
          font-weight 700
          color #faaf00
      .cast
        flex 1
        overflow hidden
        text-overflow ellipsis4
      .duration
        flex 1
</style>
