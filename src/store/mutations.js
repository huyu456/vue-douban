import * as types from './mutation-types'

const matutations = {
  [types.SET_REVIEW_ID] (state, reviewId) {
    state.reviewId = reviewId
  },
  [types.SET_SEARCH_LIST] (state, list) {
    state.search_list = list
  },
  [types.SET_FILMMAKER_COLLECT] (state, list) {
    state.filmmaker_collection = list
  },
  [types.SET_WANT_TO_SEE] (state, list) {
    state.want_to_see = list
  },
  [types.SET_SEEN] (state, list) {
    state.seen = list
  }
}
export default matutations
