<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onActivated, watch } from "vue";
import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(ObserveDOM).use(PullUp);

export default defineComponent({
  name: "Scroll",
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
  setup(props, { emit }) {
    const wrapper = ref<HTMLElement>();
    const scroll = ref<BScroll>();

    /* 初始化滚动 */
    const initScroll = () => {
      if (!wrapper.value) {
        return;
      }
      scroll.value = new BScroll(wrapper.value, {
        bounce: false,
        click: true,
        pullUpLoad: props.pullUpLoad,
        observeDOM: true
      });
      if (props.pullUpLoad) {
        scroll.value.on("pullingUp", () => {
          emit("pulling-up");
        });
      }
    };

    /* 刷新滚动 */
    const refresh = () => {
      scroll.value && scroll.value.refresh();
    };

    /* 强制刷新，停止滚动 */
    const forceUpdate = () => {
      setTimeout(() => {
        refresh();
      }, 30);

      if (props.pullUpLoad && scroll.value) {
        scroll.value.finishPullUp();
        refresh();
      }
    };

    /* keepAlive里内容变化时 */
    onActivated(() => {
      if (props.data.length) {
        refresh();
      }
    });

    /* 初始化 */
    onMounted(() => {
      initScroll();
    });

    /* 数据源改变，强制刷新 */
    watch(
      () => props.data,
      () => {
        // setTimeout(() => {
        forceUpdate();
        // }, 1000);
      }
    );

    return {
      wrapper
    };
  }
});
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  height 100%
  overflow hidden
</style>
