import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入moment.js 管理时间
import moment from 'moment'
// vue-bus
import VueBus from 'vue-bus'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 引入axios的拦截器
import 'common/js/axios_init'
// 把axios 作为Vue的原型属性
import axios from 'axios'
// md5
import md5 from 'js-md5'
// base64
import Base64 from 'js-base64'

// css
import 'common/css/reset.css' // 统一样式
import 'common/css/border.css' // 边框样式
import 'common/css/loadding.css' // 加载动画样式
import 'common/icon/iconfont.css'
import animated from 'animate.css'

Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.use(VueBus)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('common/image/error.png'),
  loading: require('common/image/loading.gif'),
  attempt: 1
})
Vue.use(animated)
Vue.prototype.$http = axios
// 引用vue-cookie
const vueCookie = require('vue-cookie')
Vue.use(vueCookie)
// 注册md5
Vue.prototype.$md5 = md5
// 注册base64
Vue.prototype.$base64 = Base64

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
