<template>
  <div class="user">
    <back-header @back="$router.replace('/movie')">
      <img class="image" src="./logo.png" width="70" style="vertical-align: middle">
    </back-header>
    <div class="content">
      <div class="signin-wrapper" v-if="$route.params.type === 'signin'">
        <section class="form-box">
          <div class="item">
            <i class="icon icon-email"></i>
            <input type="text" placeholder="登录邮箱" v-model="email" ref="email">
            <img class="image" src="./del.png" v-show="email" @click="clear">
          </div>
          <div class="item">
            <i class="icon icon-lock"></i>
            <input type="password" placeholder="密码" v-model="password" ref="password">
          </div>
        </section>
        <div class="btn-wrapper">
          <button @click="check" key="login">登录</button>
        </div>
        <div class="text-wrapper">
          <p class="errmsg" v-show="errMsg">{{errMsg}}</p>
          <p class="register" @click="$router.replace('/login/signup')" key="login">免费注册</p>
        </div>
      </div>
      <div class="signup-wrapper" v-if="$route.params.type === 'signup'">
        <section class="form-box">
          <div class="item">
            <i class="icon icon-email"></i>
            <input type="text" placeholder="登录邮箱" v-model="email" ref="email">
            <img class="image" src="./del.png" v-show="email" @click="clear">
          </div>
          <div class="item">
            <i class="icon icon-user1"></i>
            <input type="text" placeholder="用户名" v-model="username" ref="username">
          </div>
          <div class="item">
            <i class="icon icon-lock"></i>
            <input type="password" placeholder="密码" v-model="password" ref="password">
          </div>
        </section>
        <div class="btn-wrapper">
          <button @click="check" key="register">注册</button>
        </div>
        <div class="text-wrapper">
          <p class="errmsg" v-show="errMsg">{{errMsg}}</p>
          <p class="register" @click="goToLogin" key="register">立即登录</p>
        </div>
      </div>
    </div>
    <confirm ref="confirm" :text="confirmText" confirmBtnText="前往" @confirm="goToLogin"></confirm>
  </div>
</template>

<script>
import BackHeader from 'components/back-header/back-header'
import Confirm from 'components/confirm/confirm'
import { userLogin, userRegister } from 'api/user'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    const { type } = to.params
    if (type !== 'signin' && type !== 'signup') {
      next('/movie')
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    this.email = ''
    this.username = ''
    this.password = ''
    next()
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      confirmText: '',
      errMsg: ''
    }
  },
  watch: {
    errMsg () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.errMsg = ''
      }, 1000)
    }
  },
  methods: {
    clear () {
      this.email = ''
    },
    goToLogin () {
      this.$router.replace('/login/signin')
    },
    check () {
      const { type } = this.$route.params
      if (!this.email) {
        this.errMsg = '邮箱不能为空'
        return
      }
      if (type === 'signup' && !this.username) {
        this.errMsg = '用户名不能为空'
        return
      }
      if (!this.password || this.password.length < 6) {
        this.errMsg = '密码不能为空且不小于6位'
        return
      }
      if (type === 'signup') {
        this._register()
      } else {
        this._login()
      }
    },
    _register () {
      const {email, username, password} = this
      userRegister({email, username, password}).then(res => {
        if (res.code === ERR_OK) {
          this.confirmText = '注册成功！是否前往登录'
          this.$refs.confirm.show()
        } else {
          this.confirmText = '邮箱已存在！是否直接登录'
          this.$refs.confirm.show()
        }
      })
    },
    _login () {
      const {email, password} = this
      userLogin({email, password}).then(res => {
        if (res.code === ERR_OK) {
          this.setUserInfo(res.data.user)
          this.$router.replace({
            name: 'user'
          })
        } else {
          this.errMsg = res.errmsg
        }
      })
    },
    ...mapMutations({
      'setUserInfo': 'SET_USERINFO'
    })
  },
  components: {
    BackHeader,
    Confirm
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
    background-color #f6f6f6
    .content
      background-color #f6f6f6
      .signin-wrapper, .signup-wrapper
        .form-box
          background #fff
          .item
            position relative
            display flex
            height 45px
            line-height 45px
            .icon
              margin 0 5px 0 15px
              font-size 25px
              color #777
            input
              flex 1
              position relative
              padding 10px 50px 10px 10px
              outline none
              border none
              font-size 18px
              border-bottom 1px solid #eee
            .image
              position absolute
              top 50%
              transform translateY(-50%)
              right 15px
              width 18px
        .btn-wrapper
          margin 10px
          height 40px
          button
            width 100%
            height 100%
            border-radius 5px
            color #ffffff
            background #1e7dd7
            border none
        .text-wrapper
          overflow hidden
          margin 0 10px
        .errmsg
          float left
          color #f00
        .register
          float right
          color #1e7dd7
</style>
