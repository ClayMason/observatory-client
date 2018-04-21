import { $PUT, $GET, $POST, $DEL } from '@/store/lib/helpers'
const API_ROOT = '/api/achievements'
// Achievement actions
export default {
  fetchCollection ({ commit }) {
    commit('fetching', true)

    // Fetches Collection from the server
    $GET(API_ROOT)
    .then((json) => {
      commit('collection', json)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },
  fetchModel ({ commit }, modelId) {
    commit('fetching', true)

    $GET(`${API_ROOT}/${modelId}`)
    .then((achievement) => {
      commit('model', achievement)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      throw err // TODO - better error handling
    })
  },
  create ({ commit }) {
    $POST(API_ROOT, {
      body: {
        title: 'sample-achievement',
        description: 'test123',
        date: new Date()
      }
    })
    .then((json) => {
      console.log('Create Post [Done]')
      console.log(json)
    })
    .catch((err) => {
      console.log('Error in create:\n' + err)
      throw err
    })
  },
  update ({ commit }, achievementId) {
    $PUT(API_ROOT + '/' + achievementId, {
      body: {
        title: 'achievement update',
        description: 'sample achievement update'
      }
    })
    .then((json) => {
      console.log('Successfully updated achievement ID: ' + achievementId)
      console.log(json)
    })
    .catch((err) => {
      console.log('Error in updating achievement ID: ' + achievementId)
      console.log(err)
      throw err
    })
  },
  destroy ({ commit }, achievementId) {
    $DEL(API_ROOT + '/' + achievementId)
    .then((json) => {
      console.log('Successfully deleted.')
      console.log(json)
    })
    .catch((err) => {
      console.log('Error in delete:\n' + err)
      throw err
    })
  }
}
