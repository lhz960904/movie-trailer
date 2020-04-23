<template>
  <Transition name="fade">
    <div v-if="user" class="user">
      <div class="userinfo-wrapper">
        <div class="avatar">
          <img src="~common/images/user.png" width="32" />
        </div>
        <div class="info">
          <span class="text">{{ user.email }}</span>
          <span class="text">{{ user.username }}</span>
        </div>
        <i class="iconfont icon-left" @click="back" />
      </div>
      <div class="menu-wrapper">
        <ul class="menus">
          <li class="menu-item" @click="redirect(0)">
            <i class="iconfont icon-user1" />
            <span class="text">我的资料 <em>(Blog)</em></span>
            <i class="iconfont icon-right" />
          </li>
          <li class="menu-item" @click="redirect(1)">
            <i class="iconfont icon-collect" />
            <span class="text">我的收藏 <em>(Github)</em></span>
            <i class="iconfont icon-right" />
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
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import axios from "@/common/js/axios";

export default {
  name: "User",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.user);

    const logout = async () => {
      await axios.post("/api/user/logout");
      store.dispatch("setUserInfo", {});
      router.replace("/");
    };

    const back = () => {
      window.history.back();
    };

    const redirect = idx => {
      const url = ["http://ihaoze.cn/", "https://github.com/lhz960904"];
      location.href = url[idx];
    };

    return { logout, user, back, redirect };
  }
};
</script>

<style lang="stylus" scoped>
.user
  page-fixed()
  .userinfo-wrapper
    display: flex;
    justify-content: center;
    align-items: center;
    height: 175px;
    background: url('~common/images/background.jpg') no-repeat;
    background-size: cover;
    .avatar
      display: flex;
      align-items: center;
      justify-content: center;
      width: 67px;
      height: 67px;
      background: #eee;
      border-radius: 50%;
    .info
      display: flex;
      flex-direction: column;
      padding-left: 10px;
      font-size: 18px;
      color: #fff;
      .text
        flex: 1;
        line-height: 33px;
    .icon-left
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 25px;
      color: #fff;
  .menu-wrapper
    .menus
      padding-left: 10px;
      .menu-item
        padding: 10px;
        font-size: 18px;
        line-height: 25px;
        list-style: none;
        border-bottom: 1px solid #d8d8d8;
        color: #333;
        em
          font-size: 13px;
          color: #777;
          font-weight: bold;
        .iconfont
          vertical-align: text-bottom;
          font-size: 25px;
          color: #999;
          margin-right: 8px;
        .count
          float: right;
          margin-right: 5px;
          color: #999;
          font-size: 15px;
        .icon-right
          font-size: 20px;
          float: right;
  .btn-wrapper
    padding: 20px;
    .logout-btn
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size: 18px;
      border: none;
      border-radius: 48px;
      color: #fff;
      background-color: #f13900;
      outline: none;
.fade-enter-active, .fade-leave-active
  transition: all .5s;
.fade-enter-from, .fade-leave-to
  transform: translateX(100%);
</style>
