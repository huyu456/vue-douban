import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const FILMMAKER_KEY = '__filmmaker__'
const WANT_TO_SEE_KEY = '__want_to_see__'
const SEEN = '__seen__'
const MAX_SEARCH_LEN = 10

export const save_search = function (query) {
  const searchs = storage.get(SEARCH_KEY, [])
  const index = searchs.findIndex(a => a === query)
  if (searchs.length === MAX_SEARCH_LEN) {
    searchs.pop(query)
  } else if (index !== -1) {
    searchs.splice(index, 1)
  }
  searchs.unshift(query)
  storage.set(SEARCH_KEY, searchs)
  return searchs
}
export const get_storage_data = function () {
  return storage.get(SEARCH_KEY, [])
}

export const deleteSearches = function () {
  storage.remove(SEARCH_KEY)
}

export const deleteWord = function (index) {
  const searchs = storage.get(SEARCH_KEY, [])
  searchs.splice(index, 1)
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function get_collect_datas (type_) {
  const keys = [FILMMAKER_KEY, WANT_TO_SEE_KEY, SEEN]
  if (keys.indexOf(type_) !== -1) {
    return storage.get(type_, [])
  } else {
    throw new Error('错误的KEY类型')
  }
}

export const save_collect = function (item, type_) {
  const collects = get_collect_datas(type_)
  const index = collects.findIndex(a => a === item)
  if (collects.length === MAX_SEARCH_LEN) {
    collects.pop(item)
  } else if (index !== -1) {
    collects.splice(index, 1)
  }
  collects.unshift(item)
  storage.set(type_, collects)
  return collects
}

export const delete_collect = function (item, type_) {
  const collects = get_collect_datas(type_)
  const items = collects.filter(a => a.id !== item.id)
  storage.remove(type_)
  storage.set(type_, items)
  return items
}

export const has_collect = function (id_, type_) {
  const results = storage.get(type_, [])
  const index = results.findIndex(a => a.id === id_)
  return index !== -1
}
