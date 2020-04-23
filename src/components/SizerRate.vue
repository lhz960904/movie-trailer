<template>
  <div class="rate-wrapper">
    <div ref="bar" class="bar">
      <div class="mask" :style="state.style" />
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
    <div class="bottom">
      <button class="confirm-btn" @click="confirm">完成</button>
      <span class="rate-show-text"
        >{{ state.innerRate[0] }} ~ {{ state.innerRate[1] }}</span
      >
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRaw, onMounted } from "vue";
export default {
  setup(props, { attrs, emit }) {
    const bar = ref(null);
    const barBtn1 = ref(null);
    const barBtn2 = ref(null);
    // 保存滑动的信息
    const touch = ref({});
    // 保存各个点的left位置
    const dots = ref([]);

    const state = reactive({
      innerRate: [],
      style: {}
    });

    const confirm = () => {
      emit("update:modelValue", toRaw(state.innerRate));
      emit("change", toRaw(state.innerRate));
    };

    // 生成rateBar上面的阈值点，起始是0，末尾是总长度。
    const generateDots = () => {
      dots.value = [0];
      const width = bar.value.getBoundingClientRect().width;
      for (let i = 1; i < 10; i++) {
        const dot = document.createElement("div");
        dot.className = "bar-dot";
        const left = i * 0.1 * width;
        dots.value.push(parseInt(left) - 7);
        dot.style.left = parseInt(left) + "px";
        bar.value.appendChild(dot);
      }
      dots.value.push(width - 7);
    };

    // 设置mask黄色区块的长度和偏移量
    const setStyle = () => {
      const x1 = parseInt(barBtn1.value.style.left);
      const x2 = parseInt(barBtn2.value.style.left);
      const position = [x1, x2].sort((a, b) => a - b);
      state.style = {
        width: position[1] - position[0] + "px",
        left: position[0] + "px"
      };
    };

    /* 手指滑动逻辑 */
    const touchStart = e => {
      touch.value.initiated = true;
      e.target.style.transform = "scale(1.3)";
    };

    const touchMove = e => {
      if (!touch.value.initiated) return;
      const width = bar.value.getBoundingClientRect().width;
      const idx = dots.value.indexOf(parseInt(e.target.style.left));
      // 另一个没动的评分点位
      const otherRate = state.innerRate[1 - state.innerRate.indexOf(idx)];
      // 控制滑动距离在 0~总长度之间
      const offSetWidth = Math.min(Math.max(0, e.touches[0].pageX - 30), width);
      // 找到离滑动距离最接近的评分点位
      const deltaArr = dots.value.map(it =>
        Math.abs(parseInt(it - offSetWidth))
      );
      const min = Math.min(...deltaArr);
      const minIndx = deltaArr.findIndex(it => it === min);
      e.target.style.left = dots.value[minIndx] + "px";
      // 评分升序排序
      state.innerRate = [otherRate, minIndx].sort((a, b) => a - b);
      setStyle();
    };

    const touchEnd = e => {
      touch.value.initiated = false;
      e.target.style.transform = "scale(1.0)";
    };

    onMounted(() => {
      // ???
      setTimeout(() => {
        if (!dots.value.length) {
          generateDots();
        }
        state.innerRate = attrs.modelValue;
        const [start, end] = state.innerRate;
        barBtn1.value.style.left = dots.value[start] + "px";
        barBtn2.value.style.left = dots.value[end] + "px";
        setStyle();
      }, 20);
    });

    return {
      state,
      confirm,
      bar,
      barBtn1,
      barBtn2,
      touchStart,
      touchMove,
      touchEnd
    };
  }
};
</script>

<style lang="stylus" scoped>
.rate-wrapper
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80px;
  padding: 0 20px;
  .bar
    position: relative;
    width: 100%;
    height: 5px;
    background-color: #ccc;
    border-radius: 3px;
    .bar-btn
      position: absolute;
      left: 0;
      top: -5px;
      width: 10px;
      height: 10px;
      border: 2px solid #ffc46c;
      background-color: #fff;
      border-radius: 50%;
      z-index: 10;
    .mask
      position: absolute;
      height: 5px;
      background: #ffc46c;
      border-radius: 3px;
  .bottom
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .confirm-btn
      width: 60px;
      height: 30px;
      background: #409eff;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 3px;
    .rate-show-text
      float: right;
      color: #ffb400;
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
