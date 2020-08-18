<template>
  <div class="login-page">
    <div class="login">
      <TheBackHeader>
        <img src="@/assets/images/logo.png" width="70" />
      </TheBackHeader>
      <div class="content-wrapper">
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
              v-model="state.userName"
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
  </div>
  <Confirm
    v-model="state.isShowConfirm"
    :content="state.confirmText"
    confirm-btn-text="前往"
    @confirm="confirm"
  />
</template>

<script lang="ts">
import TheBackHeader from "@/components/TheBackHeader.vue";
import axios, { RequestResponse } from "@/assets/js/request";
import { useRouter } from "vue-router";
import { reactive, defineComponent, computed } from "vue";

interface LoginState {
  email: string;
  userName: string;
  password: string;
  errMsg: string;
  loginType: 0 | 1;
  confirmText: string;
  isSignUp: boolean;
  isShowConfirm: boolean;
}

export default defineComponent({
  components: {
    TheBackHeader
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      email: "",
      userName: "",
      password: "",
      errMsg: "",
      loginType: 0, // 0 代表登录，1 代表注册
      confirmText: "",
      isSignUp: computed<boolean>(() => {
        return state.loginType === 1;
      }),
      isShowConfirm: false
    }) as LoginState;

    /* 登录 */
    const login = async () => {
      const { email, password } = state;
      const result: RequestResponse<number> = await axios.post(
        "/api/user/login",
        {
          email,
          password
        }
      );
      if (result.code != 200) {
        state.errMsg = result.errMsg;
      } else {
        router.replace("/user");
      }
    };

    /* 注册 */
    const register = async () => {
      const { email, userName, password } = state;
      const result = await axios.post("/api/user/register", {
        email,
        userName,
        password
      });
      if (result.data) {
        state.confirmText = "注册成功！是否前往登录";
      } else {
        state.confirmText = "邮箱已存在！是否直接登录";
      }
      state.isShowConfirm = true;
    };

    /* 校验 */
    const validate = () => {
      // 邮箱正则
      const pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (!pattern.test(state.email)) {
        state.errMsg = "邮箱格式不正确";
        return;
      }
      if (state.isSignUp && !state.userName.trim()) {
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
      state.userName = "";
      state.password = "";
      state.errMsg = "";
      state.loginType = state.loginType === 1 ? 0 : 1;
    };

    const confirm = () => {
      changeType();
      state.isShowConfirm = false;
    };

    return {
      state,
      login,
      register,
      validate,
      changeType,
      confirm
    };
  }
});
</script>

<style lang="stylus" scoped>
.login-page
  page-fixed();
  .content-wrapper
    position: fixed;
    top: $headerHeight;
    width: 100%;
    .form-box
      background $color-white;
      .item
        position: relative;
        display: flex;
        height: 45px;
        line-height: 45px;
        border-bottom: $bordered;
        .iconfont
          margin: 0 5px 0 15px;
          font-size: $font-size-extra-large;
          color: #777;
          &.icon-delete
            position: absolute;
            right: 0;
            font-size: $font-size-large;
        input
          flex: 1;
          position: relative;
          padding: 10px 50px 10px 10px;
          outline: none;
          border: none;
          font-size: $font-size-medium;
    .btn-wrapper
      margin: 10px;
      height: 40px;
      button
        width: 100%;
        height: 100%;
        border-radius: $border-radius-base;
        color: $color-white;
        background: $color-blue;
        border: none;
        outline: none;
    .text-wrapper
      overflow: hidden;
      margin: 0 10px;
    .errmsg
      float: left;
      color: $color-danger;
    .register
      float: right;
      color: $color-blue;
input:-webkit-autofill
  box-shadow: 0 0 0px 1000px $color-white inset;
  font-size: $font-size-medium;
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
