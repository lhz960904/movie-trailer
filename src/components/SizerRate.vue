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
        data-idx="1"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="touchEnd"
      />
      <div
        ref="barBtn2"
        class="bar-btn"
        data-idx="2"
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
  model: {
    prop: 'rate',
    event: 'change'
  },
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
  methods: {
    resetCache () {
      if (!this.dots) {
        this.generateDots()
      }

      this.cacheRate = this.rate

      const [start, end] = this.cacheRate
      this.$refs.barBtn1.style.left = this.dots[start] + 'px'
      this.$refs.barBtn2.style.left = this.dots[end] + 'px'

      this.setStyle()
    },
    // 生成rateBar上面的阈值点，起始是0，末尾是总长度。
    generateDots () {
      this.dots = [0]
      this.width = this.$refs.bar.getBoundingClientRect().width
      for (let i = 1; i < 10; i++) {
        const dot = document.createElement('div')
        dot.className = 'bar-dot'
        const left = i * 0.1 * this.width
        // console.log(parseInt(left) - 7)
        this.dots.push(parseInt(left) - 7)
        dot.style.left = parseInt(left) + 'px'
        this.$refs.bar.appendChild(dot)
      }
      // 减去btn的宽度
      this.dots.push(this.width - 7)
    },
    // 设置mask黄色区块的长度和偏移量
    setStyle () {
      const x1 = parseInt(this.$refs.barBtn1.style.left)
      const x2 = parseInt(this.$refs.barBtn2.style.left)
      const position = [x1, x2].sort((a, b) => a - b)
      this.style = {
        width: (position[1] - position[0]) + 'px',
        left: position[0] + 'px'
      }
    },
    touchStart (e) {
      this.touch.initiated = true
      e.target.style.transform = 'scale(1.3)'
    },
    touchMove (e) {
      if (!this.touch.initiated) return
      const otherIdx = this.dots.indexOf(parseInt(e.target.style.left))
      // console.log(otherIdx)
      const otherRate = this.cacheRate[1 - this.cacheRate.indexOf(otherIdx)]
      const offSetWidth = Math.min(Math.max(0, e.touches[0].pageX - 30), this.width)
      const deltaArr = this.dots.map(it => Math.abs(parseInt(it - offSetWidth)))
      const min = Math.min(...deltaArr)
      const minIndx = deltaArr.findIndex(it => it === min)
      // console.log(this.dots)
      // console.log(this.dots[minIndx])
      e.target.style.left = this.dots[minIndx] + 'px'

      this.cacheRate = [otherRate, minIndx].sort((a, b) => a - b)
      // console.log(this.cacheRate)

      this.setStyle()
    },
    touchEnd (e) {
      this.touch.initiated = false
      e.target.style.transform = 'scale(1.0)'
    },
    confirm () {
      // console.log(this.cacheRate)
      this.$emit('change', this.cacheRate)
    }
  }
}
</script>

<style lang="stylus" scoped>
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
<style lang="stylus">
.bar-dot
  position absolute
  width 5px
  height 5px
  border-radius 100%
  background #fff
</style>
