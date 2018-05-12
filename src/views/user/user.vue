<template>
  <div class="user" v-if="userInfo.username">
    <div class="userinfo-wrapper">
      <div class="avatar">
        <img v-lazy="avatarImg" width="100%">
      </div>
      <div class="info">
        <span class="text">{{userInfo.email}}</span>
        <span class="text">{{userInfo.username}}</span>
      </div>
      <i class="icon icon-left" @click="$router.go(-1)"></i>
    </div>
    <div class="menu-wrapper">
      <ul class="menus">
        <li class="menu-item">
          <i class="icon icon-user1"></i>
          <span class="text">我的资料</span>
          <i class="icon icon-right"></i>
        </li>
        <li class="menu-item">
          <i class="icon icon-collect"></i>
          <span class="text">我的收藏</span>
          <i class="icon icon-right"></i>
          <span class="text count" v-if="userInfo.collects.length">{{userInfo.collects.length}}</span>
        </li>
      </ul>
    </div>
    <div class="btn-wrapper">
      <button @click="logout">退出</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, logout } from 'api/user'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._getInfo()
    })
  },
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    avatarImg () {
      const prefix = `http://admin.movie.kyriel.cn/`
      if (this.userInfo.headImg) {
        return prefix + this.userInfo.headImg
      }
      return false
    }
  },
  methods: {
    _getInfo () {
      const { userInfo } = this.$store.getters
      if (userInfo.username) {
        this.userInfo = userInfo
        return
      }
      getUserInfo().then(res => {
        if (res.code === ERR_OK) {
          this.setUserInfo(res.data.user)
          this.userInfo = res.data.user
        } else {
          this.$router.replace('/login/signin')
        }
      })
    },
    logout () {
      logout().then(res => {
        if (res.code === ERR_OK) {
          this.setUserInfo({})
          this.$router.push({name: 'movie'})
        }
      })
    },
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO'
    })
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
    .userinfo-wrapper
      display flex
      justify-content center
      align-items center
      height 175px
      background url('./background.jpg') no-repeat
      background-size cover
      .avatar
        width 67px
        height 67px
        background #eee
        border-radius 50%
        img
         border-radius 50%
      .info
        display flex
        flex-direction column
        height 67px
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
          border-bottom 1px solid #d8d8d8
          color #333
          .icon
            vertical-align text-bottom
            font-size 25px
            color #999
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
      button
        width 100%
        height 48px
        line-height 48px
        font-size 18px
        border none
        border-radius 48px
        color #fff
        background-color #f13900
</style>
