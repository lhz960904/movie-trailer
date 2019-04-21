<template>
  <div>
    <Transition name="fade">
      <div class="login">
        <TheBackHeader>
          <img src="~common/images/logo.png" width="70">
        </TheBackHeader>
        <div class="wrapper">
          <section class="form-box">
            <div class="item">
              <i class="iconfont icon-email"/>
              <input
                v-model="email"
                type="text"
                placeholder="登录邮箱"
                @focus="errMsg = ''"
              >
              <i v-show="email" class="iconfont icon-delete" @click="email = ''"/>
            </div>
            <div v-show="isSignUp" class="item">
              <i class="iconfont icon-user1"/>
              <input
                v-model="username"
                type="text"
                placeholder="用户名"
                @focus="errMsg = ''"
              >
            </div>
            <div class="item">
              <i class="iconfont icon-lock"/>
              <input
                v-model="password"
                type="password"
                placeholder="密码"
                @focus="errMsg = ''"
              >
            </div>
          </section>
          <div class="btn-wrapper">
            <button @click="check">{{ !isSignUp ? '登录' : '注册' }}</button>
          </div>
          <div class="text-wrapper">
            <Transition name="err">
              <p v-show="errMsg" class="errmsg">{{ errMsg }}</p>
            </Transition>
            <p v-if="isSignUp" class="register" @click="changeType">立即登录</p>
            <p v-else class="register" @click="changeType">免费注册</p>
          </div>
        </div>
      </div>
    </Transition>
    <Confirm
      ref="confirm"
      :content="confirmText"
      confirm-btn-text="前往"
      @confirm="changeType"
    />
  </div>
</template>

<script>
import TheBackHeader from 'components/TheBackHeader'

export default {
  components: {
    TheBackHeader
  },
  data () {
    return {
      email: '',
      username: '',
      password: '',
      errMsg: '',
      loignType: 0, // 0 代表登录，1 代表注册
      confirmText: ''
    }
  },
  computed: {
    isSignUp () {
      return this.loignType === 1
    }
  },
  methods: {
    check () {
      // 邮箱正则
      const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      if (!pattern.test(this.email)) {
        this.errMsg = '邮箱格式不正确'
        return
      }
      if (this.isSignUp && !this.username.trim()) {
        this.errMsg = '用户名不能为空'
        return
      }
      if (!this.password.trim() || this.password.length < 6) {
        this.errMsg = '密码不能为空且不小于6位'
        return
      }
      !this.isSignUp ? this.login() : this.register()
    },
    login () {
      const { email, password } = this
      this.$axios.post('/api/user/login', {
        email,
        password
      }).then(res => {
        if (res.code === 1001) {
          this.$store.commit('setUserInfo', res.result.user)
          this.$router.push('/user')
        } else {
          this.errMsg = res.errmsg
        }
      })
    },
    register () {
      const { email, username, password } = this
      this.$axios.post('/api/user/register', {
        email,
        username,
        password
      }).then(res => {
        if (res.code === 1001) {
          this.confirmText = '注册成功！是否前往登录'
        } else {
          this.confirmText = '邮箱已存在！是否直接登录'
        }
        this.$refs.confirm.show()
      })
    },
    changeType () {
      this.email = ''
      this.username = ''
      this.password = ''
      this.errMsg = ''
      this.loignType = 1 - this.loignType
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 10
  background-color #f6f6f6
  .wrapper
    position fixed
    top 56px
    width 100%
    background-color #f6f6f6
    .form-box
      background #fff
      .item
        position relative
        display flex
        height 45px
        line-height 45px
        .iconfont
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
        outline none
    .text-wrapper
      overflow hidden
      margin 0 10px
    .errmsg
      float left
      color #f00
    .register
      float right
      color #1e7dd7
input:-webkit-autofill
  box-shadow 0 0 0px 1000px #fff inset
.err-enter-active
  animation err-animation .1s
  animation-iteration-count 2
  animation-direction alternate
@keyframes err-animation
  10%,30%,50%,70%,90%
    transform translate3d(-10px, 0, 0)
  20%,40%,60%,80%
    transform translate3d(10px, 0, 0)
.fade-enter-active, .fade-leave-active
  transition all .5s
.fade-enter, .fade-leave-to
  transform translateX(100%)
</style>
