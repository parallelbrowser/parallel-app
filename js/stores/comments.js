module.exports = function commentsStore (state, emitter) {
  emitter.on('change-comment-text', ({parentURL, text}) => {
    state.commentDrafts[parentURL] = text
    emitter.emit('render')
  })

  emitter.on('submit-comment', async (parent) => {
    try {
      await state.DB().broadcast(
        state.userProfile._origin,
        {text: state.commentDrafts[parent._url], threadParent: parent._url})
      state.userProfile.numBroadcasts++
    } catch (e) {
      console.error(e)
      return
    }

    // clear form
    state.commentDrafts[parent._url] = ''
    emitter.emit('render')
    if (parent.gizmoName) {
      state.loadUserShopGizmos()
      state.loadUserSubgizmos()
      state.loadCurrentGizmo(parent._url)
    } else {
      state.loadMainFeed() // TODO?
      state.loadCurrentPost(parent._url)
    }
  })
}
