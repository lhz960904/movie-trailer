<template>
  <div class="rate-wrapper">
    <div
      ref="bar"
      class="bar"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <!--  -->
      <div class="mask" :style="style"/>
      <div class="bar-btn"/>
    </div>
    <button class="confirm-btn" @click="confirm">完成</button>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      cacheRate: [],
      style: {}
    }
  },
  mounted () {
    // const bar = this.$refs.bar
    // console.log(bar.getBoundingClientRect())
  },
  methods: {
    resetCache () {
      if (!this.dots) {
        this.generateDots()
      }
      this.cacheRate = this.rate
      const [start, end] = this.cacheRate
      const styleWidth = (end - start) * this.width / 10
      console.log(start, end)
      console.log(styleWidth)
      this.style = {
        width: styleWidth + 'px',
        left: this.dots[start - 1] + 'px'
      }
    },
    generateDots () {
      this.dots = []
      this.width = this.$refs.bar.getBoundingClientRect().width
      for (let i = 1; i < 10; i++) {
        const dot = document.createElement('div')
        dot.className = 'bar-dot'
        const left = i * 0.1 * this.width
        this.dots.push(left)
        dot.style.left = left + 'px'
        this.$refs.bar.appendChild(dot)
      }
    },
    touchStart (e) {
      console.log(e.touches[0].pageX)
    },
    touchMove (e) {
      console.log(e.touches[0].pageX)
    },
    touchEnd () {
      console.log(this.$refs.bar.getBoundingClientRect())
    },
    confirm () {
      this.$emit('change', this.cacheRate)
    }
  }
}
</script>

<style lang="stylus">
.rate-wrapper
  display flex
  flex-direction column
  justify-content center
  height 80px
  padding 0 20px
  .bar
    position relative
    width 100%
    height 5px
    background-color #ccc
    border-radius 3px
    .bar-dot
      position absolute
      width 5px
      height 5px
      border-radius 100%
      background #fff
    .mask
      position absolute
      height 5px
      background #ffc46c
      border-radius 3px
.confirm-btn
  width 60px
  height 30px
  margin-top 10px
  background #409eff
  color #fff
  border none
  outline none
  border-radius 3px
</style>
