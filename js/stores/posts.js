module.exports = function postsStore (state, emitter) {
  state.currentPost = null
  state.expandedPosts = []

  emitter.on('pushState', () => {
    // clear page state
    state.currentPost = null
  })

  state.loadCurrentPost = async function (url) {
    try {
      state.currentPost = await state.DB().getPost(state.userProfile._origin, url)
    } catch (e) {
      console.log('error in loadCurrentPost', e)
      state.error = e
    }
    emitter.emit('render')
  }
}
