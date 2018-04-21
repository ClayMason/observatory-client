import { API_ROOT } from './constants'
import { $POST } from '@/store/lib/helpers'

// // // //

// ClassYear module actions
// functions that causes side effects and can involve asynchronous operations.
export default {
  // POSTs a new attendance code
  generateAttendanceCode ({ state, commit }) {
    // Assembles body for new ClassYear API request
    let api = API_ROOT + '/daycode'

    commit('fetching', true)
    $POST(api, {
      token: rootGetters['auth/token'],
      body: {
        bonusDay: false
      }
    })
    .then((res) => {
      commit('daycode', res.code)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },
  // POSTs a new bonus session attendance code
  generateBonusCode ({ state, commit }) {
    // Assembles body for new ClassYear API request
    let api = API_ROOT + '/daycode'

    commit('fetching', true)
    $POST(api, {
      token: rootGetters['auth/token'],
      body: {
        bonusDay: true
      }
    })
    .then((res) => {
      commit('daycode', res.code)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  }
}
