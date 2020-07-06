import { getData } from './home'
import axios from 'axios'
import { apikey } from './config'

// top250
export const _top_movie = function (start) {
  const url = '/v2/movie/top250'
  return getData(url, start)
}
function data (url, title) {
  return axios.get(url, { params: { apikey } }).then(ret => {
    const res = ret.data
    var ress = []
    if ('subject' in res.subjects[0]) {
      ress = res.subjects.map(a => ({
        id: a.subject.id,
        title: a.subject.title,
        img: a.subject.images.small,
        directors: a.subject.directors.map(b => b.name).join('/'),
        casts: a.subject.casts.map(a => a.name).join('/'),
        average: a.subject.rating.average
      }))
    } else {
      ress = res.subjects.map(a => ({
        id: a.id,
        title: a.title,
        img: a.images.small,
        directors: a.directors.map(b => b.name).join('/'),
        casts: a.casts.map(a => a.name).join('/'),
        average: a.rating.average
      }))
    }
    const result = {
      ress,
      title
    }
    return Promise.resolve({
      result
    })
  })
}

// 口碑,北美票房,新片榜
export const getDatas = function (path) {
  var url = ''
  var title = ''
  if (path.includes('weekly')) {
    url = '/v2/movie/weekly'
    title = '本周口碑榜'
  } else if (path.includes('us_box')) {
    url = '/v2/movie/us_box'
    title = '北美票房榜'
  } else if (path.includes('new_movies')) {
    url = '/v2/movie/new_movies'
    title = '新片榜'
  }
  return data(url, title)
}
// 口碑
// export const weekly = function () {
//   const url = '/v2/movie/weekly'
//   return getData(url)
// }
//
// // 北美票房
// export const us_box = function () {
//   const url = '/v2/movie/us_box'
//   return getData(url)
// }
//
// // 新片榜
// export const new_movies = function () {
//   const url = '/v2/movie/new_movies'
//   return getData(url)
// }
