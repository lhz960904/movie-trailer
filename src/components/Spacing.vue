<template>
  <div class="spacing" :style="style"/>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      default: 10
    },
    bgColor: {
      type: String,
      default: '#f6f6f6'
    }
  },
  computed: {
    style () {
      return {
        height: this.height + 'px',
        backgroundColor: this.bgColor
      }
    }
  }
}
</script>
