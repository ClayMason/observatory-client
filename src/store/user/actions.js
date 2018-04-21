import _ from 'lodash'
import { $GET, $POST, $PUT } from '@/store/lib/helpers'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'
import { API_ROOT, SET_ROLE_NOTIFICATIONS, ACTIVATE_NOTIFICATIONS, DEACTIVATE_NOTIFICATIONS } from './constants'

// // // //

// User module actions
// functions that causes side effects and can involve asynchronous operations.
export default {
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS,
  filteredCollection: ({ state, commit, dispatch }) => {
    let filteredCollection = _.chain(state.collection)
    .filter(u => {
      let tech = u.tech || []
      const filter = state.filter.toLowerCase()
      // Checks filter against
      let flag = u.name.toLowerCase().indexOf(filter) !== -1
      // Checks filter again the user's tech tags
      for (let i = 0; i < tech.length; i++) {
        let tag = tech[i].toLowerCase()
        if (tag.indexOf(filter) !== -1) {
          flag = true
          break
        }
      }
      return flag
    })
    .orderBy(['name'], [state.orderBy])
    .value()

    commit('filteredCollection', filteredCollection)
  },
  fetchCollection: ({ dispatch, commit, state }) => {
    commit('fetching', true)

    // Fetches either active or inactive users
    let apiRoute = API_ROOT
    if (state.showingInactive) {
      apiRoute += '/past'
    }

    // Fetches Collection from the server
    $GET(apiRoute)
    .then((json) => {
      commit('fetching', false)
      commit('collection', json)
      dispatch('filteredCollection')
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // fetchAdminCollection
  // Admin-only user collection for /admin/users
  fetchAdminCollection: ({ commit, state }) => {
    commit('fetching', true)

    // Fetches either active or inactive users
    let apiRoute = API_ROOT + '/adminstats'

    // Fetches Collection from the server
    $GET(apiRoute)
    .then((json) => {
      commit('fetching', false)
      commit('collection', json)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // fetchUser
  // Fetches an individual user from the server
  fetchUser ({ store, commit }, userID) {
    commit('fetching', true)
    $GET(`/api/users/${userID}`)
    .then((user) => {
      commit('model', user)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },

  // setUserRole
  // Updates an individual User's role
  // @permissions Admin
  setUserRole ({ commit }, user) {
    commit('fetching', true)

    // POST /api/users/:id/role
    $POST(API_ROOT + '/' + user._id + '/role', {
      body: { role: user.role }
    })
    .then((json) => {
      commit('notification/add', SET_ROLE_NOTIFICATIONS.SUCCESS, { root: true })
      commit('fetching', false)
    })
    .catch((err) => {
      commit('notification/add', SET_ROLE_NOTIFICATIONS.ERROR, { root: true })
      commit('fetching', false)
      throw err
    })
  },

  // activateUser
  // Activates an individual User
  activateUser ({ commit }, user) {
    commit('fetching', true)

    // PUT /api/users/:id/activate
    $PUT(API_ROOT + '/' + user._id + '/activate')
    .then((json) => {
      user.active = true
      commit('notification/add', ACTIVATE_NOTIFICATIONS.SUCCESS, { root: true })
      commit('fetching', false)
    })
    .catch((err) => {
      commit('notification/add', ACTIVATE_NOTIFICATIONS.ERROR, { root: true })
      commit('fetching', false)
      throw err
    })
  },

  // deactivateUser
  // Deactivates an individual User
  deactivateUser ({ commit }, user) {
    commit('fetching', true)

    // PUT /api/users/:id/activate
    $PUT(API_ROOT + '/' + user._id + '/deactivate')
    .then((json) => {
      user.active = false
      commit('notification/add', DEACTIVATE_NOTIFICATIONS.SUCCESS, { root: true })
      commit('fetching', false)
    })
    .catch((err) => {
      commit('notification/add', DEACTIVATE_NOTIFICATIONS.ERROR, { root: true })
      commit('fetching', false)
      throw err
    })
  }
}
