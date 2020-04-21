<template>
  <div class="spacing" :style="style" />
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    height: {
      type: Number,
      default: 10
    },
    bgColor: {
      type: String,
      default: "#f6f6f6"
    }
  },
  setup(props) {
    const style = computed(() => {
      return {
        height: props.height + "px",
        backgroundColor: props.bgColor
      };
    });

    return { style };
  }
};
</script>
