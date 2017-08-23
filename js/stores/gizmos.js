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
      console.log('gizmos before sub check', gizmos)
      gizmos = gizmos.map(async g => {
        g.isSubscribed = await state.isSubscribed(g)
        return g
      })
      console.log('gizmos after mapping', gizmos)
      // state.gizmos = await Promise.all(gizmos.map(async g => {
      //   g.isSubscribed = await state.isSubscribed(g)
      // }))
      state.gizmos = await Promise.all(gizmos)
      console.log('gizmos after loading', state.gizmos)
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  state.isSubscribed = async function (gizmo) {
    console.log('gizmo in isSubscribed app', gizmo)
    try {
      const val = await state.DB().isSubscribed(state.userProfile._origin, gizmo)
      console.log('val in isSubscribed app', val)
      return val
    } catch (e) {
      state.error = e
      console.error(e)
    }
  }

  state.loadShopGizmos = async () => {
    try {
      state.gizmos = await state.DB(state.currentProfile).listGizmos({
        fetchAuthor: true,
        countVotes: true,
        reverse: true,
        author: state.currentProfile._origin
      }).filter(g => {
        return g.gizmoOriginArchive === state.currentProfile._origin
      })
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  state.loadCurrentGizmo = async function (url) {
    try {
      state.currentGizmo = await state.DB().getGizmo(url)
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
