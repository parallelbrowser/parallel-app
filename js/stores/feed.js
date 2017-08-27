module.exports = function feedStore (state, emitter) {
  state.error = null
  state.broadcasts = null

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.broadcasts = null
  })

  state.loadMainFeed = async () => {
    try {
      state.broadcasts = await state.DB().listPosts({
        fetchAuthor: true,
        fetchReplies: true,
        countVotes: true,
        reverse: true,
        fetchGizmo: true,
        requester: state.userProfile._origin
      })
    } catch (e) {
      state.error = e
      console.log('error in load main feed', e)
    }
    emitter.emit('render')
  }

  state.loadUserBroadcasts = async () => {
    try {
      state.broadcasts = await state.DB(state.currentProfile).listPosts({
        fetchAuthor: true,
        fetchReplies: true,
        countVotes: true,
        reverse: true,
        author: state.currentProfile._origin,
        fetchGizmo: true,
        requester: state.userProfile._origin
      })
    } catch (e) {
      state.error = e
      console.log('error in load user feed', e)
    }
    emitter.emit('render')
  }

  emitter.on('like', async broadcast => {
    state.DB().vote(state.userArchive, {vote: 1, subject: broadcast._url})
    broadcast.votes.currentUsersVote = 1
    broadcast.votes.value++
    broadcast.votes.up++
    broadcast.votes.upVoters.push(state.userArchive.url)
    emitter.emit('render')
  })

  emitter.on('unlike', async broadcast => {
    state.DB().vote(state.userArchive, {vote: 0, subject: broadcast._url})
    broadcast.votes.currentUsersVote = 0
    broadcast.votes.value--
    broadcast.votes.up--
    broadcast.votes.upVoters = broadcast.votes.upVoters.filter(u => u !== state.userArchive.url)
    emitter.emit('render')
  })
}
