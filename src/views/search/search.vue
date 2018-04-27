<template>
  <div class="search-page">
    <div class="search-wrapper">
      <search-box @input="search" ref="searchBox"></search-box>
    </div>
    <div class="search-hotkey">
      <h1 class="title">热门搜索</h1>
      <div class="list">
        <span v-for="item in hotKey" :key="item" @click="addQuery(item)" class="movie">{{item}}</span>
      </div>
    </div>
    <div class="search-history" v-show="searchHistory.length">
      <div class="title">
        <span>搜索历史</span>
        <i class="icon icon-delete" @click="showConfirm"></i>
      </div>
      <div v-for="item in searchHistory" :key="item" class="item">
        <i class="icon icon-history"></i>
        <span class="text" @click="addQuery(item)">{{item}}</span>
        <i class="icon icon-del" @click="deleteSearchHistory(item)"></i>
      </div>
    </div>
    <div class="search-result" v-show="result.length || isShow">
      <template v-for="movie in result">
        <card :movie="movie" :key="movie._id" @select="selectItem"></card>
      </template>
      <div class="no-result" v-show="!result.length">
        <img src="./loading.png" class="img" width="100" height="100">
        <p class="text">没有找到相关内容</p>
      </div>
    </div>
    <confirm ref="confirm" text="是否删除所有搜索历史" @confirm="clearSearchHistory"></confirm>
  </div>
</template>

<script>
import searchBox from '@/components/searchBox/searchBox'
import Confirm from '@/components/confirm/confirm'
import Card from '@/components/card/card'
import { searchMovie } from '@/api/movie'
import { ERR_OK } from '@/api/config'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      hotKey: [],
      result: [],
      isShow: false
    }
  },
  created () {
    this._getHotKey()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.addQuery('')
      vm.hideConfirm()
    })
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    addQuery (query) {
      this.$refs.searchBox.setQuery(query)
    },
    search (query) {
      if (!query) {
        this.result = []
        this.isShow = false
        return
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.saveSearchHistory(query)
        searchMovie(query).then((res) => {
          if (res.code === ERR_OK) {
            this.result = res.data.movies
            this.isShow = true
          }
        })
      }, 500)
    },
    selectItem (id) {
      this.$router.push({
        name: 'detail',
        params: {id}
      })
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    hideConfirm () {
      this.$refs.confirm.hide()
    },
    _getHotKey () {
      // todo: 获取热门搜索关键词
      this.hotKey = ['复仇者联盟3：无限战争', '后来的我们', '毒液：致命守护者', '唐人街探案2', '惊奇队长', '复仇者联盟4']
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  },
  components: {
    searchBox,
    Card,
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
  .search-page
    position fixed
    top 56px
    bottom 0
    width 100%
    background #f9f9f9
    overflow scroll
    .search-wrapper
      background #f5f5f5
      padding: 10px 15px
    .search-hotkey, .search-history
      padding  0 0 8px 15px
      background-color #fff
      .title
        padding 15px 0
        font-size 15px
        color #666
        .icon-delete
          float right
          font-size 15px
      .list
        overflow hidden
        .movie
          float left
          padding 6px 12px
          margin: 0 12px 12px 0
          border-radius 4px
          font-size 13px
          color #333
          background-color #f5f5f5
    .search-history
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
    .search-result
      position fixed
      top 111px
      bottom 0
      width 100%
      overflow scroll
      background #fff
      .no-result
        position absolute
        top 40%
        left 50%
        transform translate(-50%,-50%)
        color #999
        text-align center
        .img
          filter grayscale(1)
</style>
