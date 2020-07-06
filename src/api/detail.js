import axios from 'axios'
import { apikey } from './config'

// 获取电影在大陆的发布日期
function getPubdate (pubdates) {
  return pubdates.filter(a => a.includes('大陆'))[0]
}

// 拼接字符串
function joinStr (list) {
  return list.join('/')
}

// 合并导演和演员信息
function getActor (directors, casts) {
  const length = directors.length
  const list = directors.concat(casts)
  const arr = list.map((a, index) => ({
    id: a.id,
    name: a.name,
    img: a.avatars !== null ? a.avatars.small : '',
    identity: index < length ? '导演' : '&nbsp;'
  }))
  return arr.filter(c => c.id !== null)
}

// 对数字保留1位小数
function numToFixed (num) {
  return num.toFixed(1)
}

export const detailData = function (id) {
  const url = `/v2/movie/subject/${id}`
  return axios.get(url, { params: { apikey } }).then((ret) => {
    const res = ret.data
    return Promise.resolve({
      average: numToFixed(res.rating.average), // 评分
      original_title: res.original_title, // 原名
      ratings_count: res.ratings_count, // 观看人数
      title: res.title, // 电影名
      durations: res.durations[0], // 片长
      pubdates: getPubdate(res.pubdates),
      tag: joinStr([res.year].concat(res.genres)),
      poster: res.images.medium,
      summary: res.summary,
      actor: getActor(res.directors, res.casts),
      popular_reviews: res.popular_reviews,
      popular_comments: res.popular_comments,
      comments_count: res.comments_count, // 短评
      reviews_count: res.reviews_count // 长评
    })
  })
}

export const request = function (url, start) {
  return axios.get(url, { params: { apikey, start: start, count: 20 } })
    .then((ret) => {
      const res = ret.data
      return Promise.resolve({
        res
      })
    })
}

// 所有短评
export const allComment = function (id, start) {
  const url = `/v2/movie/subject/${id}/comments`
  return request(url, start)
}
// 所有影评
export const allreview = function (id, start) {
  const url = `/v2/movie/subject/${id}/reviews`
  return request(url, start)
}
// 影评详情
export const reviewDetail = function (id) {
  const url = `/v2/movie/review/${id}`
  return axios.get(url, { params: { apikey } })
    .then((ret) => {
      const res = ret.data
      return Promise.resolve({
        res
      })
    })
}
