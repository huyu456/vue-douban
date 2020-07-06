<template>
  <div class="user-center">
    <div class="user">
      <div class="user-icon">
        <img src="../../common/image/user_normal.jpg" v-if="hasUser === 0">
        <img :src="userImg" v-else @click="userDetailClick">
      </div>
      <div class="info" v-if="hasUser === 0">
        <h1 class="login-reg" @click="loginClick">登录/注册</h1>
        <p class="desc">登录一下,内容更精彩</p>
      </div>
      <div class="username" v-else @click="userDetailClick">
        <h1>{{username}}</h1>
      </div>
    </div>
    <div class="tab">
      <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler">
        <cube-tab v-for="tab in tabs" :label="tab.label" :icon="tab.icon" :key="tab.label"></cube-tab>
      </cube-tab-bar>
      <div class="wrapper">
        <div style="height: 100%;overflow:hidden;">
          <cube-tab-panels v-model="selectedLabel">
            <cube-tab-panel v-for="tab in tabs" :label="tab.label" :key="tab.label">
              <cube-scroll ref="scroll" :data="tab.results">
                <ul class="list-wrapper">
                  <li class="tab-panel-li border-bottom" v-for="(result, index) in tab.results" :key="index"
                      @click="result.movie_name ? movieDetailClick(result.id) : filmmakerDetailClick(result.id)">
                    <div class="data">
                      <div class="data-img">
                        <img :src="result.avatars">
                      </div>
                      <div class="data-content" v-if="result.movie_name">
                        <p>电影名:{{result.movie_name}}</p>
                        <p>上映时间:{{result.pubdate}}</p>
                        <p>标签:{{result.tag}}</p>
                      </div>
                      <div class="data-content" v-else>
                        <p>中文名:{{result.name}}</p>
                        <p>英文名:{{result.name_en}}</p>
                        <p>
                          <span>代表作品:{{result.representative_work}}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </cube-scroll>
            </cube-tab-panel>
          </cube-tab-panels>
        </div>
      </div>
    </div>
    <v_footer></v_footer>
    <router-view/>
  </div>
</template>

<script>
import Footer from '../../views/Footer'
import { get_collect_datas } from '../../common/js/cache'

const filmmakerData = get_collect_datas('__filmmaker__')
const wantToSeeData = get_collect_datas('__want_to_see__')
const seenData = get_collect_datas('__seen__')

export default {
  name: 'userCenter',
  components: {
    v_footer: Footer
  },
  data () {
    return {
      selectedLabel: '想看',
      username: '',
      userImg: '',
      filmmaker: filmmakerData,
      want_to_see: wantToSeeData,
      seen: seenData
    }
  },
  methods: {
    loginClick () {
      this.$router.push({
        path: '/user/login/'
      })
    },
    clickHandler (label) {
    },
    checkLogin () {
      const token = this.$cookie.get('token')
      if (token) {
        const datas = token.split('.')
        const json_data = JSON.parse(this.$base64.Base64.decode(datas[1]))
        this.username = json_data.name
        this.userImg = json_data.profile_photo
      } else {
        this.username = ''
      }
    },
    // 用户详情
    userDetailClick () {
      const token = this.$cookie.get('token')
      if (token) {
        this.$router.push({
          path: '/user/info/'
        })
      } else {
        this.username = ''
      }
    },
    // 影人收藏详情
    filmmakerDetailClick (id) {
      this.$router.push({
        path: `/celebrity/${id}`
      })
    },
    // 电影收藏详情
    movieDetailClick (id) {
      this.$router.push({
        path: `movie/${id}`
      })
    }
  },
  computed: {
    hasUser () {
      return this.username.length
    },
    tabs () {
      return [{
        label: '想看',
        results: this.want_to_see
      }, {
        label: '看过',
        results: this.seen
      },
      {
        label: '影人',
        results: this.filmmaker
      }]
    }
  },
  beforeRouteEnter (to, from, next) {
    if (to.name === 'user') {
      // 获取到this实例
      next(vm => {
        vm.checkLogin()
        vm.filmmaker = get_collect_datas('__filmmaker__')
        vm.want_to_see = get_collect_datas('__want_to_see__')
        vm.seen = get_collect_datas('__seen__')
      })
    }
    next()
  },
  watch: {
    $route (to, from) {
      if (to.path === '/user/') {
        this.checkLogin()
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

<style lang="stylus" scoped>
  .user-center>>>.cube-tab-panels
    height: 100%
    overflow: hidden;
    .cube-tab-panels-group
      height: 100%
      .cube-tab-panel
        height: 100%
        overflow: hidden;
  .user-center
    position: relative;
    height: 100%
    .user
      box-sizing: border-box;
      width: 100%;
      height: 3rem;
      background: linear-gradient(#42bd56, #9ad57f);
      padding: .6rem 1rem .6rem .4rem;
      display: flex;
      align-items: center;
      .user-icon
        flex: 60px 0 0
        img
          border-radius: 50%
          overflow: hidden;
      .info
        flex: 1
        .login-reg
          font-weight:bold
        .desc
          font-size: .24rem
          margin-top: .2rem
      .username
        font-weight: bold
        color: #ffffff
    .wrapper
      position: fixed;
      left: 0
      right: 0
      top: 180px
      bottom: 61px
      .list-wrapper
        overflow: hidden
        .tab-panel-li
          .data
            height: 1.2rem
            padding: .2rem
            background: #ffffff
            display: flex
            .data-img
              flex: .8rem 0 0
              margin-right: .2rem
              padding: .1rem
              img
                width: .8rem
                height: 1rem
            .data-content
              flex: 1
              font-size: .24rem
              display: flex
              justify-content: space-around
              flex-direction: column;
              p
                margin-bottom: .1rem
</style>
