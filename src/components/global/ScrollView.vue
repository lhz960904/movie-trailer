<template>
  <div ref="wrapper" class="scroll-wrapper">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { ref, watch, onMounted, onActivated } from "vue";

export default {
  name: "ScrollView",
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
    const wrapper = ref(null);
    const scroll = ref(null);

    /* 初始化滚动 */
    const initScroll = () => {
      if (!wrapper.value) {
        return;
      }
      scroll.value = new BScroll(wrapper.value, {
        bounce: false,
        click: true,
        pullUpLoad: props.pullUpLoad
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
      if (props.pullUpLoad) {
        scroll.value.finishPullUp();
        refresh();
      }
    };

    /* 初始化 */
    onMounted(() => {
      setTimeout(() => {
        initScroll();
      }, 20);
    });

    /* keepAlive里内容变化时 */
    onActivated(() => {
      if (props.data.length) {
        refresh();
      }
    });

    /* 数据源改变，强制刷新 */
    watch(props.data, () => {
      forceUpdate();
    });

    return { wrapper };
  }
};
</script>

<style lang="stylus" scoped>
.scroll-wrapper
  height: 100%;
  overflow: hidden;
</style>
