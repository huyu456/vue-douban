export const replaceUrl = function (srcUrl) {
  if (srcUrl !== undefined) { // 图片防盗链处理
    return ('https://images.weserv.nl/?url=' + srcUrl.replace(/http\w{0,1}:\/\//, ''))
  }
}
function findIndex (ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}
export { findIndex }

export const arrGroup = function (arr) {
  const map = {}
  const dest = []
  for (var i = 0; i < arr.length; i++) {
    var ai = arr[i]
    if (!map[ai.pubdates]) {
      dest.push({
        name: ai.pubdates,
        items: [ai]
      })
      map[ai.pubdates] = ai
    } else {
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j]
        if (dj.name === ai.pubdates) {
          dj.items.push(ai)
          break
        }
      }
    }
  }
  return dest
}

// 获取当前一周的日期
export const get_week_date = function () {
  const moment = require('moment')
  const weekOfday = moment().format('E')
  // 第二步: 获取本周周一的日期
  const lastMonday = moment().subtract(weekOfday - 1, 'days').format('MMMDo')
  // 第三步: 获取本周周末的日期
  const lastSunday = moment().add(7 - weekOfday, 'days').format('MMMDo')
  return `${lastMonday}-${lastSunday}`
}

// header作透明处理
export const Opacity = function (pos, _header) {
  // 改变header透明度
  const height = Math.abs(pos.y)
  if (height === 0) {
    _header.$el.style.opacity = 1
  } else if (height > 50) {
    let opacity = height / 100
    opacity = opacity > 0.5 ? 0.5 : opacity
    _header.$el.style.opacity = opacity
  }
}
