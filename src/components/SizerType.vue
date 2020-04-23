<template>
  <div class="type-wrapper">
    <div
      v-for="item in types"
      :key="item.name"
      class="item"
      :class="{ active: status === item.type }"
      @click="selectItem(item)"
    >
      <i class="iconfont icon-dui" />
      <span class="text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
import { toRef, toRaw } from "vue";

export default {
  setup(props, { attrs, emit }) {
    const status = toRef(attrs, "modelValue");

    const types = [
      { name: "全部", type: "" },
      { name: "已上映", type: 1 },
      { name: "未上映", type: 0 }
    ];

    const selectItem = item => {
      emit("update:modelValue", item.type);
      emit("change", toRaw(item));
    };

    return { status, types, selectItem };
  }
};
</script>

<style lang="stylus" scoped>
.type-wrapper
  display: flex;
  flex-direction: column;
  background: $white;
  .item
    position: relative;
    flex: 1;
    line-height: 40px;
    margin: 0 30px;
    color: #333;
    border-bottom: 1px solid #e5e5e5;
    .icon-dui
      display: none;
      position: absolute;
      left: -25px;
    &.active
      color: #faaf00;
      .icon-dui
        display: inline;
</style>
