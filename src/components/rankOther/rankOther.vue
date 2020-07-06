<template>
  <div class="rank-other">
    <o_header :title="title"></o_header>
    <div class="rank-wrapper">
      <div class="scroll-list-wrap">
        <cube-scroll ref="scroll">
          <div class="rank-list">
            <ul>
              <rank-item v-for="(item, index) in datas" :key="item.id"
                         @click.native="handleClick(item.id)"
                         :item="item" :index="index"></rank-item>
            </ul>
          </div>
        </cube-scroll>
      </div>
    </div>
    <div v-show="!datas.length" class="loading-container">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import Header from 'base/commentHeader/commentHeader'
import RankItem from 'base/rankItem/rankItem'
import Loading from 'base/loading/loading'
import { getDatas } from '../../api/rank-item'

export default {
  name: 'rankOther',
  components: {
    o_header: Header,
    RankItem,
    Loading
  },
  data () {
    return {
      datas: [],
      title: ''
    }
  },
  methods: {
    getData () {
      const path = this.$route.path
      getDatas(path).then(ret => {
        const result = ret.result
        this.datas = result.ress
        this.title = result.title
      })
    },
    handleClick (id) {
      this.$router.push({
        path: `/movie/${id}`
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .rank-other
    position: fixed;
    left:0
    right: 0;
    top: 0
    bottom: 0;
    background: #ffffff
    z-index: 999
    .rank-wrapper
      position: fixed;
      top:1rem
      bottom:0
      left:0
      right:0
      .scroll-list-wrap
        height:100%
        .rank-list
          padding: 0 .3rem;
</style>
