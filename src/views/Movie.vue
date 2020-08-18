<template>
  <div class="movie-page">
    <div class="player-wrapper" @touchmove.prevent>
      <div ref="playerRef" class="player" />
      <i class="iconfont icon-left" @click="back" />
    </div>
    <div class="info-wrapper">
      <Scroll :data="relativeMovies">
        <section v-if="movie.title" class="info">
          <div class="title">{{ movie.title }}</div>
          <div class="descript">{{ movieDesc }}</div>
          <div class="switch-wrapper" @click="toggleLayer">
            <span>简介</span>
            <i class="iconfont icon-right" />
          </div>
        </section>
        <Spacing />
        <section v-if="relativeMovies.length" class="relative-movies">
          <h1 class="text">相关推荐</h1>
          <div class="list">
            <div
              v-for="item in relativeMovies"
              :key="item.id"
              class="item"
              @click="goToDetail(item.id)"
            >
              <img v-lazy="item.poster" width="56" height="80" />
              <div class="desc">
                <p class="title">{{ item.title }}</p>
                <div v-if="item.isPlay === '1'" class="rate">
                  <span>豆瓣评分: </span>
                  <span class="text">{{ item.rate || "暂无" }}</span>
                </div>
                <p v-else class="pubdate">
                  <span>上映时间: </span>
                  <span>{{ item.pubdate.replace("(中国大陆)", "") }}</span>
                </p>
                <p>类型: {{ renderMovieTypes(item.movieTypes) }}</p>
              </div>
            </div>
          </div>
        </section>
        <Loading v-if="loading" />
      </Scroll>
      <Transition name="layer">
        <div v-show="state.isShow" class="layer-wrapper">
          <div class="title">
            <span class="text">{{ movie.title }}</span>
            <i class="iconfont icon-down" @click="toggleLayer" />
          </div>
          <div v-if="movie.title" class="desc">
            <div class="descript">
              <div v-if="movie.rate !== 0" class="star item">
                <span class="name">评分: </span>
                <span class="text">{{ movie.rate }}</span>
              </div>
              <div v-else class="pubdate item">
                <span class="name">上映时间: </span>
                <span class="text">{{ moviepubdate }}</span>
              </div>
              <div class="author item">
                <span class="name">导演: </span>
                <span class="text">{{ movie.author }}</span>
              </div>
              <div class="cast item">
                <span class="name">影人: </span>
                <span class="text">
                  {{ movie.casts.map(it => it.name).join("/") }}
                </span>
              </div>
              <div class="category item">
                <span class="name">类型: </span>
                <span class="text">
                  {{ renderMovieTypes(movie.movieTypes, "·") }}
                </span>
              </div>
            </div>
            <div class="casts">
              <div v-for="item in movie.casts" :key="item.name" class="cast">
                <img v-lazy="item.avatar" class="img" />
                <h3 class="name">{{ item.name }}</h3>
              </div>
            </div>
            <div class="summary">
              <h1 class="title">简介</h1>
              <span class="text">{{ movie.summary }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive, watch } from "vue";
import DPlayer from "dplayer";
import { useRoute, useRouter } from "vue-router";
import { useRequest } from "@/assets/js/request";
import { Movie } from "@/types/movie";

