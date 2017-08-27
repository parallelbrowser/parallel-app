module.exports = function broadcastsStore (state, emitter) {
  state.currentBroadcast = null
  state.expandedBroadcasts = []

  emitter.on('pushState', () => {
    // clear page state
    state.currentBroadcast = null
  })

  state.loadCurrentBroadcast = async function (url) {
    try {
      state.currentBroadcast = await state.DB().getPost(state.userProfile._origin, url)
    } catch (e) {
      console.log('error in loadCurrentBroadcast', e)
      state.error = e
    }
    emitter.emit('render')
  }
}
