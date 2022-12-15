<script lang="ts" setup>
const { placeholder, value } = defineProps({
  placeholder: {
    type: String,
    default: "请输入",
  },
  value: {
    type: String,
  },
});

const emit = defineEmits(["change", "clear", "update:modelValue"]);

const attrs = useAttrs();

const inputValue = toRef(attrs, "modelValue");

const handleClear = () => {
  emit("update:modelValue", "");
  emit("change", "");
  emit("clear");
};

const onChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<template>
  <div class="search-box">
    <i class="iconfont icon-search" />
    <input :value="inputValue" type="text" class="search-input" @input="onChange" :placeholder="placeholder" />
    <i v-show="inputValue" class="iconfont icon-delete" @click="handleClear" />
  </div>
</template>

<style lang="stylus" scoped>
.search-box
  layout-flex(center, normal);
  flex-wrap: nowrap;
  padding: 0 10px;
  background: $color-white;
  border: $bordered;
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
