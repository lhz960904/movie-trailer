<template>
  <div class="search">
    <img src="./search.png" class="search-icon icon">
    <input type="text" class="search-input" :placeholder="placeholder" v-model="query">
    <img v-show="query" src="./del.png" class="del-icon icon" @click="clear">
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索电影'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.$watch('query', (newQuery) => {
      this.$emit('input', newQuery)
    })
  },
  methods: {
    clear () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    padding 0 10px
    background #fff
    border 1px solid #e6e6e6
    border-radius 5px
    .icon
      width 15px
      height 15px
      vertical-align middle
    .search-input
      margin 8px 10px 8px 5px
      font-size 13px
      border none
      outline none
      width calc(100% - 60px)
      color #333
</style>