interface MovieData {
  movie: Movie;
  relativeMovies: Movie[];
}

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const playerRef = ref<HTMLElement>();

    const state = reactive({
      isShow: false
    });

    const initialData = { movie: {} as Movie, relativeMovies: [] };
    const reqUrl = computed(() => `/api/movie/${route.params.id}`);
    const { data, loading, fetch } = useRequest<MovieData>(reqUrl, {
      initialData,
      onSuccess(result) {
        if (!playerRef.value) return;
        const { movie } = result.data;
        new DPlayer({
          container: playerRef.value,
          video: {
            url: movie.video,
            pic: movie.cover
          }
        });
      }
    });

    const movieDesc = computed<string>(() => {
      if (!data.value) return "";
      const { movie } = data.value;
      const duration =
        movie.duration || movie.pubdate.replace("(中国大陆)", "");
      const rate = movie.rate ? `${movie.rate}分` : "即将上映";
      const categories = movie.movieTypes.map(({ name }) => name).join("/");
      return `${rate} · ${categories} · ${duration}`;
    });

    const toggleLayer = () => {
      state.isShow = !state.isShow;
    };

    watch(
      () => route.params.id,
      () => {
        fetch();
      }
    );

    const goToDetail = (id: number) => {
      router.replace(`/movie/${id}`);
    };

    const back = () => {
      window.history.back();
    };

    const renderMovieTypes = (types: Movie["movieTypes"], symbol = "/") => {
      return types.map(it => it.name).join(symbol);
    };

    return {
      state,
      loading,
      movie: computed(() => data.value.movie),
      relativeMovies: computed(() => data.value.relativeMovies),
      movieDesc,
      playerRef,
      back,
      goToDetail,
      toggleLayer,
      renderMovieTypes
    };
  }
});
</script>

<style lang="stylus" scoped>
.movie-page
  page-fixed();
.player-wrapper
  height: 210px;
  .player
    height: 210px;
  .icon-left
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: $font-size-extra-large;
    color: $color-white;
    font-weight: bold;
.info-wrapper
    position: relative;
    height: calc(100% - 210px);
    section
      position: relative;
      padding: $font-size-base;
      background: $color-white;
    .info
      .title
        font-size: $font-size-large;
        font-weight: bold;
        padding-right: 100px;
        text-ellipsis();
      .descript
        margin-top: 20px;
        color: $color-text-regular;
        font-size: $font-size-base;
      .switch-wrapper
        position: absolute;
        top: 15px;
        right: 15px;
        color: $color-text-regular;
        .text
          font-size: $font-size-base;
        .icon
          font-weight: bold;
          vertical-align: text-bottom;
          line-height: 20px;
    .relative-movies
      .text
        font-weight: bold;
        font-size: $font-size-base;
      .list
        margin-top: 15px;
        .item
          display: flex;
          flex-direction: row;
          padding: 10px 0;
          line-height: 23px;
          border-bottom: 1px solid $border-color-base;
          .desc
            flex: 1;
            layout-flex(normal, space-between);
            flex-direction: column;
            margin-left: 15px;
            overflow: hidden;
            .title
              width: 100%;
              text-ellipsis();
            .rate .text
              color: $color-golden;
    .layer-wrapper
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      background: #fff;
      .title
        padding: 5px 10px;
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        font-weight: bold;
        .text
          width: calc(100% - 20px);
          display: inline-block;
          text-ellipsis();
        .icon-down
          float: right;
      .desc
        position: absolute;
        top: 30px;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0 10px;
        overflow: scroll;
        .descript
          margin: 10px 0;
          font-size: $font-size-small;
          border-bottom: 1px solid $border-color-base;
          .item
            display: flex;
            margin-bottom: 10px;
            line-height: 20px;
            .name
              margin-right: 8px;
              white-space: nowrap;
        .casts
          font-size: 0;
          white-space: nowrap;
          overflow-x: scroll;
          border-bottom: 1px solid $border-color-base;
          .cast
            width: 70px;
            margin-bottom: 10px;
            overflow: hidden;
            display: inline-block;
            font-size: $font-size-small;
            text-align: center;
            .img
              width: 60px;
            .name
              margin-top: 10px;
              text-ellipsis();
        .summary
          .title
            font-size: $font-size-base;
            font-weight: bold;
            margin: 15px 0;
            padding: 0;
          .text
            font-size: 12px;
            line-height: 20px;
.layer-enter-active, .layer-leave-active
    transition: all .3s;
.layer-enter-from, .layer-leave-to
  transform: translateY(100%);
.fade-leave-active
  transition: all .5s;
.fade-leave-to
  transform: translateX(100%);
</style>
