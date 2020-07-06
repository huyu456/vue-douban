import axios from 'axios'
import { apikey } from './config'

// 影人详情
export const celebrityDetail = function (id) {
  const url = `/v2/movie/celebrity/${id}`
  return axios.get(url, { params: { apikey } })
    .then((ret) => {
      const res = ret.data
      return Promise.resolve({
        res
      })
    })
}
// 影人参演作品
export const celebrityWorks = function (id, start) {
  const url = `/v2/movie/celebrity/${id}/works`
  return axios.get(url, { params: { apikey, start: start, count: 20 } })
    .then((ret) => {
      const works = ret.data.works
      return Promise.resolve(works.map(a => ({
        id: a.subject.id,
        title: a.subject.title,
        img: a.subject.images.small,
        directors: a.subject.directors.map(b => b.name).join('/'),
        collect_count: a.subject.collect_count,
        casts: a.subject.casts.map(a => a.name).join('/'),
        average: a.subject.rating.average
      })))
    })
}
// // 影人图片
// export const celebrityPhoto = function (id) {
//   const url = `/v2/movie/celebrity/${id}/photos`
//   return
// }
