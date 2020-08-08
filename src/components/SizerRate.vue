<template>
  <div class="sizer-rate">
    <div ref="bar" class="bar">
      <div class="mask" :style="state.style" />
      <div ref="barBtn1" class="bar-btn" />
      <div ref="barBtn2" class="bar-btn" />
    </div>
    <div class="bottom">
      <button class="confirm-btn" @click="confirm">完成</button>
      <span class="rate-show-text">
        {{ state.innerRate[0] }} ~ {{ state.innerRate[1] }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, toRef } from "vue";
import { SizerState } from "@/types/sizer";
import useTouch from "@/assets/js/useTouch";

interface SizerRateState {
  innerRate: [number, number];
  style: {
    [index: string]: string;
  };
}

export default defineComponent({
  name: "SizerRate",
  props: ["sizerState"],
  setup(props, { emit }) {
    const rate = toRef<SizerState, "rate">(props.sizerState, "rate");

    const state: SizerRateState = reactive({
      innerRate: rate.value || [0, 10],
      style: {}
    });

    const bar = ref<HTMLElement>();
    const barBtn1 = ref<HTMLElement>();
    const barBtn2 = ref<HTMLElement>();
    // 保存各个点的left位置
    const dots = ref<number[]>([]);

    // 生成rateBar上面的阈值点，起始是0，末尾是总长度。
    const generateDots = () => {
      if (!bar.value) return;
      dots.value = [0];
      const width = bar.value.getBoundingClientRect().width;
      for (let i = 1; i < 10; i++) {
        const dot = document.createElement("div");
        dot.className = "bar-dot";
        const left = i * 0.1 * width;
        dots.value.push(Math.round(left) - 7);
        dot.style.left = `${Math.round(left)}px`;
        bar.value.appendChild(dot);
      }
      dots.value.push(width - 7);
    };

    // 设置mask黄色区块的长度和偏移量
    const setStyle = () => {
      if (!barBtn1.value || !barBtn2.value) return;
      const x1 = parseInt(barBtn1.value.style.left);
      const x2 = parseInt(barBtn2.value.style.left);
      const position = [x1, x2].sort((a, b) => a - b);
      state.style = {
        width: `${position[1] - position[0] + 7}px`,
        left: `${position[0]}px`
      };
    };

    onMounted(() => {
      setTimeout(() => {
        if (!dots.value.length) {
          generateDots();
        }
        if (!barBtn1.value || !barBtn2.value) return;
        const [start, end] = state.innerRate;
        barBtn1.value.style.left = `${dots.value[start]}px`;
        barBtn2.value.style.left = `${dots.value[end]}px`;
        setStyle();
      }, 20);
    });

    const confirm = () => {
      emit("change", { rate: state.innerRate });
    };

    /* 手指滑动逻辑 */
    function touchStart(e: Event) {
      if (e.target) {
        (e.target as HTMLElement).style.transform = "scale(1.3)";
      }
    }

    function touchMove(e: TouchEvent) {
      if (!bar.value || !e.target) return;
      const target = e.target as HTMLElement;
      const width = bar.value.getBoundingClientRect().width;
      // 另一个没动的评分点位
      const idx = dots.value.indexOf(parseInt(target.style.left));
      const otherRate = state.innerRate[1 - state.innerRate.indexOf(idx)];
      // 控制滑动距离在 0~总长度之间
      const offSetWidth = Math.min(Math.max(0, e.touches[0].pageX - 30), width);
      // 找到离滑动距离最接近的评分点位
      const closestIdx = dots.value.reduce((r, c, i) => {
        const a = Math.abs(Math.round(c - offSetWidth));
        const b = Math.abs(Math.round(dots.value[r] - offSetWidth));
        return a > b ? r : i;
      }, idx);
      target.style.left = `${dots.value[closestIdx]}px`;
      // 评分升序排序
      const rate = [otherRate, closestIdx].sort((a, b) => a - b);
      state.innerRate = rate as [number, number];
      setStyle();
    }

    function touchEnd(e: Event) {
      if (e.target) {
        (e.target as HTMLElement).style.transform = "scale(1.0)";
      }
    }

    useTouch(barBtn1, { touchStart, touchMove, touchEnd });
    useTouch(barBtn2, { touchStart, touchMove, touchEnd });

    return {
      rate,
      state,
      confirm,
      bar,
      barBtn1,
      barBtn2
    };
  }
});
</script>

<style lang="stylus" scoped>
.sizer-rate
  padding: 20px;
  .bar
    position: relative;
    width: 100%;
    height: 5px;
    background-color: $color-text-lighter;
    border-radius: $border-radius-small;
    .bar-btn
      position: absolute;
      left: 0;
      top: -5px;
      width: 10px;
      height: 10px;
      border: 2px solid $color-golden;
      background-color: $color-white;
      border-radius: 50%;
      z-index: 10;
    .mask
      position: absolute;
      height: 5px;
      background: $color-golden;
      border-radius: $border-radius-small;
  .bottom
    margin-top: 10px;
    layout-flex(center, space-between)
    .confirm-btn
      width: 60px;
      height: 30px;
      background: $color-blue;
      color: $color-white;
      border: none;
      outline: none;
      border-radius: $border-radius-small;
    .rate-show-text
      float: right;
      color: $color-golden;
      font-weight: bold;
      font-style: italic;
</style>
<style lang="stylus">
.bar-dot
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background: #fff;
</style>
