<template>
  <div class="scroll-image">
    <cube-scroll
      ref="scroll"
      :data="items"
      direction="horizontal"
      v-if="items.length > 0"
      class="horizontal-scroll-list-wrap">
      <ul class="list-wrapper">
        <li class="list-item" v-for="(item, index) of items" :key="index" @click="celebrityInfo(item.id)">
          <img v-lazy="replaceUrl(item.img)">
          <h3 class="item-title">{{item.name}}</h3>
          <span v-html="item.identity"></span>
        </li>
      </ul>
    </cube-scroll>
    <div v-else style="text-align: center; font-size: .24rem">
      抱歉，暂无影人信息 :(
    </div>
  </div>
</template>

<script>
import { replaceUrl } from 'common/js/base'

export default {
  name: 'ImageScroll',
  props: {
    items: {
      type: Array
    }
  },
  methods: {
    replaceUrl (imgUrl) {
      return replaceUrl(imgUrl)
    },
    celebrityInfo (id) {
      this.$router.push({
        path: `/celebrity/${id}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*cube-scroll-content必须要有,且使用穿透写法*/
  .scroll-image>>>.cube-scroll-content
    display: inline-block
  .scroll-image
    width: 100%
    .horizontal-scroll-list-wrap
      .list-wrapper
        white-space: nowrap
      .list-item
        display: inline-block
        font-size: .24rem
        text-align: center
        margin-right: 8px;
        img
          height: 120px;
          width: 90px;
        .item-title
          color: #333;
          padding: 8px 0 5px 0;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
</style>
