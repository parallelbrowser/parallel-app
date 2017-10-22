/* globals alert */
const {PARALLEL_PROFILE_URL} = require('../const')

module.exports = function parallelStore (state, emitter) {
  state.isRefreshed = false
  state.setupParallel = async function () {
    try {
      await state.loadProfile(PARALLEL_PROFILE_URL, {getFollowProfiles: true})
      await state.toggleFollow(state.currentProfile)
      await state.loadUserShopGizmos()
      state.shopGizmos = state.shopGizmos.filter(sg => {
        return sg.gizmoName !== 'jQuery -- JS' &&
          sg.gizmoName !== 'jQuery UI -- JS' &&
          sg.gizmoName !== 'jQuery UI -- CSS' &&
          sg.gizmoName !== 'xPath'
      })
      await state.DB().subscribeMany(state.userProfile._origin, state.shopGizmos)
      await state.DB().followMany(state.userProfile._origin, state.currentProfile.follows)
      state.currentProfile = state.userProfile
    } catch (e) {
      state.error = e
      console.log(e)
    }
    alert('You have finished setting up Parallel! Click "Home" to view your main feed.')
  }

  state.refreshNetwork = async function () {
    if (state.userProfile._origin !== PARALLEL_PROFILE_URL) {
      try {
        await state.loadProfile(PARALLEL_PROFILE_URL, {getFollowProfiles: true})
        const isFollowing = await state.DB().isFollowing(state.userProfile._origin, state.currentProfile._origin)
        if (!isFollowing) {
          await state.toggleFollow(state.currentProfile)
        }
        const follows = state.currentProfile.follows.filter(f => { f.url !== state.userProfile._origin })
        await state.DB().followMany(state.userProfile._origin, follows)
        state.currentProfile = state.userProfile
      } catch (e) {
        state.error = e
        console.log(e)
      }
      state.isRefreshed = true
    }
  }
}
