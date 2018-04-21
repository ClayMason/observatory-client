import { API_ROOT, NEW_SMALL_GROUP } from './constants'
import { $GET, $POST } from '@/store/lib/helpers'

// // // //

// SmallGroup module actions
// functions that causes side effects and can involve asynchronous operations.
export default {
  resetNewModel: ({ commit }) => {
    return commit('newModel', NEW_SMALL_GROUP)
  },
  fetchCollection: ({ state, commit, dispatch }) => {
    commit('fetching', true)

    // Fetches Collection from the server
    $GET(API_ROOT, { token: rootGetters['auth/token'] })
    .then((json) => {
      commit('collection', json)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // create SmallGroup
  create ({ commit, state }) {
    commit('fetching', true)

    // Fetches Collection from the server
    $POST(API_ROOT, {
      token: rootGetters['auth/token'],
      body: state.newModel
    })
    .then((json) => {
      // TODO - route to SmallGroup list
      console.log('CREATED NEW SmallGroup')
      console.log(json)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // update SmallGroup
  update ({ commit }, attributes) {
  },

  // destroy SmallGroup
  destroy ({ commit }, id) {
  }
}
