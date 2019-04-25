# movie-trailer 

![](https://travis-ci.org/lhz960904/movie-trailer.svg?branch=master)


> Vue全家桶开发的电影预告片webAPP，可以查看正在热映与即将上映的电影信息和短片。

**相关项目**: 后台API支持[movie-api](https://github.com/lhz960904/movie-api)，电影数据爬虫[movie-crawler](https://github.com/lhz960904/movie-crawler)

### 扫码体验

![](./images/qrcode.png)

### 效果截图

![效果图](./images/effect1.gif)

![效果图](./images/effect2.gif)



### 更新日志

**V2.0.0**

- 尝试使用持续集成工具`travis`进行打包测试(有待继续探索、实现自动发布)
- 评分区间筛选器从 *点击* 改为 *手指滑动* 、提升体验
- ESLint加强增加`@vue/standard`、对组件重新、抽离全局组件
- `axios`进行封装，处理不同的返回值code、增加`error`页面
- 脚手架升级`vue-cli3`

**V1.0.0**

- 首页推荐正在上映、即将上映的电影
- 通过分类、上映状态、评分区间进行筛选电影
- 通过搜索进行筛选电影、搜索历史通过localStorage存储
- 个人中心页面，注册和登录
- 电影详情短片播放、相关电影推荐、剧情简介

