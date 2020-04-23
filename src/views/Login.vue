<template>
  <div>
    <Transition name="fade">
      <div class="login">
        <TheBackHeader>
          <img src="~common/images/logo.png" width="70" />
        </TheBackHeader>
        <div class="wrapper">
          <section class="form-box">
            <div class="item">
              <i class="iconfont icon-email" />
              <input
                v-model="state.email"
                type="text"
                placeholder="登录邮箱"
                @focus="state.errMsg = ''"
              />
              <i
                v-show="state.email"
                class="iconfont icon-delete"
                @click="state.email = ''"
              />
            </div>
            <div v-show="state.isSignUp" class="item">
              <i class="iconfont icon-user1" />
              <input
                v-model="state.username"
                type="text"
                placeholder="用户名"
                @focus="state.errMsg = ''"
              />
            </div>
            <div class="item">
              <i class="iconfont icon-lock" />
              <input
                v-model="state.password"
                type="password"
                placeholder="密码"
                @focus="state.errMsg = ''"
              />
            </div>
          </section>
          <div class="btn-wrapper">
            <button @click="validate">
              {{ !state.isSignUp ? "登录" : "注册" }}
            </button>
          </div>
          <div class="text-wrapper">
            <Transition name="err">
              <p v-show="state.errMsg" class="errmsg">{{ state.errMsg }}</p>
            </Transition>
            <p v-if="state.isSignUp" class="register" @click="changeType">
              立即登录
            </p>
            <p v-else class="register" @click="changeType">免费注册</p>
          </div>
        </div>
      </div>
    </Transition>
    <Confirm
      ref="confirm"
      :content="state.confirmText"
      confirm-btn-text="前往"
      @confirm="changeType"
    />
  </div>
</template>

<script>
import TheBackHeader from "components/TheBackHeader";
import axios from "@/common/js/axios";
import { reactive, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    TheBackHeader
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      email: "",
      username: "",
      password: "",
      errMsg: "",
      loignType: 0, // 0 代表登录，1 代表注册
      confirmText: "",
      isSignUp: computed(() => {
        return state.loignType === 1;
      })
    });

    const confirm = ref(null);

    /* 登录 */
    const login = async () => {
      const { email, password } = state;
      const { user, errmsg } = await axios.post("/api/user/login", {
        email,
        password
      });

      if (user) {
        store.dispatch("setUserInfo", user);
        router.replace("/user");
      } else {
        state.errMsg = errmsg;
      }
    };

    /* 注册 */
    const register = async () => {
      const { email, username, password } = state;
      const { user, errmsg } = await axios.post("/api/user/register", {
        email,
        username,
        password
      });
      console.log(user, errmsg);
      if (user) {
        state.confirmText = "注册成功！是否前往登录";
      } else {
        state.confirmText = "邮箱已存在！是否直接登录";
      }
      confirm.value && confirm.value.show();
    };

    /* 校验 */
    const validate = () => {
      // 邮箱正则
      const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (!pattern.test(state.email)) {
        state.errMsg = "邮箱格式不正确";
        return;
      }
      if (state.isSignUp && !state.username.trim()) {
        state.errMsg = "用户名不能为空";
        return;
      }
      if (!state.password.trim() || state.password.length < 6) {
        state.errMsg = "密码不能为空且不小于6位";
        return;
      }

      !state.isSignUp ? login() : register();
    };

    const changeType = () => {
      state.email = "";
      state.username = "";
      state.password = "";
      state.errMsg = "";
      state.loignType = 1 - state.loignType;
    };

    return { state, validate, changeType, confirm };
  },

  methods: {
    register() {
      const { email, username, password } = this;
      this.$axios
        .post("/api/user/register", {
          email,
          username,
          password
        })
        .then(res => {
          if (res.code === 1001) {
            this.confirmText = "注册成功！是否前往登录";
          } else {
            this.confirmText = "邮箱已存在！是否直接登录";
          }
          this.$refs.confirm.show();
        });
    },
    changeType() {
      this.email = "";
      this.username = "";
      this.password = "";
      this.errMsg = "";
      this.loignType = 1 - this.loignType;
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  page-fixed()
  background-color #f6f6f6
  .wrapper
    position: fixed;
    top $headerHeight
    width: 100%;
    background-color: #f6f6f6;
    .form-box
      background $white;
      .item
        position: relative;
        display: flex;
        height: 45px;
        line-height: 45px;
        .iconfont
          margin: 0 5px 0 15px;
          font-size: 25px;
          color: #777;
          &.icon-delete
            position: absolute;
            right: 0;
        input
          flex: 1;
          position: relative;
          padding: 10px 50px 10px 10px;
          outline: none;
          border: none;
          font-size: 18px;
          border-bottom: 1px solid #eee;
        .image
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
          width: 18px;
    .btn-wrapper
      margin: 10px;
      height: 40px;
      button
        width: 100%;
        height: 100%;
        border-radius: 5px;
        color: #ffffff;
        background: #1e7dd7;
        border: none;
        outline: none;
    .text-wrapper
      overflow: hidden;
      margin: 0 10px;
    .errmsg
      float: left;
      color: #f00;
    .register
      float: right;
      color: #1e7dd7;
input:-webkit-autofill
  box-shadow: 0 0 0px 1000px #fff inset;
.err-enter-active
  animation: err-animation .1s
  animation-iteration-count: 2
  animation-direction: alternate
@keyframes err-animation
  10%,30%,50%,70%,90%
    transform: translate3d(-10px, 0, 0);
  20%,40%,60%,80%
    transform: translate3d(10px, 0, 0);
.fade-enter-active, .fade-leave-active
  transition: all .5s;
.fade-enter-from, .fade-leave-to
  transform :translateX(100%);
</style>
