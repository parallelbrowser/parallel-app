module.exports = function broadcastsStore (state, emitter) {
  state.currentBroadcast = null
  state.expandedBroadcasts = []

  emitter.on('pushState', () => {
    // clear page state
    state.currentBroadcast = null
  })

  state.loadCurrentBroadcast = async function (url) {
    try {
      state.currentBroadcast = await state.DB().getPostscript(url)
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }
}
