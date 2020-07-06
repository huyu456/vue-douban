import axios from 'axios'
import { apikey } from './config'
import { replaceUrl } from 'common/js/base'

const request = function (url) {
  return axios.get(url, { params: { apikey, count: 3 } })
    .then(ret => {
      const res = ret.data
      const arr = res.subjects.slice(0, 3)
      var images = []
      if ('subject' in res.subjects[0]) {
        images = arr.map(a => replaceUrl(a.subject.images.small))
      } else {
        images = arr.map(a => replaceUrl(a.images.small))
      }
      // eslint-disable-next-line no-unused-vars
      const x = [images[0], images[1]] = [images[1], images[0]]
      return Promise.resolve({
        images
      })
    })
}

export const _top250 = function () {
  const url = '/v2/movie/top250'
  return request(url)
}

export const weekly = function () {
  const url = '/v2/movie/weekly'
  return request(url)
}

export const new_movies = function () {
  const url = '/v2/movie/new_movies'
  return request(url)
}

export const us_box = function () {
  const url = '/v2/movie/us_box'
  return request(url)
}
