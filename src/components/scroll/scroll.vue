<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    pullUpLoad: {
      type: null,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        bounce: false,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      if (this.pullUpLoad) {
        this._initPullUpLoad()
      }
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    forceUpdate () {
      if (this.pullUpLoad) {
        this.scroll.finishPullUp()
        this.refresh()
      }
    },
    _initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.forceUpdate(true)
      }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  height 100%
  overflow hidden
</style>
