<template>
  <div class="loading">
    <img src="./loading.gif">
    <p>{{text}}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '加载中'
    }
  }
}
</script>
