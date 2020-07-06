<template>
  <div class="star">
    <div class="star-group">
      <div class="star-info" :data-score="average" v-if="average !== 0 || type1 === 1">
        <span class="iconfont dim-star">&#xe64c;&#xe64c;&#xe64c;&#xe64c;&#xe64c;</span>
        <span class="iconfont flash-star" :style="getScore(average)">&#xe64c;&#xe64c;&#xe64c;&#xe64c;&#xe64c;</span>
      </div>
      <span class="num" v-if="type1 === 0">{{showScore(average)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    average: {
      type: Number
    },
    type1: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showScore (score) {
      if (score === 0) {
        return '暂无评分'
      }
      return score.toFixed(1)
    },
    getScore (score) {
      // 5分 50 % 25px
      return { width: `${score * 5 / 50 * 100}%` }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star
    .star-group
      position: relative;
      .num
        font-size: .26rem
      .star-info
        width: 1rem
        position: relative;
        display: inline-block
        line-height:.24rem
        &>span
          font-size: .20rem
        .dim-star
          position: absolute;
          z-index: 1
          color: #e0e0e0
          top: -.24rem
          left:0
        .flash-star
          top: -.24rem
          position: absolute;
          color: #ffb436
          z-index: 2
          left: 0
          overflow: hidden
</style>
