<template>
  <div class="all-work">
    <w_header :title="title"></w_header>
    <div class="list-wrap" v-show="works">
      <cube-scroll
        ref="scroll"
        :options="options"
        :data="works"
        @pulling-up="onPullingUp">
        <div class="wrapper">
          <ul>
            <movie-item v-for="item of works"
                        :key="item.id"
                        @click.native="movieDetail(item.id)"
                        :item="item"></movie-item>
          </ul>
        </div>
      </cube-scroll>
    </div>
    <div v-show="!works.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Header from 'base/commentHeader/commentHeader'
import { celebrityWorks } from 'api/celebrity'
import movieItem from 'base/Item/Item'
import Loading from 'base/loading/loading'

export default {
  name: 'works',
  components: {
    w_header: Header,
    movieItem,
    Loading
  },
  data () {
    return {
      title: '全部作品',
      start: 0,
      works: [],
      options: {
        pullUpLoad: {
          threshold: 50,
          txt: {
            more: '数据加载...',
            noMore: '没有更多数据了'
          }
        },
        click: false
      },
      hasMore: true
    }
  },
  methods: {
    getWorks () {
      celebrityWorks(this.$route.params.id, this.start).then((ret) => {
        if (this.start === 0 && ret.length > 0) {
          this.works = ret
        } else if (this.start > 0 && ret.length > 0) {
          this.works = this.works.concat(ret)
        } else {
          this.hasMore = false
          this.$refs.scroll.forceUpdate(false, true)
        }
      })
    },
    movieDetail (id) {
      this.$router.push({
        path: `/movie/${id}`
      })
    },
    onPullingUp () {
      setTimeout(() => {
        if (this.hasMore) {
          this.start += 20
          this.getWorks()
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    }
  },
  created () {
    this.getWorks()
  }
}
</script>

<style lang="stylus" scoped>
  .all-work
    position: fixed;
    left:0
    right:0
    top: 0;
    bottom:0
    z-index: 100
    background: #ffffff
    overflow: hidden;
    .list-wrap
      height: 100%
      .wrapper
        padding-top: 1rem
</style>
