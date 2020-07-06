<template>
  <div class="review-detail">
    <comment-header :title="title"></comment-header>
    <div class="scroll-list-wrap" style="height: 100vh;">
      <cube-scroll ref="scroll">
        <div class="content" v-if="review_data.author">
          <h1 class="title">{{review_data.title}}</h1>
          <div class="author">
            <div class="avatar">
              <img :src="review_data.author.avatar">
            </div>
            <div class="info">
              <p class="name">
                <span>{{review_data.author.name}}</span>
                的影评
              </p>
              <span class="pub-date">{{review_data.created_at}}</span>
              <span class="star" v-if="review_data.rating.value === 0">暂无评分</span>
              <star :type1="1" :average="review_data.rating.value * 2" v-else></star>
            </div>
          </div>
          <p class="main-content" v-html="review_data.content"></p>
          <div class="copyright">
            本文版权归 {{review_data.author.name}} 所有，任何形式转载请联系作者
          </div>
          <div class="end">
            <div class="line"></div>
            <span class="text">THE END</span>
          </div>
          <div class="useful">
            <div class="use">
              有用({{review_data.useful_count}})
            </div>
            <div class="no-use">
              没用({{review_data.useless_count}})
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import commentHeader from 'base/commentHeader/commentHeader'
import { reviewDetail } from 'api/detail'
import Star from 'base/star/star'
import { mapGetters } from 'vuex'

export default {
  name: 'reviewDetail',
  components: {
    commentHeader,
    Star
  },
  data () {
    return {
      title: '',
      review_data: {}
    }
  },
  computed: {
    ...mapGetters([
      'reviewId'
    ])
  },
  methods: {
    getReviewData (id) {
      reviewDetail(id).then((ret) => {
        const res = ret.res
        this.title = '影评'
        this.review_data = res
      })
    }
  },
  created () {
    this.getReviewData(this.reviewId)
  }
}
</script>

<style lang="stylus" scoped>
  .review-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    display: block
    background: #ffffff
    .content
      padding: 1.4rem .4rem .8rem .4rem;
      .title
        font-size: .44rem;
        color: #333;
        line-height: .6rem;
      .author
        margin-top:.4rem
        display: flex
        .avatar
          flex:.72rem 0 0
          &>img
            width: .72rem
            height:.72rem
            border-radius: 50%
        .info
          flex:1
          font-size: .24rem
          color: #777
          padding-left: .2rem;
          .name
            color: #333333
            padding-bottom: .1rem;
          .star
            margin-left: .1rem
            display: inline-block
      .main-content
        margin-top: .6rem;
        color: #333;
        line-height: .5rem;
        white-space: pre-wrap;
      .copyright
        margin-top: .8rem;
        font-size: .24rem;
        text-align: center;
      .end
        position: relative;
        margin: .6rem auto;
        text-align: center;
        height: .2rem;
        width: 60%;
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
          top: -.16rem;
          transform: translateX(-50%);
          font-size: .28rem;
      .useful
        text-align: center
        .use, .no-use
          display: inline-block;
          padding: .2rem .3rem;
          margin-right: .2rem;
          color: #333;
          font-size: .28rem;
          border: 1px solid #ccc;
          border-radius: .1rem;
</style>
