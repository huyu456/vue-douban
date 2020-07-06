<template>
  <li class="short-comment">
    <div class="left">
      <img v-lazy="item.author.avatar">
    </div>
    <div class="right">
      <div class="user">
        <h3 class="name">{{item.author.name}}</h3>
        <span v-if="item.rating.value === 0" class="score">暂无评分</span>
        <star :type1="1" :average="item.rating.value * 2" v-else></star>
        <span class="like">
          <span class="iconfont">&#xe6a3;</span>
          {{item.useful_count}}
        </span>
      </div>
      <p class="content">{{item.content}}</p>
      <div class="pub-date">{{item.created_at}}</div>
    </div>
  </li>
</template>

<script>
import Star from 'base/star/star'

export default {
  name: 'shortComment',
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
  .short-comment
    display: flex;
    margin-bottom: .4rem;
    padding-top: .4rem
    &:first-child
      padding-top:0
    .left
      flex: 0 0 .72rem;
      width: 36px;
      margin-right: 12px;
      img
        border-radius: .72rem
        width: .72rem
        height: .72rem
    .right
      flex: 1
      display: flex
      flex-direction: column
      .user
        flex: .5rem 0 0
        line-height:.5rem
        .name
          float: left;
          margin-right: .1rem
        .score
          font-size: .24rem
        .star
          float: left;
          line-height:.52rem
        .like
          float: right;
      .content
        flex:1
        line-height: .4rem
      .pub-date
        flex:.24rem 0 0
        font-size: .24rem;
        color: #777;
        line-height: .5rem;
</style>
