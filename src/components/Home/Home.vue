<template>
  <div class="home">
    <v_header></v_header>
    <div class="tab">
      <cube-tab-bar v-model="selectedLabel"
                    show-slider
                    :use-transition="disabled"
                    ref="tabNav"
                    :data="tabLabels">
      </cube-tab-bar>
      <div class="tab-slide-container">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <!-- 正在上映 -->
          <cube-slide-item class="slide1">
            <cube-scroll
              :data="hotMovie"
              ref="hot_movie_scroll"
              @pulling-up="onPullingUp"
              :options="scrollOptions">
              <ul class="list-wrapper">
                <item v-for="item of hotMovie" :key="item.id" :item="item" @click.native="handleClick(item.id)"></item>
              </ul>
            </cube-scroll>
          </cube-slide-item>
          <!-- 即将上映 -->
          <cube-slide-item class="slide2">
            <cube-index-list :data="upcomingFilms"
                             @pulling-up="onPullingUp2"
                             ref="indexList"
                             :options="scrollOptions">
              <cube-index-list-group
                v-for="(group, index) in upcomingFilms"
                :key="index"
                :group="group">
                <cube-index-list-item
                  v-for="(item, index) in group.items"
                  :key="index"
                  :item="item"
                >
                  <ul class="list-wrapper">
                    <item :item="item" @click.native="handleClick(item.id)"></item>
                  </ul>
                </cube-index-list-item>
              </cube-index-list-group>
            </cube-index-list>
          </cube-slide-item>
        </cube-slide>
        <div v-show="!hotMovie.length" class="loading-container">
          <loading></loading>
        </div>
      </div>
    </div>
    <v_footer></v_footer>
  </div>
</template>

<script>
import Header from '../../views/Header'
import Item from 'base/Item/Item'
import Footer from '../../views/Footer'
import Loading from 'base/loading/loading'
import { hotMovies, upComingMovie } from 'api/home'
import { replaceUrl, findIndex, arrGroup } from 'common/js/base'

export default {
  name: 'Home',
  components: {
    v_header: Header,
    v_footer: Footer,
    Item,
    Loading
  },
  data () {
    return {
      selectedLabel: '正在热映',
      disabled: false,
      tabLabels: [{
        label: '正在热映'
      }, {
        label: '即将上映'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        pullUpLoad: {
          threshold: 30,
          txt: {
            more: '数据加载...',
            noMore: '没有更多数据了'
          }
        },
        click: false,
        directionLockThreshold: 5
      },
      hotMovie: [], // 正在热映
      hotMovieStar: 0,
      hotMovieEnd: false,
      upcomingFilms: [], // 即将上映
      upcomingFilmsStar: 0,
      upcomingFilmsEnd: false
    }
  },
  methods: {
    _hotMovies () {
      hotMovies(this.hotMovieStar).then((ret) => {
        if (ret.length > 0) {
          this.hotMovie = this.hotMovie.concat(ret)
        } else {
          this.hotMovieEnd = true
          this.$refs.hot_movie_scroll.forceUpdate(false, true)
        }
      })
    },
    _upComing () {
      upComingMovie(this.upcomingFilmsStar).then((ret) => {
        if (ret.length > 0) {
          this.upcomingFilms = this.upcomingFilms.concat(arrGroup(ret))
        } else {
          this.upcomingFilmsEnd = true
          // 如果没有新数据
          this.$refs.indexList.forceUpdate(false, true)
        }
      })
    },
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    // 下拉刷新
    onPullingUp () {
      setTimeout(() => {
        if (this.hotMovieEnd === false) {
          this.hotMovieStar += 10
          this._hotMovies()
        } else {
          this.$refs.hot_movie_scroll.forceUpdate(false, true)
        }
      }, 1000)
    },
    onPullingUp2 () {
      setTimeout(() => {
        if (this.upcomingFilmsEnd === false) {
          this.upcomingFilmsStar += 10
          this._upComing()
        } else {
          this.$refs.indexList.forceUpdate(false, true)
        }
      }, 1000)
    },
    replaceUrl (imgUrl) {
      return replaceUrl(imgUrl)
    },
    handleClick (id) {
      this.$router.push({
        path: `/movie/${id}`
      })
    }
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  created () {
    this._hotMovies()
    this._upComing()
  }
}
</script>

<style lang="stylus" scoped>
  /*解决导航栏挡住内容*/
  /*关闭右侧显示*/
  .slide2>>>.cube-index-list-nav
    display: none
  .home
    width: 100%;
    height: 100%;
    position: relative;
    .tab
      .tab-slide-container
        position: fixed
        top: 74px
        left: 0
        right: 0
        bottom: 61px;
        .list-wrapper
          overflow: hidden
        .slide2,.slide1
          margin-top: 5px
</style>
