<template>
  <div class="user-page">
    <div class="userinfo-wrapper">
      <div class="avatar">
        <img src="@/assets/images/user.png" width="32" />
      </div>
      <div class="info">
        <span class="text">{{ user.email }}</span>
        <span class="text">{{ user.userName }}</span>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios, { useRequest } from "@/assets/js/request";

export default defineComponent({
  setup() {
    const router = useRouter();

    const { data } = useRequest("/api/user/getInfo", {
      initialData: { email: "-", userName: "" },
      onFail() {
        router.replace("/login");
      }
    });

    const logout = async () => {
      await axios.post("/api/user/logout");
      router.replace("/");
    };

    const back = () => {
      window.history.back();
    };

    const redirect = (idx: number) => {
      const url = ["http://cvnull.com/", "https://github.com/lhz960904"];
      location.href = url[idx];
    };

    return {
      user: data,
      back,
      redirect,
      logout
    };
  }
});
</script>

<style lang="stylus" scoped>
.user-page
  page-fixed();
  .userinfo-wrapper
    layout-flex(center, center);
    height: 175px;
    background: url('~@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    .avatar
      layout-flex(center, center);
      width: 67px;
      height: 67px;
      background: $color-background;
      border-radius: 50%;
    .info
      layout-flex();
      flex-direction: column;
      padding-left: 10px;
      font-size: $font-size-medium;
      color: $color-white;
      .text
        flex: 1;
        line-height: 33px;
    .icon-left
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: $font-size-extra-large;
      color: $color-white;
  .menu-wrapper
    .menus
      padding-left: 10px;
      .menu-item
        padding: 10px;
        font-size: $font-size-medium;
        line-height: 25px;
        list-style: none;
        border-bottom: $bordered;
        color: $color-primary;
        em
          font-size: $font-size-small;
          color: $$color-text-regular;
          font-weight: bold;
        .iconfont
          vertical-align: text-bottom;
          font-size: $font-size-extra-large;
          color: $color-text-secondary;
          margin-right: 8px;
        .count
          float: right;
          margin-right: 5px;
          color: $color-text-secondary;
          font-size: $font-size-large;
        .icon-right
          font-size: 20px;
          float: right;
  .btn-wrapper
    padding: 20px;
    .logout-btn
      width: 100%;
      height: 48px;
      line-height: 48px;
      font-size:$font-size-medium;
      border: none;
      border-radius: 48px;
      color: $color-white;
      background-color: $color-danger;
      outline: none;
</style>
