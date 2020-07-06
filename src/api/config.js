export const apikey = '0b2bdeda43b5688921839c8ecb20399b'

export const getPubdate = function (pubdates) {
  const moment = require('moment')
  if (pubdates.findIndex(a => a.includes('大陆')) !== -1) {
    const date = pubdates.filter(a => a.includes('大陆'))[0].replace(/\(.*?\)/, '')
    if (moment(date, moment.ISO_8601).isValid()) {
      return date + ' ' + moment(date).format('dddd')
    }
  }
  return '暂无信息'
}
