<template>
  <li class="list-item">
    <div class="img">
      <img v-lazy="replaceUrl(item.img)">
    </div>
    <div class="info">
      <div class="name">{{item.title}}</div>
      <star :average="item.average"></star>
      <div class="directors">导演:{{item.directors}}</div>
      <div class="casts">主演:{{item.casts}}</div>
      <div class="collection-num">{{item.collect_count}}人收藏</div>
    </div>
  </li>
</template>

<script>
import { replaceUrl } from 'common/js/base'
import Star from 'base/star/star'

export default {
  name: 'Item',
  components: {
    Star
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    replaceUrl (imgUrl) {
      return replaceUrl(imgUrl)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-item
    list-style-type: none
    display: flex
    padding: .30rem
    .img
      flex: 1.6rem 0 0
      img
        width: 1.6rem
        height: 2.4rem
    .info
      display: flex
      flex:1
      padding: 0 .2rem
      justify-content: space-around
      flex-direction: column;
      height: 2.4rem
      white-space: pre-wrap
      .name
        font-size: .30rem
      &>div
        font-size: .24rem
</style>
