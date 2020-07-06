<template>
  <div class="header">
    <slot v-if="header_type"></slot>
    <div class="back" @click="backDetail" v-else>
      <span class="iconfont back-icon">&#xe62e;</span>
    </div>
    <p class="title">{{title}}</p>
    <slot name="save"></slot>
  </div>
</template>

<script>
export default {
  name: 'commentHeader',
  props: {
    title: {
      type: String
    },
    header_type: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    backDetail () {
      this.$router.back()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    height:1rem
    width: 100%;
    color: #42bd56;
    position: fixed;
    opacity: 1;
    z-index: 101
    background: #ffffff
    border-bottom: 1px solid #cacaca
    .back
      width:1rem
      height:1rem
      position: absolute
      left:0
      top:0
      line-height: 1rem;
      text-align: center;
      .back-icon
        line-height:1rem
        text-align: center
        font-size: .48rem
        display: block
    .title
      line-height:1rem
      text-align: center
      font-size: .36rem
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
</style>
