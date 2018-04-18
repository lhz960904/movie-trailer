<template>
  <section class="block">
    <div class="header" @click="$emit('more')">
      <h1 class="title">{{title}}({{count}}部)</h1>
      <div class="more">
        <i class="icon icon-right"></i>
      </div>
    </div>
    <div class="list" v-show="movies">
      <div class="movie" v-for="item in movies" :key="item._id" @click="$emit('select', item._id)">
        <div class="image">
          <img v-lazy="getImageUrl(item.posterKey)" :alt="item.title" width="100%" height="100%">
          <em class="rate" v-if="item.rate !== 0">{{item.rate}}</em>
        </div>
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <loading :data="movies"></loading>
  </section>
</template>

<script>
import Loading from '@/components/loading/loading'
export default {
  props: {
    movies: Array,
    title: String,
    count: Number
  },
  methods: {
    getImageUrl (value) {
      return `http://movies.kyriel.cn/${value}`
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  .block
    position relative
    padding 15px
    min-height 100px
    text-align center
    .header
      overflow hidden
      margin-bottom 15px
      height 20px
      font-weight bold
      .title
        float left
        font-size 20px
      .more
        position relative
        height 20px
        .icon
          position absolute
          right -4px
          font-size 20px
    .list
      display flex
      flex-direction row
      flex-wrap wrap
      .movie
        width 25%
        padding-right 5px
        box-sizing border-box
        margin-bottom 10px
        &:nth-of-type(4n)
          padding-right 0
        .title
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          margin-top 10px
        .image
          position relative
          width 100%
          height 80%
        .rate
          position absolute
          right 5px
          bottom 2px
          color #ffb400
          font-style italic
</style>
