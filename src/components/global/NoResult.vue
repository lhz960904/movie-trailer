<template>
  <div class="no-result-page">
    <img src="~common/images/noresult.png" class="img" />
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "没有找到相关内容"
    }
  }
};
</script>

<style lang="stylus" scoped>
.no-result-page
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  color #999
  .img
    margin-top: 40%;
    width 100px
    height 100px
    filter grayscale(1)
    margin-bottom 15px
</style>
