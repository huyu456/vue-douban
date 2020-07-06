<template>
  <div class="header">
    <div class="logo">
      <img src="https://img3.doubanio.com/f/frodo/144e6fb7d96701944e7dbb1a9bad51bdb1debe29/pics/app/logo.png">
    </div>
    <div class="search" @click="search">
      <span class="iconfont">&#xe714;</span>
      电影/影人/标签
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    search () {
      this.$router.push({
        path: '/search'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    display: flex
    height:1rem
    background: pink
    padding:0 .3rem
    .logo
      line-height:1rem
      img
        width: .7rem;
        height:.7rem
    .search
      flex: 1
      background: #ffffff
      height: .7rem
      line-height: .7rem
      margin-top: .14rem
      margin-left: .2rem
      border-radius: .1rem
      color: #ccc
      padding-left: .2rem
</style>
