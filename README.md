# 基于vue2+cube-ui的豆瓣电影应用  
###  使用技术  
vue2 + vuex + vue-router + cube-ui  
###  项目介绍  
整合豆瓣官方提供的api接口，对其内容进行展示  
[豆瓣电影API文档](https://www.doubanapi.com/movie.html)  
[项目演示地址](已关闭)     
在此感谢[buptsky](https://github.com/buptsky/vue-douban-movie) 的项目参考  
### 项目运行
clone项目到本地  
```gitexclude
git clone https://github.com/huyu456/vue-douban
```
安装项目环境  
```gitexclude
npm install
```
运行
```gitexclude
npm run serve
```
### 项目结构   
```gitexclude
├─public  
└─src  
    ├─api  // axios请求
    ├─assets  // logo
    ├─base  // 基础组件
    │  ├─commentHeader  // 评论组件的header
    │  ├─ImageScroll  // 图片滚动
    │  ├─Item  // 列表页的单条数据
    │  ├─loading  // 加载
    │  ├─longComment  // 长评论
    │  ├─modifyForm  // 表单
    │  ├─rankItem  // 推荐页单条数据
    │  ├─shortComment  // 短评论
    │  └─star  // 评分
    ├─common  
    │  ├─css  
    │  ├─icon  // 字体文件
    │  ├─image  
    │  ├─js  
    │  └─yangtu  // 标注文件
    ├─components  
    │  ├─celebrity  // 影人详情
    │  ├─comments  // 评论组件
    │  ├─Detail  // 详情
    │  │  └─component  
    │  ├─Home  // 首页
    │  ├─login  // 登录
    │  ├─profile   // 影人介绍
    │  ├─rank  // 推荐
    │  ├─rankOther  
    │  ├─registered  // 注册
    │  ├─reviewDetail  // 评论详情
    │  ├─reviews  // 评论页
    │  ├─search  // 搜索
    │  ├─search-result  // 搜索结果
    │  ├─top250  // 电影top250
    │  ├─userCenter  // 用户中心
    │  ├─userInfo  // 用户信息
    │  └─works  // 影人作品
    ├─router  // vue-router路由管理
    ├─store  // vuex
    └─views 
``` 
###  其他说明
本项目接入了一个后端用户权限项目，采用Django-Rest-framework
[项目地址](https://github.com/huyu456/douban)


