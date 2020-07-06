<template>
  <div class="comments">
    <comment-header :title="title"></comment-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll"
                   :options="options"
                   :data="comments"
                   @pulling-up="onPullingUp">
        <div class="wrapper">
          <p class="counts">短评{{counts}}条</p>
          <ul>
            <short-comment v-for="item of comments" :key="item.id" :item="item"></short-comment>
          </ul>
        </div>
      </cube-scroll>
      <div v-show="!comments.length" class="loading-container">
        <loading></loading>
      </div>
    </div>
  </div>
</template>

<script>
import commentHeader from 'base/commentHeader/commentHeader'
import shortComment from 'base/shortComment/shortComment'
import { allComment } from 'api/detail'
import loading from 'base/loading/loading'

export default {
  name: 'comments',
  components: {
    commentHeader,
    shortComment,
    loading
  },
  data () {
    return {
      counts: 0,
      comments: [],
      hasMore: true,
      title: '',
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
      start: 0
    }
  },
  methods: {
    getComments () {
      allComment(this.$route.params.id, this.start).then((ret) => {
        const res = ret.res
        if (this.start === 0 && res.comments.length > 0) {
          this.counts = res.total
          this.comments = res.comments
          this.title = `${res.subject.title}的全部短评`
        } else if (this.start > 0 && res.comments.length > 0) {
          this.comments = this.comments.concat(res.comments)
        } else {
          this.hasMore = false
          this.$refs.scroll.forceUpdate(false, true)
        }
      })
    },
    onPullingUp () {
      setTimeout(() => {
        if (this.hasMore) {
          this.start += 20
          this.getComments()
        } else {
          this.$refs.scroll.forceUpdate(false, true)
        }
      }, 1000)
    }
  },
  mounted () {
    this.getComments()
  }
}
</script>

<style lang="stylus" scoped>
  .comments
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    display: block
    background: #ffffff
    overflow: hidden;
    .scroll-list-wrap
      padding-top: 1rem
      height: calc(100% - 1rem)
      .cube-loading
        text-align: center
      .wrapper
        padding:.4rem
        .counts
          font-size: .28rem;
          margin-bottom: .3rem;
        ul
          .short-comment
            margin-bottom: 0
</style>
