<template>
  <div class="search-result">
    <div class="header">
      <span class="iconfont search-icon">&#xe714;</span>
      <input placeholder="请输入电影/影人"
             v-model="word"
             @keyup.enter="handleSearch"
             ref="input">
      <span class="cancel" @click="cancel()">取消</span>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll"
                   :data="items"
                   :options="options"
                   @pulling-up="onPullingUp">
        <ul>
          <li v-for="item of items" :key="item.id">
            <router-link :to="`/movie/${item.id}`">
              <img v-lazy="item.img" class="img">
              <div class="subject-info">
                <span class="subject-title">{{item.movie_name}}</span>
                <p class="rating">
                  <star :type1="1" :average="item.avatars" v-if="typeof item.avatars === 'number'"></star>
                  <span v-else class="info">{{item.avatars}}</span>
                  <span v-show="typeof item.avatars === 'number'" class="info">{{item.avatars}}</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div v-show="items.length === 0" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { search } from '../../api/search'
import Star from 'base/star/star'
import { mapActions } from 'vuex'
import Loading from 'base/loading/loading'

export default {
  name: 'search-result',
  components: {
    Star,
    Loading
  },
  data () {
    return {
      p: 0,
      items: [],
      word: '',
      count: 0,
      options: {
        pullUpLoad: {
          threshold: 60,
          stop: 40,
          txt: {
            more: '数据加载...',
            noMore: '没有更多数据了'
          }
        }
      }
    }
  },
  methods: {
    getSearch () {
      this.word = this.$route.query.q
      const word = this.$route.query.q || this.word
      search(word, this.p).then((ret) => {
        const res = ret.obj
        this.items = this.items.concat(res.items)
        this.count = res.count
      })
    },
    onPullingUp () {
      setTimeout(() => {
        if (this.count > this.p * 10) {
          this.p += 1
          this.getSearch()
        } else {
          this.$refs.scroll.forceUpdate(false, true)
        }
      }, 1000)
    },
    cancel () {
      this.$router.push({
        path: '/search'
      })
    },
    handleSearch () {
      if (this.word) {
        this.items = []
        this.p = 0
        this.save_history(this.word)
        this.$router.push({
          path: '/search/result',
          query: {
            q: this.word
          }
        })
        this.getSearch()
      }
    },
    ...mapActions({
      save_history: 'save_search_history'
    })
  },
  updated () {
    // 图像加载
    const img = document.getElementsByClassName('img')
    let count = 0
    const length = img.length
    if (length) {
      const timer = setInterval(() => {
        if (count === length) {
          this.$refs.scroll.refresh()
          clearInterval(timer)
        } else if (img[count] && img[count].complete) {
          count++
        }
      }, 100)
    }
  },
  created () {
    this.getSearch()
  }
}
</script>

<style lang="stylus" scoped>
  .search-result
    position: fixed;
    top:0
    left:0
    right:0
    bottom:0
    z-index: 100
    background:#ffffff
    .header
      display: flex
      height:1rem
      background: pink
      width: 100%
      box-sizing: border-box;
      align-items: center;
      padding: .2rem
      /*background: #42bd56;*/
      .search-icon
        position: absolute
        top: .36rem;
        left: .4rem;
        font-size: .28rem;
        color: #777;
      &>input
        flex: 1
        padding-left: .6rem;
        height: .6rem;
        line-height: .6rem;
        border-radius: .1rem;
        background: #fff;
        color: #333;
        font-size: .28rem;
        caret-color: #333333;
      .cancel
        display: inline-block
        text-align: center;
        font-size: .32rem;
        color: #fff;
        margin-left: .2rem;
    .scroll-list-wrap
      height:calc(100% - 1.2rem)
      padding: .2rem
      overflow: hidden;
      ul
        li
          border-bottom: 1px solid #F2F2F2;
          overflow: hidden;
          a
            display: block;
            overflow: hidden;
            img
              float: left;
              padding: .2rem 0;
              width: .8rem;
              height:1.08rem
            .subject-info
              display: block;
              padding: .2rem 0;
              overflow: hidden;
              .subject-title
                display: block;
                padding-left: .2rem;
                font-size: .34rem;
                color: #494949;
              .rating
                padding-left: .2rem;
                .star
                  font-size: .24rem;
                  height: .28rem;
                  vertical-align: middle;
                  display: inline-block
                  margin-top: .1rem
                .info
                  font-size: .24rem
</style>
