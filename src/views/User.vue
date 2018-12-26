<template>
  <Transition name="fade">
    <div v-if="user" class="user">
      <div class="userinfo-wrapper">
        <div class="avatar">
          <img src="~common/images/user.png" width="32">
        </div>
        <div class="info">
          <span class="text">{{ user.email }}</span>
          <span class="text">{{ user.username }}</span>
        </div>
        <i class="iconfont icon-left" @click="$router.back()"/>
      </div>
      <div class="menu-wrapper">
        <ul class="menus">
          <li class="menu-item">
            <i class="iconfont icon-user1"/>
            <span class="text">我的资料</span>
            <i class="iconfont icon-right"/>
          </li>
          <li class="menu-item">
            <i class="iconfont icon-collect"/>
            <span class="text">我的收藏</span>
            <i class="iconfont icon-right"/>
            <span v-if="collectMovies.length" class="text count">{{ collectMovies.length }}</span>
          </li>
        </ul>
      </div>
      <div class="btn-wrapper">
        <button class="logout-btn" @click="logout">退出</button>
      </div>
    </div>
  </Transition>
</template>

<script>
import Cookie from 'js-cookie'
import { mapState } from 'vuex'

const COOKIE_NAME = 'movie_trailer_user'

export default {
  name: 'User',
  data () {
    return {
      collectMovies: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      this.$axios.get('/api/user/get_collects').then(res => {
        if (res.code === 1001) {
          this.collectMovies = res.result.movies
        }
      })
    },
    logout () {
      this.$axios.post('/api/user/logout').then(res => {
        if (res.code === 1001) {
          Cookie.remove(COOKIE_NAME)
          this.$store.commit('setUserInfo', null)
          this.$router.push('/')
        }
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
.user
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 10
  background #fff
  .userinfo-wrapper
    display flex
    justify-content center
    align-items center
    height 175px
    background url('~common/images/background.jpg') no-repeat
    background-size cover
    .avatar
      display flex
      align-items center
      justify-content center
      width 67px
      height 67px
      background #eee
      border-radius 50%
    .info
      display flex
      flex-direction column
      padding-left 10px
      font-size 18px
      color #fff
      .text
        flex 1
        line-height 33px
    .icon-left
      position absolute
      top 10px
      left 10px
      font-size 25px
      color #fff
  .menu-wrapper
    .menus
      padding-left 10px
      .menu-item
        padding 10px
        font-size 18px
        line-height 25px
        list-style none
        border-bottom 1px solid #d8d8d8
        color #333
        .iconfont
          vertical-align text-bottom
          font-size 25px
          color #999
          margin-right 8px
        .count
          float right
          margin-right 5px
          color #999
          font-size 15px
        .icon-right
          font-size 20px
          float right
  .btn-wrapper
    padding 20px
    .logout-btn
      width 100%
      height 48px
      line-height 48px
      font-size 18px
      border none
      border-radius 48px
      color #fff
      background-color #f13900
      outline none
.fade-enter-active, .fade-leave-active
  transition all .5s
.fade-enter, .fade-leave-to
  transform translateX(100%)
</style>
