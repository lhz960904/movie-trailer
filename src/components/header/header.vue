<template>
  <div class="header">
    <div class="logo">
      <i class="back"></i>
    </div>
    <div class="tabs">
      <div class="item">
        <router-link to="/movie">首页</router-link>
      </div>
      <div class="item">
        <router-link to="/category">分类</router-link>
      </div>
      <div class="item">
        <router-link to="/rank">榜单</router-link>
      </div>
      <div class="item">
        <router-link to="/search">搜索</router-link>
      </div>
    </div>
    <div to="/user" class="user" @click="$router.push('/user')">
      <i class="icon icon-user"></i>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .header
    position fixed
    width 100%
    height 56px
    color: #bbb
    display flex
    line-height 56px
    background #1c2635
    z-index: 2
    .logo
      width 25%
      padding 15px
      box-sizing border-box
      .back
        display block
        width 100%
        height 100%
        background url('./logo.png') no-repeat center
        background-size contain
    .tabs
      width 60%
      display flex
      font-size 17px
      .item
        flex 1
        text-align center
        a
          height 56px
          color: #bbb
          display inline-block
          box-sizing border-box
    .user
      width 15%
      text-align center
      .icon-user
        font-size 25px
    .router-link-active
      font-weight: 700
      color #ffffff!important
      border-bottom: 3px solid #fff
</style>
