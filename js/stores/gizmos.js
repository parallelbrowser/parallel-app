const {getViewShopURL, getViewProfileURL} = require('../util')

module.exports = function gizmoStore (state, emitter) {
  state.error = null
  state.subgizmos = null
  state.shopGizmos = null
  state.currentGizmo = null
  state.expandedGizmos = []

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.subgizmos = null
    state.shopGizmos = null
    state.currentGizmo = null
    state.expandedGizmos = []
  })

  state.publishGizmo = async (values) => {
    try {
      await state.DB().gizmo(state.userProfile._origin, values)
      emitter.emit('pushState', getViewShopURL(state.userProfile))
    } catch (e) {
      console.error(e)
      state.error = e
    }
  }

  state.loadUserShopGizmos = async () => {
    try {
      state.shopGizmos = await state.DB(state.currentProfile).listGizmos({
        fetchAuthor: true,
        fetchReplies: true,
        countVotes: true,
        reverse: true,
        loadShop: true,
        checkIfSubscribed: state.userProfile._origin,
        author: state.currentProfile._origin
      })
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  state.loadUserSubgizmos = async () => {
    try {
      state.subgizmos = await state.DB(state.currentProfile).listGizmos({
        fetchAuthor: true,
        fetchReplies: true,
        countVotes: true,
        reverse: true,
        checkIfSubscribed: state.userProfile._origin,
        subscriber: state.currentProfile._origin
      })
    } catch (e) {
      state.error = e
      console.error(e)
    }
    emitter.emit('render')
  }

  state.toggleSubscribe = async function (gizmo) {
    try {
      if (gizmo.isSubscribed) {
        await state.DB().unsubscribe(state.userProfile._origin, gizmo)
        gizmo.isSubscribed = false
      } else {
        await state.DB().subscribe(state.userProfile._origin, gizmo)
        gizmo.isSubscribed = true
      }
    } catch (e) {
      state.error = e
      console.error(e)
    }
    state.loadUserShopGizmos()
    state.loadUserSubgizmos()
    emitter.emit('render')
  }

  state.loadCurrentGizmo = async function (url) {
    try {
      state.currentGizmo = await state.DB(state.currentProfile).getGizmo(url, {
        fetchAuthor: true,
        fetchReplies: true,
        countVotes: true,
        checkIfSubscribed: true,
        requester: state.userProfile._origin
      })
    } catch (e) {
      state.error = e
      console.error(e)
    }
    emitter.emit('render')
  }

  state.setupParallel = async function () {
    try {
      await state.loadProfile('dat://7ab172e713e390a19c732c3dc47c99dda08d301e7f301d1845199cd3e50b2a00', {getFollowProfiles: true})
      await state.toggleFollow(state.currentProfile)
      await state.loadUserShopGizmos()
      state.shopGizmos = state.shopGizmos.filter(sg => {
        return sg.gizmoName !== 'jQuery Full'
      })
      await state.DB().subscribeMany(state.userProfile._origin, state.shopGizmos)
    } catch (e) {
      state.error = e
      console.log(e)
    }
    emitter.emit('pushState', getViewProfileURL(state.userProfile))
  }

  emitter.on('gizmo-like', async gizmo => {
    state.DB().vote(state.userArchive, {vote: 1, subject: gizmo._url})
    gizmo.votes.currentUsersVote = 1
    gizmo.votes.value++
    gizmo.votes.up++
    gizmo.votes.upVoters.push(state.userArchive.url)
    emitter.emit('render')
  })

  emitter.on('gizmo-unlike', async gizmo => {
    state.DB().vote(state.userArchive, {vote: 0, subject: gizmo._url})
    gizmo.votes.currentUsersVote = 0
    gizmo.votes.value--
    gizmo.votes.up--
    gizmo.votes.upVoters = gizmo.votes.upVoters.filter(u => u !== state.userArchive.url)
    emitter.emit('render')
  })
}
