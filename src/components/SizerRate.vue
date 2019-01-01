<template>
  <div class="rate-wrapper">
    <div
      ref="bar"
      class="bar"
    >
      <div class="mask" :style="style"/>
      <div
        ref="barBtn1"
        class="bar-btn"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"
      />
      <div
        ref="barBtn2"
        class="bar-btn"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"
      />
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
  created () {
    this.touch = {}
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

      this.$refs.barBtn1.style.left = this.dots[start - 1] + 'px'
      this.$refs.barBtn2.style.left = this.dots[start - 1] + styleWidth + 'px'

      this.setStyle()
    },
    generateDots () {
      this.dots = [0]
      this.width = this.$refs.bar.getBoundingClientRect().width
      for (let i = 1; i < 10; i++) {
        const dot = document.createElement('div')
        dot.className = 'bar-dot'
        const left = i * 0.1 * this.width
        this.dots.push(left)
        dot.style.left = left + 'px'
        this.$refs.bar.appendChild(dot)
      }
      this.dots.push(this.width)
    },
    setStyle () {
      const x1 = parseFloat(this.$refs.barBtn1.style.left)
      const x2 = parseFloat(this.$refs.barBtn2.style.left)
      const position = [x1, x2].sort((a, b) => a - b)
      this.style = {
        width: (position[1] - position[0]) + 'px',
        left: position[0] + 'px'
      }
    },
    touchStart (e) {
      this.touch.initiated = true
      this.touch.startX = parseFloat(e.target.style.left)
      this.touch.left = parseFloat(e.target.style.left)
      e.target.style.transform = 'scale(1.2)'
      // console.log(this.touch)
    },
    touchMove (e) {
      if (!this.touch.initiated) return
      const deltaX = e.touches[0].pageX - this.touch.startX - 30
      const offSetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.width - 14)

      const deltaArr = this.dots.map(it => Math.abs(parseFloat(it - offSetWidth)))
      const min = Math.min(...deltaArr)
      const minIndx = deltaArr.findIndex(it => it === min)

      // const minIndex = this.dots.reduce((res, it, index) => {
      //   const delta1 = Math.abs(parseInt(res - offSetWidth))
      //   const delta2 = Math.abs(parseInt(it - offSetWidth))
      //   return delta1 > delta2 ? index : res
      // })
      // console.log(minIndx)
      e.target.style.left = this.dots[minIndx] + 'px'
      this.setStyle()
      // console.log(e.touches[0].pageX)
    },
    touchEnd (e) {
      this.touch.initiated = false
      e.target.style.transform = 'scale(1.0)'
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
    .bar-btn
      position absolute
      left 0
      top -5px
      width 10px
      height 10px
      border 2px solid #ffc46c
      background-color #fff
      border-radius 50%
      z-index 10
    .mask
      position absolute
      height 5px
      background #ffc46c
      border-radius 3px
.confirm-btn
  width 60px
  height 30px
  margin-top 20px
  background #409eff
  color #fff
  border none
  outline none
  border-radius 3px
</style>
