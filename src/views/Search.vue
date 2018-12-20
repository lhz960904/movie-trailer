<template>
  <div class="search">
    <ScrollView :data="list">
      <div class="input-wrap">
        <SearchBox ref="searchBox" @input="search" @clear="clear"/>
      </div>
      <div class="hotkey-wrap">
        <h1 class="title">热门搜索</h1>
        <div class="list">
          <span
            v-for="item in hotKeys"
            :key="item._id"
            class="item"
            @click="addQuery(item.name)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <Spacing bg-color="#f6f6f6" :height="10"/>
      <div class="history-wrap">
        <div class="title">
          <span>搜索历史</span>
          <!-- @click="showConfirm" -->
          <i class="iconfont icon-clear"/>
        </div>
        <div v-for="item in searchHistory" :key="item" class="item">
          <i class="iconfont icon-history"/>
          <span class="text" @click="addQuery(item)">{{ item }}</span>
          <i class="iconfont icon-del" @click="deleteSearchHistory(item)"/>
        </div>
      </div>
      <div class="result-wrap"/>
    </ScrollView>
  </div>
</template>

<script>
import SearchBox from 'components/SearchBox'
import Spacing from 'components/Spacing'
import ScrollView from 'components/ScrollView'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    SearchBox,
    Spacing,
    ScrollView
  },
  data () {
    return {
      hotKeys: [],
      movieList: [],
      isShow: false
    }
  },
  computed: {
    list () {
      return this.hotKeys.concat(this.searchHistory)
    },
    ...mapState([
      'searchHistory'
    ])
  },
  created () {
    this.getHotKeys()
  },
  methods: {
    getHotKeys () {
      this.$axios.get('/api/movie/get_hot_search').then(res => {
        if (res.code === 1001) {
          this.hotKeys = res.result.keywords
        }
      })
    },
    search (query) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      if (!query.trim()) return

      const params = { keyword: query }
      this.timer = setTimeout(() => {
        this.saveSearchHistory(query)
        this.$axios.get('api/movie/search', { params }).then(res => {
          console.log(res)
        })
      }, 500)
    },
    clear () {
      this.movieList = []
      this.isShow = false
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
      this.search(query)
    },
    ...mapMutations([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.search
  height 100%
  .input-wrap
    background #f5f5f5
    padding: 10px 15px
  .hotkey-wrap
    padding  0 0 8px 15px
    background-color #fff
    .title
      padding 15px 0
      font-size 15px
      color #666
    .list
      display flex
      flex-wrap wrap
      overflow hidden
      .item
        padding 6px 12px
        margin: 0 12px 12px 0
        border-radius 4px
        font-size 13px
        color #333
        background-color #f5f5f5
  .history-wrap
    .title
      padding 15px 0
      font-size 15px
      color #666
      .icon-clear
        float right
        font-size 15px
    margin-top 10px
    padding 0 15px 8px 15px
    .item
      height 40px
      line-height 40px
      display flex
      font-size 15px
      color #333
      border-bottom 1px solid #e5e5e5
      .icon
        font-size 15px
        color #999
      .icon-history
        margin-right 10px
      .text
        flex 1
</style>
