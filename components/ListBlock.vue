<script lang="ts" setup>
import { Movie } from "@/types/movie";

interface Props {
  movies: Movie[];
  title: string;
  loading: boolean;
  type: 0 | 1;
}

const { movies, title, loading, type } = defineProps<Props>();

const router = useRouter();

const goMore = () => router.push(`/list/${type}`);

const selectItem = (id: string) => router.push(`/movie/${id}`);
</script>

<template>
  <section class="list-block">
    <div class="info">
      <h1 class="title">{{ title }}</h1>
      <i class="iconfont icon-right" @click="goMore()" />
    </div>
    <div v-if="movies.length && !loading" class="list">
      <div v-for="item in movies" :key="item.id" class="item" @click="selectItem(item.id)">
        <div class="image">
          <img :src="item.poster" />
          <em v-if="item.isPlay === '1'" class="rate">
            {{ item.rate }}
          </em>
        </div>
        <p class="title">{{ item.title }}</p>
      </div>
      <div v-for="idx in 8 - movies.length" :key="idx" class="item placeholder" />
    </div>
    <div v-if="!movies.length && !loading">
      <img src="~/assets/images/noresult.png" width="100" height="100" />
    </div>
    <Loading v-if="loading" height="200px" />
  </section>
</template>

<style lang="stylus" scoped>
.list-block
  padding: 15px;
  min-height: 200px;
  text-align: center;
  .info
    layout-flex(center,space-between)
    margin-bottom: 15px;
    font-weight: bold;
    font-size: $font-size-large;
    .iconfont
      font-size: $font-size-large;
  .list
    layout-flex(normal,space-between)
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
        text-ellipsis();
        font-size: $font-size-base;
</style>
