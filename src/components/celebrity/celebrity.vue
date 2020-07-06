<template>
  <div class="celebrity">
    <c_header :title="title" ref="_header"></c_header>
    <div class="abc">
      <cube-scroll ref="scroll" @scroll="onScrollHandle"
                   v-show="works.length > 0"
                   :scroll-events="['scroll']">
        <div class="avatars">
          <img :src="replaceUrl(avatars)">
        </div>
        <div class="info">
          <div class="base-info">
            <h3 class="name">{{name}}</h3>
            <span class="en-name">{{name_en}}</span>
            <div class="collect" @click="collectClick">
              <span class="iconfont" :class="{not_collect: collect, already_collect: !collect}">&#xe687;</span>
              <span v-text="collect === true ? '收藏' : '已收藏'">收藏</span>
            </div>
          </div>
          <div class="summary" @click="showProfile">
            <p class="title">个人介绍</p>
            <p class="content">
              {{summary}}
              <span class="iconfont right">&#xe638;</span>
            </p>
          </div>
          <div class="works">
            <p class="title">代表作品</p>
            <div class="subject">
              <cube-scroll
                ref="scroll"
                direction="horizontal"
                class="horizontal-scroll-list-wrap">
                <ul class="list-wrapper">
                  <li class="list-item" v-for="item of works"
                      :key="item.subject.id" @click="movieDetail(item.subject.id)">
                    <img v-lazy="replaceUrl(item.subject.images.small)">
                    <h3 class="item-title">{{item.subject.title}}</h3>
                    <star :type1="1" :average="item.subject.rating.average"></star>
                    <span>{{item.subject.rating.average}}</span>
                  </li>
                </ul>
              </cube-scroll>
            </div>
          </div>
          <div class="all-works">
            <div class="item" @click="allWork">查看全部作品></div>
            <div class="item"></div>
            <div class="item"></div>
          </div>
          <div class="photos">
            <p class="title">影人图片</p>
            <div class="subject">
              <span v-if="photos.length === 0" class="no-more">暂时没有图片:)</span>
              <cube-scroll
                ref="scroll"
                direction="horizontal"
                v-else
                class="horizontal-scroll-list-wrap">
                <ul class="list-wrapper">
                  <li class="list-item" v-for="(item, index) in photos"
                      :key="item.id">
                    <img v-lazy="replaceUrl(item.icon)" @click="handleImgsClick(index)">
                  </li>
                </ul>
              </cube-scroll>
            </div>
          </div>
        </div>
      </cube-scroll>
      <div v-show="!works.length" class="loading-container">
        <loading></loading>
      </div>
    </div>
    <transition enter-active-class="animated fadeInUpBig" leave-active-class="animated fadeOutDownBig">
      <profile v-show="profile_show" :profile_info="profile_info">
        <div class="header">
          <div class="close" @click="closeProfile">
            <span class="iconfont">&#xe784;</span>
          </div>
          <div class="title">影人简介</div>
        </div>
      </profile>
    </transition>
    <router-view/>
  </div>
</template>

<script>
import Header from 'components/Detail/component/detailHeader'
import Profile from 'components/profile/profile'
import { replaceUrl, Opacity } from 'common/js/base'
import { celebrityDetail } from 'api/celebrity'
import Star from 'base/star/star'
import loading from 'base/loading/loading'
import { mapActions } from 'vuex'
import { has_collect } from '../../common/js/cache'

const FILMMAKER = '__filmmaker__'

