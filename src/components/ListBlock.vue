<template>
  <section class="list-block">
    <div class="info">
      <h1 class="title">{{ title }}</h1>
      <i class="iconfont icon-right" @click="goMore()" />
    </div>
    <div v-if="movies.length && !loading" class="list">
      <div
        v-for="item in movies"
        :key="item._id"
        class="item"
        @click="selectItem(item._id)"
      >
        <div class="image">
          <img v-lazy="item.poster" />
          <em v-if="item.isPlay === 1" class="rate">
            {{ toFixed(item.rate) }}
          </em>
        </div>
        <p class="title">{{ item.title }}</p>
      </div>
      <div
        v-for="idx in 8 - movies.length"
        :key="idx"
        class="item placeholder"
      />
    </div>
    <div v-if="!movies.length && !loading">
      <img src="~common/images/noresult.png" width="100" height="100" />
    </div>
    <div v-if="loading" class="loading-wrap">
      <Loading />
    </div>
  </section>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "ListBlock",
  props: {
    movies: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const router = useRouter();

    /* filters */
    const toFixed = num => {
      return num.toFixed(1);
    };

    /* 点击查看更多 */
    const goMore = () => {
      router.push(`/list/${props.type}`);
    };

    /* 点击查看详情 */
    const selectItem = id => {
      router.push(`/movie/${id}`);
    };

    return { toFixed, selectItem, goMore };
  }
};
</script>

<style lang="stylus" scoped>
.list-block
  padding: 15px;
  min-height: 200px;
  text-align: center;
  .info
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-weight: bold;
    font-size: 20px;
    .iconfont
      font-size: 20px;
  .list
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item
      width: 24%;
      .image
        position: relative;
        height: 80%;
        img
          width: 100%;
          height: 100%;
        .rate
          position: absolute;
          right: 5px;
          bottom: 2px;
          color: #ffb400;
          font-weight: bold;
          font-style: italic;
      .title
        padding: 10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
  .loading-wrap
    display: flex;
    align-items: center;
    height: 200px;
</style>
