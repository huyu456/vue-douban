<template>
  <li class="long-comment">
    <h1 class="title">{{item.title}}</h1>
    <div class="user">
      <img v-lazy="item.author.avatar">
      <span class="name">{{item.author.name}}</span>
      <span class="score" v-if="item.rating.value === 0">暂无评分</span>
      <star :type1="1" :average="item.rating.value * 2" v-else></star>
    </div>
    <div class="content">
      {{item.summary}}
    </div>
  </li>
</template>

<script>
import Star from 'base/star/star'

export default {
  name: 'longComment',
  props: {
    item: {
      type: Object
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus" scoped>
  .long-comment
    margin-bottom: .4rem
    &:first-child
      padding-top:0
    .title
      font-size: .32rem;
      color: #333;
      padding: .1rem 0;
    .user
      padding: .1rem 0;
      font-size: .24rem
      color: #BCBCBC;
      &>img
        width: .5rem
        height: .5rem
        border-radius: 50%
        display: inline-block
        vertical-align: middle
        margin-right: 6px;
      .score
        font-size: .24rem
      .name
        display: inline-block
        vertical-align: middle
        margin-right: 6px;
      .star
        display: inline-block
        vertical-align: sub
    .content
      font-size: .24rem
      line-height: .4rem;
</style>
