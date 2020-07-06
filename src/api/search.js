import axios from 'axios'
import { replaceUrl } from 'common/js/base'

function getId (str) {
  return str.match(/\d+/g)[0]
}

function iGetInnerText (Str) {
  return Str.replace(/\s+/g, '').replace(/[\r\n]/g, '').replace(/[ ]/g, '')
}

export function search (word, p) {
  const url = `/douban_search/search/?q=${word}&t=movie&p=${p}`
  return axios.get(url).then((ret) => {
    const res = ret.data
    const html = res.html
    const arr = []
    if (html) {
      const regx = /href="(.*?)"><imgsrc="(.*?)"\/>.*?"subject-title">(.*?)<\/span>.*?<span>(.*?)<\/span><\/p>/ig
      const number_regx = /\d+/
      const results = iGetInnerText(html).match(regx)
      for (const i of results) {
        i.match(regx)
        const href = RegExp.$1
        const img = RegExp.$2
        const movie_name = RegExp.$3
        const avatars = RegExp.$4
        arr.push({
          id: getId(href),
          img: replaceUrl(img),
          movie_name: movie_name,
          avatars: number_regx.test(avatars) ? parseFloat(avatars) : avatars
        })
      }
    }
    const obj = {
      count: res.count, items: arr
    }
    return Promise.resolve({ obj })
  })
}
