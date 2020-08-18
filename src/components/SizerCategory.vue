<template>
  <div class="sizer-category">
    <div class="category-list">
      <span
        v-for="item in categoryList"
        :key="item.id"
        :class="{ active: state.selectedKeys.includes(item.id) }"
        class="item"
        @click="selectItem(item.id)"
      >
        {{ item.name }}
      </span>
    </div>
    <button class="confirm-btn" @click="confirm">完成</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, reactive } from "vue";
import { SizerState } from "@/types/sizer";
import { useRequest } from "@/assets/js/request";

export default defineComponent({
  name: "SizerCategory",
  props: ["sizerState"],
  setup(props, { emit }) {
    const categories = toRef<SizerState, "categories">(
      props.sizerState,
      "categories"
    );

    const state = reactive({
      selectedKeys: categories.value || []
    });

    const { data } = useRequest("/api/category");

    const selectItem = (id: number) => {
      const arr = [...state.selectedKeys];
      const idx = arr.indexOf(id);
      if (idx > -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(id);
      }
      state.selectedKeys = arr;
    };

    const confirm = () => {
      emit("change", { categories: state.selectedKeys });
    };

    return { state, categoryList: data, selectItem, confirm };
  }
});
</script>

<style lang="stylus" scoped>
.sizer-category
  padding: 10px 25px;
  .category-list
    layout-flex();
    .item
      padding: 6px 12px;
      margin: 0 7px 10px 0;
      line-height: 1;
      border-radius: $border-radius-base
      font-size: $font-size-small;
      color: $color-text-regular;
      border: $bordered;
      &.active
        border-color: $color-golden;
        background: $color-golden;
        color: $color-white;
  .confirm-btn
    width: 60px;
    height: 30px;
    background: $color-blue;
    color: $color-white;
    border: none;
    outline: none;
    border-radius: $border-radius-small;
</style>
