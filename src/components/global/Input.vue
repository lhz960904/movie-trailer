<template>
  <div class="search-box">
    <i class="iconfont icon-search" />
    <input
      v-model="inputVal"
      type="text"
      class="search-input"
      :placeholder="placeholder"
    />
    <i v-show="inputVal" class="iconfont icon-delete" @click="handleClear" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  setup(props, { attrs, emit }) {
    const inputVal = ref<string>(attrs.modelValue as string);

    watch(inputVal, (newVal: string) => {
      emit("update:modelValue", newVal);
      emit("change");
    });

    const handleClear = () => {
      inputVal.value = "";
      emit("clear");
    };

    return { inputVal, handleClear };
  }
});
</script>

<style lang="stylus" scoped>
.search-box
  layout-flex(center, normal);
  flex-wrap: nowrap;
  padding: 0 10px;
  background: $color-white;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  .iconfont
    font-size: $font-size-medium;
    color:  $color-text-secondary;
  .search-input
    margin: 8px 20px 8px 5px;
    font-size: $font-size-small;
    border: none;
    outline: none;
    width: calc(100% - 60px);
    color: $color-text-primary;
</style>
