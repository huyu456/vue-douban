<template>
  <div class="header">
    <div class="back" @click="handleBack()">
      <span class="iconfont back-icon">&#xe62e;</span>
    </div>
    <div class="title">
      <span class="iconfont">&#xe600;</span>
      {{title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailHeader',
  props: {
    title: {
      type: String
    }
  },
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height:1rem
    width: 100%;
    background: #555
    color: #ffffff;
    position: fixed;
    opacity: 1;
    z-index: 3
    .back
      width:1rem
      height:1rem
      position: absolute
      left:0
      top:0
      .back-icon
        line-height:1rem
        text-align: center
        font-size: .48rem
        display: block
    .title
      text-align: center
      font-size: .36rem
      &>span
        font-size: .48rem
        line-height:1rem
</style>
