<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: .4rem
      font-size: .24rem
      color: rgba(255, 255, 255, 0.5)
</style>
