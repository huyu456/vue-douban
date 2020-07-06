<template>
  <div class="reviews">
    <comment-header :title="title"></comment-header>
    <div class="scroll-list-wrap">
      <cube-scroll ref="reviews_scroll"
                   :data="reviews"
                   :options="options"
                   @pulling-up="onPullingUp">
        <div class="wrapper">
          <p class="counts">影评{{total}}条</p>
          <ul>
            <long-comment v-for="item of reviews"
                          :key="item.id"
                          @click.native="reviewDetail(item.id)"
                          :item="item"></long-comment>
          </ul>
        </div>
      </cube-scroll>
    </div>
    <div v-show="!reviews.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import commentHeader from 'base/commentHeader/commentHeader'
import longComment from 'base/longComment/longComment'
import Loading from 'base/loading/loading'
import { allreview } from 'api/detail'
import { mapMutations } from 'vuex'
// scroll组件中的data需要加，不加下拉加载有问题(只执行一次)

export default {
  name: 'reviews',
  components: {
    commentHeader,
    longComment,
    Loading
  },
  data () {
    return {
      title: '',
      total: 0,
      reviews: [],
      start: 0,
      options: {
        pullUpLoad: {
          threshold: 50,
          txt: {
            more: '数据加载...',
            noMore: '没有更多数据了'
          }
        }
      },
      hasMore: true
    }
  },
  methods: {
    getReviews () {
      allreview(this.$route.params.id, this.start).then((ret) => {
        const res = ret.res
        if (this.start === 0 && res.reviews.length > 0) {
          this.total = res.total
          this.reviews = res.reviews
          this.title = `${res.subject.title}的全部影评`
        } else if (this.start > 0 && res.reviews.length > 0) {
          this.reviews = this.reviews.concat(res.reviews)
        } else {
          this.hasMore = false
          // 如果没有新数据
          this.$refs.reviews_scroll.forceUpdate(false, true)
        }
      })
    },
    reviewDetail (id) {
      this.set_review_id(id)
      this.$router.push({
        path: `/movie/${this.$route.params.id}/review/${id}`
      })
    },
    ...mapMutations({
      set_review_id: 'SET_REVIEW_ID'
    }),
    onPullingUp () {
      setTimeout(() => {
        if (this.hasMore) {
          this.start += 20
          this.getReviews()
        } else {
          this.$refs.reviews_scroll.forceUpdate(false, true)
        }
      }, 1000)
    }
  },
  created () {
    this.getReviews()
  }
}
</script>

<style lang="stylus" scoped>
  .reviews
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
      .wrapper
        padding: .4rem .4rem 0 .4rem
        .counts
          font-size: .28rem;
          margin-bottom: .3rem;
        ul
          .long-comment
            margin-bottom: .4rem
</style>
