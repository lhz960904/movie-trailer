<template>
  <div class="rank">
    <template v-for="(item, index) in movies">
      <div class="movie-item" :key="item._id">
        <card  :movie="item" :index="index + 1" :rank="true" @select="selectItem"/>
      </div>
    </template>
  </div>
</template>

<script>
import { getHotKey } from '@/api/movie'
import { ERR_OK } from '@/api/config'
import Card from '@/components/card/card'
export default {
  data () {
    return {
      movies: []
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    _getRank () {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.movies = res.data.movies
        }
      })
    },
    selectItem (id) {
      this.$router.push({
        name: 'detail',
        params: {id}
      })
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="stylus" scoped>
  .rank
    position absolute
    top 0
    bottom 0
    width 100%
</style>
