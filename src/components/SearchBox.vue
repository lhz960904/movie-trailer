<template>
  <div class="search-box">
    <i class="iconfont icon-search"/>
    <input
      v-model="query"
      type="text"
      class="search-input"
      :placeholder="placeholder"
      @input="handleInput"
    >
    <i v-show="query" class="iconfont icon-delete" @click="clear"/>
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
  methods: {
    handleInput () {
      this.$emit('input', this.query)
    },
    clear () {
      this.query = ''
      this.$emit('clear')
    },
    setQuery (str) {
      this.query = str
    }
  }
}
</script>

<style lang="stylus" scoped>
.search-box
  display flex
  align-items center
  padding 0 10px
  background #fff
  border 1px solid #e6e6e6
  border-radius 5px
  .iconfont
    font-size 17px
    color $gray
  .search-input
    margin 8px 20px 8px 5px
    font-size 13px
    border none
    outline none
    width calc(100% - 60px)
    color #333
</style>
