<template>
  <div class="card" :class="{ 'rank-card': isRank }" @click="onClick()">
    <p v-if="isRank" class="text" :class="'rank-' + sort">{{ sort }}</p>
    <div class="image">
      <img v-lazy="movie.poster" />
    </div>
    <div class="descript">
      <h1 class="title">{{ movie.title }}</h1>
      <p v-if="movie.isPlay === 1" class="rate">
        观众评:
        <span :class="{ text: movie.rate > 0 }">{{
          movie.rate || "暂无"
        }}</span>
      </p>
      <p v-else class="pubdate">上映时间: {{ removeZh(movie.pubdate) }}</p>
      <p class="cast">主演: {{ casts }}</p>
      <p class="duration">时长: {{ movie.duration || "未知" }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    movie: {
      type: Object,
      required: true
    },
    sort: {
      type: Number,
      default: -1
    }
  },
  setup(props, { emit }) {
    return {
      removeZh(str) {
        return str.replace("(中国大陆)", "");
      },
      casts: computed(() => {
        return props.movie.casts.map(it => it.name).join(",");
      }),
      isRank: computed(() => {
        return props.sort !== -1;
      }),
      onClick() {
        emit("select", props.movie._id);
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.card
  display: flex;
  padding: 10px 20px;
  height: 140px;
  align-items: center;
  box-sizing: border-box;
  &.rank-card
    padding-left: 0;
  .text
    width: 30px;
    height: 30px;
    margin: 0 10px;
    line-height: 30px;
    text-align: center;
    background-color: #f7f7f7;
    color: #999;
    font-weight: 700;
    &.rank-1
      background: #ef4238;
      color: $white;
    &.rank-2
      background: #ffb400;
      color: $white;
    &.rank-3
      background: #FFB47A;
      color: $white;
  .image img
    width: 80px;
    height: 120px;
  .descript
    flex: 1;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    line-height: 30px;
    font-size: 13px;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
    overflow: hidden;
    white-space: nowrap;
    .title
      flex: 1;
      color: #333;
      font-size: 17px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    .rate
      flex: 1;
      .text
        font-size: 15px;
        font-weight: 700;
        color: #faaf00;
    .cast
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    .duration
      flex: 1;
</style>
