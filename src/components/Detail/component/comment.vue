<template>
  <div class="comment">
    <cube-tab-bar v-model="selectedLabel"
                  show-slider
                  @change="changeHandler">
      <cube-tab v-for="item in getComment"
                :label="item.label"
                :key="item.label"
      ></cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="item in getComment"
                      :label="item.label"
                      :key="item.label">
        <div v-if="item.id === 0" v-show="!show" class="wrapper">
          <ul>
            <short-comment class="tab-panel-li"
                           v-for="(comment, index) in item.comments"
                           :key="index" :item="comment">
            </short-comment>
          </ul>
          <div class="more-content" @click="showAllComment">
            <span>全部短评{{comments_count}}个</span>
          </div>
        </div>
        <div v-if="item.id === 1" v-show="show" class="wrapper">
          <ul>
            <long-comment class="tab-panel-li"
                          @click.native="reviewDetail(comment.id)"
                          v-for="(comment, index) in item.comments.slice(0, 5)"
                          :key="index" :item="comment">
            </long-comment>
          </ul>
          <div class="more-content" @click="showAllReview">
            <span>全部影评{{reviews_count}}个</span>
          </div>
        </div>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>

<script>
import shortComment from 'base/shortComment/shortComment'
import longComment from 'base/longComment/longComment'
import { mapMutations } from 'vuex'

// 该组件开始存在一个问题，两列的数据由于高度不同，在切换不同评论时会出现底部会留有大空白
// 解决：先隐藏一个列表（display：none）会去除高度，在
export default {
  name: 'comment',
  props: {
    popular_reviews: {
      type: Array
    },
    popular_comments: {
      type: Array
    },
    reviews_count: {
      type: Number
    },
    comments_count: {
      type: Number
    }
  },
  components: {
    shortComment,
    longComment
  },
  data () {
    return {
      selectedLabel: '短评',
      comment_show: true,
      review_show: false,
      show: false
    }
  },
  methods: {
    changeHandler (key) {
      this.show = !this.show
      // this.$emit('change', label)
    },
    showAllComment () {
      this.$router.push({
        path: `${this.$route.params.id}/comments`
      })
    },
    showAllReview () {
      this.$router.push({
        path: `${this.$route.params.id}/reviews`
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
    })
  },
  computed: {
    getComment () {
      return [{
        label: '短评',
        id: 0,
        comments: this.popular_comments
      }, {
        label: '影评',
        id: 1,
        comments: this.popular_reviews
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.getElementsByClassName('cube-tab-bar-slider')[0].style.width = '50%'
    })
  }
}
</script>

<style lang="stylus" scoped>
  .comment
    background-color: #fff;
    padding-top: 20px;
    &::after
      content: ''
      height: .4rem
      display: block
    .wrapper
      padding-top: .4rem
      .more-content
        font-size: 14px;
        color: #42bd56;
        text-align: center;
        padding-bottom: 10px;
</style>
