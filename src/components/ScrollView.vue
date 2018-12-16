<template>
  <div
    ref="wrapper"
    class="scroll-wrapper"
  >
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    pullUpLoad: {
      type: [Boolean, Object],
      default: false
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.forceUpdate(true)
      }, 20)
    }
  },
  mounted () {
    setTimeout(() => {
      this.initScroll()
    }, 20)
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        bounce: false,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      if (this.pullUpLoad) {
        this.initPullUpLoad()
      }
    },
    initPullUpLoad () {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    forceUpdate () {
      if (this.pullUpLoad) {
        this.scroll.finishPullUp()
        this.refresh()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  height 100%
  overflow hidden
</style>
