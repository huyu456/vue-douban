<template>
  <div class="rank">
    <v_header></v_header>
    <div class="rank-list">
      <cube-scroll
        v-show="top250_images"
        ref="scroll">
        <div class="content">
          <h1 class="title">精选榜单</h1>
          <router-link tag="div" class="item top250" to="/rank/top250">
            <div class="desc">
              <h2 class="name">豆瓣 Top250</h2>
              <span class="brief">8分以上好电影</span>
            </div>
            <div class="rank-img">
              <img v-for="(item, index) in top250_images"
                   :key="index" :src="item" :class="setClass(index)"/>
            </div>
          </router-link>
          <router-link tag="div" class="item weekly" to="/rank/weekly">
            <div class="desc">
              <h2 class="name">本周口碑榜</h2>
              <span class="brief">{{get_date}}</span>
            </div>
            <div class="rank-img">
              <img v-for="(item, index) in weekly_images"
                   :key="index" :src="item" :class="setClass(index)"/>
            </div>
          </router-link>
          <router-link tag="div" class="item new-movie" to="/rank/new_movies">
            <div class="desc">
              <h2 class="name">新片榜</h2>
              <span class="brief">{{get_date}}</span>
            </div>
            <div class="rank-img">
              <img v-for="(item, index) in new_movies_images" :key="index" :src="item"
                   :class="setClass(index)"/>
            </div>
          </router-link>
          <router-link tag="div" class="item us-box" to="/rank/us_box">
            <div class="desc">
              <h2 class="name">北美票房榜</h2>
              <span class="brief">票房最高排名</span>
            </div>
            <div class="rank-img">
              <img v-for="(item, index) in us_box_images" :key="index" :src="item"
                   :class="setClass(index)"/>
            </div>
          </router-link>
        </div>
      </cube-scroll>
      <div v-show="!top250_images.length" class="loading-container" style="z-index: 9999">
        <loading></loading>
      </div>
    </div>
    <v_footer></v_footer>
    <router-view/>
  </div>
</template>

<script>
import Header from '../../views/Header'
import Footer from '../../views/Footer'
import Loading from 'base/loading/loading'
import { _top250, weekly, new_movies, us_box } from '../../api/rank'
import { get_week_date } from '../../common/js/base'

export default {
  name: 'rank',
  components: {
    v_header: Header,
    v_footer: Footer,
    Loading
  },
  data () {
    return {
      top250_images: [],
      weekly_images: [],
      new_movies_images: [],
      us_box_images: []
    }
  },
  methods: {
    getImg () {
      _top250().then(ret => {
        this.top250_images = ret.images
      })
      new_movies().then(ret => {
        this.new_movies_images = ret.images
      })
      weekly().then(ret => {
        this.weekly_images = ret.images
      })
      us_box().then(ret => {
        this.us_box_images = ret.images
      })
    },
    setClass (index) {
      return index === 1 ? 'top' : ''
    }
  },
  computed: {
    get_date () {
      return get_week_date()
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="stylus" scoped>
  .rank
    width: 100%;
    height: 100%;
    position: relative;
    .rank-list
      position: fixed;
      top: 1rem;
      left: 0;
      right: 0;
      bottom: 1.2rem;
      padding: 0 .3rem;
      overflow: hidden;
      .content
        padding:.4rem 0
        .title
          color: #000;
          font-size: .32rem
        .item
          margin-top: .3rem;
          height: 2.6rem;
          border-radius: .2rem;
          color: #fff;
          .desc
            vertical-align: top
            display: inline-block
            box-sizing: border-box
            padding-top: 50px
            width: 40%
            height: 100%
            text-align: center
            .name
              font-size: .36rem
          .brief
            font-size: .24rem
            display: inline-block;
            margin-top: .1rem;
          .rank-img
            vertical-align: top
            display: inline-block
            width: 55%
            height: 100%
            text-align: center
            img
              display: inline-block
              vertical-align: text-top
              position: relative
              top: 50%
              transform: translateY(-50%)
              width: 30%
              &.top
                width: 35%
        .top250
          background: linear-gradient(#e1a708, #efd491);
        .weekly
          background: linear-gradient(#32c05e, #a1e5be);
        .new-movie
          background: linear-gradient(#a361c3, #d9b9e8);
        .us-box
          background: linear-gradient(#dd7286, #f3b9c5)
</style>
