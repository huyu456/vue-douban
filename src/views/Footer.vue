<template>
  <div class="footer border-top">
    <div class="item">
      <span class="iconfont">&#xe600;</span>
      <span class="title">
        <router-link to="/">热映</router-link>
      </span>
    </div>
    <div class="item">
      <span class="iconfont">&#xe66e;</span>
      <span class="title">
        <router-link to="/rank">排行</router-link></span>
    </div>
    <div class="item">
      <span class="iconfont">&#xe619;</span>
      <span class="title">
        <router-link to="/user">我的</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="stylus" scoped>
  .border-top
    border-top:1px solid #42bd56
  .footer
    display: flex
    height: 1.2rem;
    background: #ffffff;
    width: 100%
    position: fixed;
    left: 0
    bottom:0
    .item
      flex: 1
      text-align: center
      &>span
        line-height:1.2rem
        &>a
          color: #000
</style>
