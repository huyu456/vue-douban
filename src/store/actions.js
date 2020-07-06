import * as types from './mutation-types'

import { save_search, save_collect, delete_collect } from '../common/js/cache'

export const save_search_history = function ({ commit }, query) {
  commit(types.SET_SEARCH_LIST, save_search(query))
}

export const save_data = function ({ commit }, { item, type_ }) {
  if (type_ === '__filmmaker__') {
    commit(types.SET_FILMMAKER_COLLECT, save_collect(item, type_))
  } else if (type_ === '__want_to_see__') {
    commit(types.SET_WANT_TO_SEE, save_collect(item, type_))
  } else if (type_ === '__seen__') {
    commit(types.SET_SEEN, save_collect(item, type_))
  } else {
    throw new Error('出现了错误!')
  }
}

export const delete_data = function ({ commit }, { item, type_ }) {
  if (type_ === '__filmmaker__') {
    commit(types.SET_FILMMAKER_COLLECT, delete_collect(item, type_))
  } else if (type_ === '__want_to_see__') {
    commit(types.SET_WANT_TO_SEE, delete_collect(item, type_))
  } else if (type_ === '__seen__') {
    commit(types.SET_SEEN, delete_collect(item, type_))
  } else {
    throw new Error('出现了错误!')
  }
}
