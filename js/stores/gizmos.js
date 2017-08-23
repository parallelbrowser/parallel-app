module.exports = function gizmoStore (state, emitter) {
  state.error = null
  state.gizmos = null

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.gizmos = null
  })

  state.loadUserGizmos = async () => {
    try {
      let gizmos = await state.DB(state.currentProfile).listGizmos({
        fetchAuthor: true,
        countVotes: true,
        reverse: true,
        author: state.currentProfile._origin
      })
      gizmos = gizmos.map(async g => {
        g.isSubscribed = await state.isSubscribed(g)
        return g
      })
      state.gizmos = await Promise.all(gizmos)
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  state.isSubscribed = async function (gizmo) {
    try {
      const val = await state.DB().isSubscribed(state.userProfile._origin, gizmo)
      return val
    } catch (e) {
      state.error = e
      console.error(e)
    }
  }

  state.loadCurrentGizmo = async function (url) {
    try {
      console.log('url in loadCurrentGizmo', url)
      state.currentGizmo = await state.DB().getGizmo(url)
      console.log('state.currentGizmo in loadCurrentGizmo', state.currentGizmo)
      state.currentGizmo.isSubscribed = await state.isSubscribed(state.currentGizmo)
    } catch (e) {
      state.error = e
      console.error(e)
    }
    emitter.emit('render')
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
