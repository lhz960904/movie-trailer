<template>
  <div class="spacing" :style="style"></div>
</template>

<script>
export default {
  props: {
    height: Number,
    bgcolor: String
  },
  computed: {
    style () {
      return `height: ${this.height}px; background: ${this.bgcolor}`
    }
  }
}
</script>
