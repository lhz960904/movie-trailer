<template>
  <div class="card" :class="{ 'rank-card': isRank }" @click="$emit('select', movie._id)">
    <p v-if="isRank" class="text" :class="'rank-' + sort">{{ sort }}</p>
    <div class="image">
      <img v-lazy="movie.poster" width="100%" height="100%">
    </div>
    <div class="descript">
      <h1 class="title">{{ movie.title }}</h1>
      <p v-if="movie.isPlay === 1" class="rate">
        观众评:
        <span :class="{ 'text': movie.rate > 0 }">{{ movie.rate || '暂无' }}</span>
      </p>
      <p v-else class="pubdate">上映时间: {{ movie.pubdate | removeZh }}</p>
      <p class="cast">主演: {{ casts }}</p>
      <p class="duration">时长: {{ movie.duration || '未知' }}</p>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    removeZh (str) {
      return str.replace('(中国大陆)', '')
    }
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    sort: {
      type: Number,
      default: -1
    }
  },
  computed: {
    casts () {
      return this.movie.casts.map(it => it.name).join(',')
    },
    isRank () {
      return this.sort !== -1
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
    &.rank-card
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
      height 120px
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
