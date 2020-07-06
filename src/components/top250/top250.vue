<template>
  <div class="top250">
    <t_header :title="title"></t_header>
    <ul class="list">
      <li v-for="(item, index) in list"
          :key="index" @click="handleStartClick(index)">{{item}}</li>
    </ul>
    <div class="rank-wrapper">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" @pulling-up="onPullingUp" :options="options" :data="top_250">
          <div class="rank-list">
            <ul>
              <rank-item v-for="(item, index) in top_250" :key="item.id"
                         @click.native="handleClick(item.id)"
                         :item="item" :index="get_index(index)"></rank-item>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div v-show="top_250.length === 0" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Header from 'base/commentHeader/commentHeader'
import RankItem from 'base/rankItem/rankItem'
import Loading from 'base/loading/loading'
import { _top_movie } from 'api/rank-item'

export default {
  name: 'top250',
  data () {
    return {
      title: '豆瓣 Top250',
      top_250: [],
      list_index: 0,
      start: 0,
      list: ['1-50', '51-100', '101-150', '151-200', '201-250'],
      nums: [0, 50, 100, 150, 200],
      options: {
        pullUpLoad: {
          threshold: 50,
          txt: {
            more: '数据加载...',
            noMore: '没有更多数据了'
          }
        },
        click: true,
        taps: true // 给元素点击事件
      },
      hasMore: true
    }
  },
  components: {
    t_header: Header,
    RankItem,
    Loading
  },
  methods: {
    getTop250 () {
      _top_movie(this.start).then(ret => {
        if (this.start === this.nums[this.list_index + 1] || ret.length === 0) {
          this.hasMore = false
          this.$refs.scroll.forceUpdate(false, true)
        } else {
          this.top_250 = this.top_250.concat(ret)
        }
      })
    },
    handleStartClick (index) {
      if (index !== this.list_index) {
        this.start = this.nums[index]
        this.list_index = index
        this.hasMore = true
        this.top_250 = []
        this.getTop250()
      }
    },
    onPullingUp () {
      setTimeout(() => {
        if (this.hasMore) {
          this.start += 10
          this.getTop250()
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    get_index (index) {
      if (this.list_index > 0) {
        return index * this.list_index + this.nums[this.list_index]
      }
      return index
    },
    handleClick (id) {
      this.$router.push({
        path: `/movie/${id}`
      })
    }
  },
  created () {
    this.getTop250()
  }
}
</script>

<style lang="stylus" scoped>
  .top250
    position: fixed;
    background: #ffffff
    top: 0
    left: 0
    right: 0
    bottom:0
    z-index: 999;
    height: 100%
    .list
      display: flex
      position: fixed;
      top: 1rem;
      width: 100%;
      height: .8rem;
      z-index: 200;
      background-color: #fff;
      border-top: 1px solid #cacaca
      &>li
        flex:1
        line-height:.8rem
        font-size: .24rem
        text-align: center
        color: #777;
    .rank-wrapper
      position: fixed;
      top:90px
      bottom:0
      left:0
      right:0
      .scroll-list-wrap
        height:100%
        .rank-list
          padding: 0 .3rem;
</style>
