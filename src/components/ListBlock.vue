<template>
  <section class="list-block">
    <div class="info" @click="$emit('more')">
      <h1 class="title">{{ title }}</h1>
      <i class="iconfont icon-right"/>
    </div>
    <div v-if="movies.length" class="list">
      <div
        v-for="item in movies"
        :key="item._id"
        class="item"
        @click="$emit('select', item._id)"
      >
        <div class="image">
          <img v-lazy="item.poster" width="100%" height="100%">
          <em v-if="item.isPlay === 1" class="rate">
            {{ item.rate | toFixed }}
          </em>
        </div>
        <p class="title">{{ item.title }}</p>
      </div>
      <div v-for="idx in (8 - movies.length)" :key="idx" class="item placeholder"/>
    </div>
    <div v-else class="loading-wrap">
      <Loading/>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ListBlock',

  filters: {
    toFixed (num) {
      return num.toFixed(1)
    }
  },
  props: {
    movies: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-block
  padding 15px
  min-height 100px
  text-align center
  .info
    display flex
    justify-content space-between
    margin-bottom 15px
    font-weight bold
    font-size 20px
    .iconfont
      font-size 20px
  .list
    display flex
    justify-content space-between
    flex-wrap wrap
    .item
      width 24%
      .image
        position relative
        height: 80%;
        .rate
          position absolute
          right 5px
          bottom 2px
          color #ffb400
          font-weight bold
          font-style italic
      .title
        padding: 10px 0
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-size 14px
  .loading-wrap
    display flex
    align-items center
    height 200px
</style>
