<template>
  <div class="status-sizer">
    <div
      v-for="item in statusList"
      :key="item.name"
      class="item"
      :class="{ active: status === item.value }"
      @click="selectItem(item)"
    >
      <i class="iconfont icon-dui" />
      <span class="text">{{ item.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from "vue";

interface Status {
  name: string;
  value: string;
}

export default defineComponent({
  name: "SizerStatus",
  props: ["sizerState"],
  setup(props, { emit }) {
    const status = toRef(props.sizerState, "status");

    const statusList: Status[] = [
      { name: "全部", value: "" },
      { name: "已上映", value: "1" },
      { name: "未上映", value: "0" }
    ];

    const selectItem = (item: Status) => {
      emit("change", { status: item.value });
    };

    return { status, statusList, selectItem };
  }
});
</script>

<style lang="stylus" scoped>
.status-sizer
  background: $color-white;
  .item
    line-height: 40px;
    color: $color-text-primary;
    border-bottom: $bordered;
    .icon-dui
      width: 40px;
      text-align: center;
      display: inline-block;
      visibility: hidden;
    &.active
      color: $color-golden;
      .icon-dui
        visibility: visible;
</style>
