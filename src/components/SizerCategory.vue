<template>
  <div class="category-wrapper">
    <div class="list">
      <span
        v-for="item in list"
        :key="item._id"
        :class="{'active': cacheList.includes(item.name)}"
        class="item"
        @click="selectItem(item.name)"
      >
        {{ item.name }}
      </span>
    </div>
    <button class="confirm-btn" @click="confirm">完成</button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'categories',
    event: 'change'
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      list: [],
      cacheList: []
    }
  },
  created () {
    this.getCategories()
  },
  methods: {
    getCategories () {
      this.$axios.get('/api/category/get_cates').then(res => {
        if (res.code === 1001) {
          this.list = res.result.cates
        }
      })
    },
    resetCache () {
      this.cacheList = this.categories.slice()
    },
    selectItem (name) {
      const arr = this.cacheList.slice()
      const idx = arr.indexOf(name)
      if (idx > -1) {
        arr.splice(idx, 1)
      } else {
        arr.push(name)
      }
      this.cacheList = arr
    },
    confirm () {
      this.$emit('change', this.cacheList)
    }
  }
}
</script>

<style lang="stylus" scoped>
.category-wrapper
  padding 10px 25px
  .list
    display flex
    flex-wrap wrap
    .item
      padding 6px 12px
      margin: 0 10px 10px 0
      border-radius 5px
      font-size 13px
      color #777
      border 1px solid #ccc
      &.active
        border-color #faaf00
        background #faaf00
        color #fff
  .confirm-btn
    width 60px
    height 30px
    background #409eff
    color #fff
    border none
    outline none
    border-radius 3px
</style>
