<template>
  <div class="detail">
    <detail-header :title="title" ref="_header"></detail-header>
    <div class="abc">
      <cube-scroll ref="scroll" v-show="item.title"
                   @scroll="onScrollHandle"
                   :scroll-events="['scroll']">
        <div class="poster">
          <img :src="replaceUrl(item.poster)">
        </div>
        <div class="move-info">
          <div class="base-info">
            <div class="desc">
              <h2 class="name">{{item.title}}</h2>
              <span class="tag">{{item.tag}}</span>
              <span class="original-name">原名: {{item.original_title}}</span>
              <span class="pubdate">上映时间: {{item.pubdates}}</span>
              <span class="duration">片长: {{item.durations}}</span>
            </div>
            <div class="rank">
              <span class="origin">豆瓣评分</span>
              <span class="score" v-if="item.average > 0">{{item.average}}</span>
              <span style="font-size: .24rem;color: #777" v-else>暂无评分</span>
              <star :type1="1" :average="parseFloat(item.average)" v-if="item.average > 0"></star>
              <span class="reviews">{{item.ratings_count}}人</span>
            </div>
          </div>
          <div class="person">
            <div class="want" @click="wantToSeeClick">
              想看
              <span class="iconfont" :class="{do_see: want_icon}">&#xe602;</span>
            </div>
            <div class="watched" @click="watchedClick">
              看过<span class="iconfont" :class="{seen: watch_icon}">&#xe64a;</span>
            </div>
          </div>
          <div class="summary">
            <p class="title">剧情简介</p>
            <p class="content" v-html="item.summary"></p>
          </div>
          <div class="cineaste">
            <p class="title">影人</p>
            <image-scroll :items="items"></image-scroll>
          </div>
          <comment :popular_reviews="popular_reviews"
                   :popular_comments="popular_comments"
                   :reviews_count="reviews_count"
                   :comments_count="comments_count"
                   ></comment>
        </div>
      </cube-scroll>
      <div v-show="!item.title" class="loading-container">
        <loading></loading>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import DetailHeader from './component/detailHeader'
import Star from 'base/star/star'
import ImageScroll from 'base/ImageScroll/ImageScroll'
import Comment from './component/comment'
import { detailData } from 'api/detail'
import { replaceUrl, Opacity } from 'common/js/base'
import loading from 'base/loading/loading'
import { mapActions } from 'vuex'
import { has_collect } from '../../common/js/cache'

export default {
  name: 'Detail',
  components: {
    DetailHeader,
    ImageScroll,
    Comment,
    Star,
    loading
  },
  data () {
    return {
      item: {},
      items: [],
      popular_reviews: [],
      popular_comments: [],
      reviews_count: 0,
      comments_count: 0,
      title: '电影',
      want_icon: false, // 想看图标
      watch_icon: false
    }
  },
  methods: {
    ...mapActions([
      'save_data',
      'delete_data'
    ]),
    getDetail () {
      detailData(this.$route.params.id).then((ret) => {
        this.item = ret
        this.items = ret.actor
        this.popular_comments = ret.popular_comments
        this.popular_reviews = ret.popular_reviews
        this.reviews_count = ret.reviews_count
        this.comments_count = ret.comments_count
      })
    },
    replaceUrl (imgUrl) {
      return replaceUrl(imgUrl)
    },
    onScrollHandle (pos) {
      const _header = this.$refs._header
      Opacity(pos, _header)
    },
    // 想看点击事件
    wantToSeeClick () {
      this.want_icon = !this.want_icon
      const item = {
        id: this.$route.params.id,
        avatars: replaceUrl(this.item.poster), // 海报图
        movie_name: this.item.title, // 电影名称
        pubdate: this.item.pubdates,
        tag: this.item.tag
      }
      if (this.want_icon === true) {
        this.save_data({ item, type_: '__want_to_see__' })
      } else {
        this.delete_data({ item, type_: '__want_to_see__' })
      }
    },
    // 看过点击事件
    watchedClick () {
      this.watch_icon = !this.watch_icon
      const item = {
        id: this.$route.params.id,
        avatars: replaceUrl(this.item.poster), // 海报图
        movie_name: this.item.title, // 电影名称
        pubdate: this.item.pubdates,
        tag: this.item.tag
      }
      if (this.watch_icon === true) {
        this.save_data({ item, type_: '__seen__' })
      } else {
        this.delete_data({ item, type_: '__seen__' })
      }
    },
    validateCollectExist () {
      const id_ = this.$route.params.id
      if (has_collect(id_, '__want_to_see__')) {
        this.want_icon = true
      }
      if (has_collect(id_, '__seen__')) {
        this.watch_icon = true
      }
    }
  },
  created () {
    this.getDetail()
    this.validateCollectExist()
  }
}
</script>

<style lang="stylus" scoped>
  .detail
    width: 100%
    position: absolute;
    left:0
    bottom:0
    top:0
    right:0
    overflow: hidden;
    .abc
      height: 100%
      .poster
        text-align: center;
        padding: 50px 0 20px 0;
        background-color: #555;
        &>img
          width: 50%
      .move-info
        padding: 0 .4rem
        .base-info
          display: flex
          height:140px
          .desc
            flex:70% 0 0
            display: flex
            flex-direction: column
            justify-content: space-around
            .name
              font-size: .36rem
              color: #333;
              padding: .2rem 0 .1rem 0;
            &>span
              font-size: .24rem
          .rank
            flex:1
            height: 1.4rem;
            margin-top: .3rem;
            padding: .2rem .3rem
            text-align: center
            display: flex
            flex-direction: column
            justify-content: space-around
            box-shadow: 0px 0px 5px #ccc
            background-color: #f8f8f8
            .origin, .reviews
              font-size: .24rem;
              color: #777;
            .score
              font-size: .36rem;
              color: #333;
        .person
          display: flex
          width: 100%
          height: .7rem
          margin-top: .4rem
          line-height: .7rem
          .want
            flex:1
            border-radius: .1rem
            text-align: center
            border:.02rem solid #42bd56
            margin-right: 20px;
            .do_see
              color: red
          .watched
            flex:2
            border-radius: .1rem
            text-align: center
            border: .02rem solid #42bd56
            .seen
              color: goldenrod
        .summary
          padding-top: .4rem
          margin-top: .4rem
          position: relative;
          &:after
            content: ''
            border-top: 1px solid #ccc
            display: block
            width: 100%
            position: absolute;
            left:0
            top:0
          .title
            font-size: .24rem
          .content
            padding-top: .24rem;
            font-size: .28rem;
            color: #333;
            line-height: .5rem;
        .cineaste
          padding: 30px 0;
          white-space: nowrap;
          overflow: hidden;
          font-size: 0;
          position: relative;
          .title
            font-size: .24rem
            padding-bottom: 20px;
          &:after
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            border-bottom: 1px solid #ccc;
            width: 100%;
            content: '';
</style>
