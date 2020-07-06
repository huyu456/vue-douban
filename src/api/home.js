import axios from 'axios'
import { apikey, getPubdate } from './config'
// import { numToFixed } from './detail'

function mapArr (res) {
  return res.subjects.map(a => ({
    id: a.id,
    title: a.title,
    img: a.images.small,
    directors: a.directors.map(b => b.name).join('/'),
    collect_count: a.collect_count,
    casts: a.casts.map(a => a.name).join('/'),
    pubdates: getPubdate(a.pubdates),
    average: a.rating.average
  }))
}

export function getData (url, start = 0) {
  return axios.get(url, { params: { apikey, count: 10, start } })
    .then((ret) => {
      const res = ret.data
      return Promise.resolve(mapArr(res))
    })
    .catch((e) => {
      console.log(e.message)
    })
}

export const hotMovies = function (start) {
  return getData('/v2/movie/in_theaters', start)
}

export const upComingMovie = function (start) {
  return getData('/v2/movie/coming_soon', start)
}
