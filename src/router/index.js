import Vue from 'vue'
import VueRouter from 'vue-router'
import comments from 'components/comments/comments'
import reviews from 'components/reviews/reviews'
import reviewDetail from 'components/reviewDetail/reviewDetail'
import celebrity from 'components/celebrity/celebrity'
import works from 'components/works/works'
import searchResult from 'components/search-result/search-result'
import rank from 'components/rank/rank'
import top250 from 'components/top250/top250'
import rankOther from 'components/rankOther/rankOther'
import userInfo from 'components/userInfo/userInfo'
import register from '../components/registered/registered'
import Login from 'components/login/login'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('@/components/Home/Home')
  },
  {
    path: '/movie/:id',
    name: 'Detail',
    component: () => import('@/components/Detail/Detail'),
    meta: {
      title: '详情'
    },
    children: [
      {
        path: 'comments',
        component: comments,
        meta: {
          title: '短评'
        }
      },
      {
        path: 'reviews',
        component: reviews,
        meta: {
          title: '影评'
        }
      },
      {
        path: 'review/:review_id',
        component: reviewDetail,
        meta: {
          title: '影评详情'
        }
      }
    ]
  },
  {
    path: '/celebrity/:id',
    name: 'celebrity',
    component: celebrity,
    meta: {
      title: '影人'
    },
    children: [
      {
        path: 'works',
        name: 'works',
        component: works,
        meta: {
          title: '全部作品'
        }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/components/search/search'),
    meta: {
      title: '搜索'
    },
    children: [
      {
        path: 'result',
        name: 'searchResult',
        component: searchResult,
        meta: {
          title: '搜索结果'
        }
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: rank,
    meta: {
      title: '排行'
    },
    children: [
      {
        path: 'top250',
        component: top250,
        meta: {
          title: '豆瓣Top250'
        }
      },
      {
        path: 'weekly',
        component: rankOther,
        meta: {
          title: '本周口碑'
        }
      },
      {
        path: 'us_box',
        component: rankOther,
        meta: {
          title: '北美票房'
        }
      },
      {
        path: 'new_movies',
        component: rankOther,
        meta: {
          title: '新片榜'
        }
      }
    ]
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/components/userCenter/userCenter'),
    meta: {
      title: '用户中心'
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: {
          title: '用户登录'
        }
      },
      {
        path: 'info',
        name: 'user-info',
        component: userInfo,
        meta: {
          title: '用户详情'
        }
      },
      {
        path: 'register',
        name: 'register',
        component: register,
        meta: {
          title: '注册'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const cookie = require('vue-cookie')
  const token = cookie.get('token')
  const refresh = cookie.get('refresh')
  if (token && to.name === 'login') {
    router.back()
  } else if (token === null && refresh) {
    axios.post('/api/token/refresh/', { refresh })
      .then(ret => {
        const data = ret.data
        cookie.set('token', data.access, { expires: '60m', domain: 'localhost' })
      })
  }
  window.document.title = to.meta.title
  next()
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