export default {
  name: 'celebrity',
  components: {
    c_header: Header,
    Star,
    loading,
    Profile
  },
  data () {
    return {
      title: '影人',
      avatars: '',
      summary: '',
      works: [],
      photos: [],
      name_en: '',
      name: '',
      profile_info: {},
      profile_show: false,
      collect: true, // 用户收藏
      initialIndex: 0
    }
  },
  methods: {
    ...mapActions([
      'save_data',
      'delete_data'
    ]),
    replaceUrl (imgUrl) {
      return replaceUrl(imgUrl)
    },
    handleImgsClick (index) {
      this.initialIndex = index
      const params = {
        $props: {
          imgs: this.photos.map(a => replaceUrl(a.icon)),
          initialIndex: 'initialIndex' // 响应式数据的key名
        },
        $events: {
          change: (i) => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },
    getData () {
      celebrityDetail(this.$route.params.id).then((ret) => {
        const res = ret.res
        this.avatars = res.avatars.medium
        this.summary = res.summary
        this.works = res.works
        this.name_en = res.name_en
        this.name = res.name
        this.photos = res.photos
        this.profile_info = {
          birthday: res.birthday,
          born_place: res.born_place,
          constellation: res.constellation,
          gender: res.gender,
          name: res.name,
          aka: res.aka,
          name_en: res.name_en,
          summary: res.summary
        }
      })
    },
    movieDetail (id) {
      this.$router.push({
        path: `/movie/${id}`
      })
    },
    allWork () {
      this.$router.push({
        path: `${this.$route.params.id}/works`
      })
    },
    showProfile () {
      this.profile_show = true
    },
    closeProfile () {
      this.profile_show = false
    },
    onScrollHandle (pos) {
      const _header = this.$refs._header
      Opacity(pos, _header)
    },
    collectClick () {
      this.collect = !this.collect
      const item = {
        id: this.$route.params.id,
        name: this.name,
        name_en: this.name_en,
        representative_work: this.works.map(item => item.subject.title).slice(0, 2).join(','), // 代表作
        avatars: replaceUrl(this.avatars) // 封面图
      }
      if (this.collect === false) {
        this.save_data({ item, type_: FILMMAKER })
      } else {
        this.delete_data({ item, type_: FILMMAKER })
      }
    }
  },
  created () {
    this.getData()
    if (has_collect(this.$route.params.id, FILMMAKER)) {
      this.collect = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*cube-scroll-content必须要有,且使用穿透写法*/
  .subject>>>.cube-scroll-content
    display: inline-block
  .celebrity
    width: 100%
    position: absolute;
    left:0
    top:0
    bottom: 0;
    right:0
    .abc
      height: 100%
      overflow: hidden;
      .avatars
        text-align: center;
        padding: 1rem 0 .4rem 0;
        background-color: #555;
        &>img
          width: 50%
      .info
        padding: 15px 20px 0 20px;
        .base-info
          position: relative;
          .name
            font-size: .32rem;
            color: #333;
          .en-name
            display: inline-block;
            padding-top: .14rem;
            font-size: .28rem;
          .collect
            position: absolute;
            top: 0;
            right: 0;
            height: .6rem;
            line-height: .6rem;
            width: 1.6rem;
            text-align: center;
            font-size: .28rem;
            border: 1px solid #42bd56;
            border-radius: .2rem;
            .not_collect
              color: #cacaca
            .already_collect
              color: gold
            .text
              display: inline-block;
              font-size: .24rem;
              color: #42bd56;
      .summary
        position: relative;
        margin-top: .6rem;
        font-size: .28rem;
        .content
          position: relative;
          padding-right: .3rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          overflow: hidden;
          margin-top: .4rem;
          color: #333;
          line-height: .4rem;
          .right
            position: absolute;
            right: 0;
            bottom: 50%;
            color: #42bd56;
      .works, .photos
        margin-top: .6rem;
        padding-bottom: .4rem;
        font-size: .28rem;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        .subject
          width: 100%
          margin-top: 0.4rem;
          .no-more
            text-align: center;
            font-size: .24rem
            display: block
          .horizontal-scroll-list-wrap
            .list-wrapper
              white-space: nowrap
            .list-item
              display: inline-block
              font-size: .24rem
              text-align: center
              margin-right: 8px;
              img
                height: 120px;
                width: 90px;
                object-fit: cover
              .item-title
                color: #333;
                padding: 8px 0 5px 0;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
      .works:after
        content: ''
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        border-bottom: 1px solid #ccc;
        width: 100%
      .all-works
        padding-top: .4rem;
        font-size: .28rem;
</style>
