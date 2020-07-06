<template>
  <div class="search">
    <div class="header">
      <span class="iconfont search-icon">&#xe714;</span>
      <input placeholder="请输入电影/影人" v-model="word" @keyup.enter="handleSearch()">
      <span class="cancel" @click="cancel()">取消</span>
    </div>
    <div class="tag-list">
      <div class="movie-tag">
        <ul>
          <li v-for="(item, index) of search_list"
              @click="handleTag(item)"
              :key="index">{{item}}</li>
        </ul>
      </div>
      <div class="history">
        <h1 class="title">搜索历史</h1>
        <span class="iconfont" @click="deleteAllSearch">&#xe601;</span>
        <ul>
          <li v-for="(item, index) in list" :key="index" @click.prevent="handleHistory(item)">
            {{item}}
            <span class="iconfont" @click.prevent.stop="deleteOne(index)">&#xe784;</span>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { get_storage_data, deleteSearches, deleteWord } from 'common/js/cache'

export default {
  name: 'search',
  data () {
    return {
      word: '',
      list: [],
      search_list: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺']
    }
  },
  methods: {
    cancel () {
      this.$router.push('/')
    },
    handleSearch () {
      if (this.word) {
        this.save_history(this.word)
        this.$router.push({
          path: 'search/result',
          query: {
            q: this.word
          }
        })
      }
    },
    handleTag (item) {
      this.word = item
      this.save_history(item)
      this.$router.push({
        path: 'search/result',
        query: {
          q: this.word
        }
      })
    },
    ...mapActions({
      save_history: 'save_search_history'
    }),
    ...mapMutations([
      'SET_SEARCH_LIST'
    ]),
    // 删除所有搜索记录
    deleteAllSearch () {
      this.SET_SEARCH_LIST([])
      deleteSearches()
    },
    // 删除单个搜索记录
    deleteOne (index) {
      const list = deleteWord(index)
      this.SET_SEARCH_LIST(list)
    },
    // 点击搜索记录，在此查询
    handleHistory (item) {
      this.handleTag(item)
    }
  },
  computed: {
    ...mapGetters({
      searches: 'search_list'
    })
  },
  watch: {
    searches () {
      this.list = this.searches
    }
  },
  created () {
    if (this.searches.length === 0) {
      this.list = get_storage_data()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search
    position: relative
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
    .tag-list
      padding: .3rem;
    .movie-tag
      position: relative;
      padding: .4rem 0;
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
      ul
        &>li
          display: inline-block
          margin-right: .3rem;
          padding: .16rem .32rem;
          font-size: .28rem;
          color: #42bd56;
          border: 1px solid #42bd56;
          border-radius: .2rem;
          margin-bottom: .3rem;
    .history
      padding-top: .16rem
      .title
        font-size: .36rem
        display: inline-block
      &>span
        color: #000
        display: inline-block
        position: absolute;
        right: .3rem;
        font-size: .36rem
      ul
        li
          padding:.1rem 0
          font-size: .32rem
          span
            position: absolute;
            right:.3rem
          &:first-child
            margin-top: .2rem
</style>
