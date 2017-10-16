const {getViewProfileURL} = require('../util')
const {PARALLEL_PROFILE_URL} = require('../const')

module.exports = function parallelStore (state, emitter) {
  state.setupParallel = async function () {
    try {
      await state.loadProfile(PARALLEL_PROFILE_URL, {getFollowProfiles: true})
      await state.toggleFollow(state.currentProfile)
      await state.loadUserShopGizmos()
      state.shopGizmos = state.shopGizmos.filter(sg => {
        return sg.gizmoName !== 'jQuery Full'
      })
      await state.DB().subscribeMany(state.userProfile._origin, state.shopGizmos)
      await state.DB().followMany(state.userProfile._origin, state.currentProfile.follows)
    } catch (e) {
      state.error = e
      console.log(e)
    }
    emitter.emit('pushState', getViewProfileURL(state.userProfile))
  }

  state.refreshNetwork = async function () {
    try {
      await state.loadProfile(PARALLEL_PROFILE_URL, {getFollowProfiles: true})
      await state.DB().followMany(state.userProfile._origin, state.currentProfile.follows)
    } catch (e) {
      state.error = e
      console.log(e)
    }
    emitter.emit('pushState', getViewProfileURL(state.userProfile))
  }
}
