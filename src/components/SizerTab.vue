<template>
  <div class="sizer-tabs">
    <div
      v-for="(tab, idx) in tabList"
      :key="tab.name"
      class="sizer-tab-item"
      :class="getTabClass(idx)"
      @click="switchTab(idx)"
    >
      <span class="text">{{ tab.name }}</span>
      <i
        class="iconfont icon-drop-down"
        :class="{ 'icon-drop-up': state.activeTab === idx }"
      />
    </div>
    <div v-show="activeTabComp" class="sizer-tab-content">
      <component
        :is="activeTabComp"
        @change="handleSizerChange"
        :sizerState="sizerState"
      />
    </div>
    <Transition name="drop-menu-mask">
      <div
        v-show="state.activeTab !== -1"
        class="sizer-mask"
        @click="state.activeTab = -1"
      />
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import SizerCategory from "./SizerCategory.vue";
import SizerStatus from "./SizerStatus.vue";
import SizerRate from "./SizerRate.vue";
import { SizerState } from "@/types/sizer";

export default defineComponent({
  name: "SizerTab",
  props: ["sizerState"],
  setup(props, { emit }) {
    const state = reactive({
      activeTab: -1
    });

    const tabList = [
      { name: "分类", component: SizerCategory },
      { name: "已上映", component: SizerStatus },
      { name: "评分", component: SizerRate }
    ];

    const getTabClass = (idx: number) => {
      return {
        active: idx === state.activeTab,
        disable: idx === 2 && props.sizerState.status === "0"
      };
    };

    const switchTab = (idx: number) => {
      // 点击相同相当于关闭
      if (idx === state.activeTab) {
        state.activeTab = -1;
        return;
      }
      // 当选择未上映的时候，评分不可选
      if (props.sizerState.status === "0" && idx === 2) return;
      state.activeTab = idx;
    };

    const activeTabComp = computed(() => {
      const match = tabList[state.activeTab];
      return state.activeTab > -1 ? match.component : undefined;
    });

    const handleSizerChange = (changedField: SizerState) => {
      state.activeTab = -1;
      if (changedField.status !== undefined) {
        tabList[1].name = !changedField.status
          ? "全部"
          : changedField.status === "1"
          ? "已上映"
          : "未上映";
      }
      emit("change", changedField);
    };

    return {
      state,
      tabList,
      getTabClass,
      switchTab,
      activeTabComp,
      handleSizerChange
    };
  }
});
</script>

<style lang="stylus" scoped>
.sizer-tabs
  layout-flex();
  height: 40px;
  line-height: 40px;
  border-bottom: $bordered;
  .sizer-tab-item
    position: relative;
    flex: 1;
    text-align: center;
    font-size: $font-size-small;
    color: $color-text-regular;
    &.active
      color: $color-text-primary;
    &.disable
      color: $color-text-lighter;
    &:not(:first-child)::before
      position: absolute
      content: "";
      display: block;
      height: 20px;
      top: 10px;
      left: 0;
      border-left: 1px solid #e8e8e8;
.sizer-tab-content
  position: absolute;
  width: 100%;
  top: 41px;
  z-index: 20;
  background: $color-white;
.sizer-mask
  page-fixed(97px);
  z-index: 15;
  background: rgba(0, 0, 0, 0.5);
.drop-menu-mask-enter-active,
.drop-menu-mask-leave-active
  transition: opacity 0.3s;
.drop-menu-mask-enter-from,
.drop-menu-mask-leave-to
  opacity: 0;
</style>
