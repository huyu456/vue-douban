<template>
  <li class="rank-item">
    <div class="movie-index">
      <div class="line"></div>
      <span class="text">{{index + 1}}</span>
    </div>
    <div class="movie-info">
      <div class="img">
        <img v-lazy="replaceImgUrl(item.img)" height="100" width="70">
      </div>
      <div class="desc">
        <p class="title">{{item.title}}</p>
        <star :type1="1" :average="item.average"></star>
        <div class="director">{{item.directors}}</div>
        <div class="casts">{{item.casts}}</div>
      </div>
    </div>
  </li>
</template>

<script>
import Star from 'base/star/star'
import { replaceUrl } from '../../common/js/base'

export default {
  name: 'rankItem',
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    replaceImgUrl (url) {
      return replaceUrl(url)
    }
  },
  components: {
    Star
  }
}
</script>

<style lang="stylus" scoped>
  .rank-item
    padding-top: .6rem
    .movie-index
      position: relative;
      margin: .6rem auto;
      text-align: center;
      height: .2rem;
      width: 50%;
      .line
        &::after
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          border-bottom: 1px solid #ccc;
          width: 200%;
          content: '';
          transform-origin: 0 0;
          transform: scale(0.5);
      .text
        padding: 0 .2rem;
        display: inline-block;
        background-color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: .36rem;
        color: #42bd56;
    .movie-info
      display: flex;
      align-items: top;
      box-sizing: border-box;
      height: 2.6rem;
      padding: .3rem;
      border: 1px solid #ccc;
      .img
        flex: 1.4rem 0 0;
        margin-right: .2rem;
      .desc
        flex: 1;
        box-sizing: border-box;
        height: 2rem;
        padding-bottom: .4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        .title
          font-size: .32rem
          color: #333;
        .director
          font-size: .24rem
        .casts
          font-size: .24rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
</style>
