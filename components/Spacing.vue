<template>
  <div class="spacing" :style="style" />
</template>

<script lang="ts" setup>
const props = defineProps({
  height: {
    type: Number,
    default: 10,
  },
  bgColor: {
    type: String,
    default: "#f6f6f6",
  },
});

const style = computed(() => {
  return {
    height: props.height + "px",
    backgroundColor: props.bgColor,
  };
});
</script>
