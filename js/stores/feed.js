module.exports = function feedStore (state, emitter) {
  state.error = null
  state.posts = null

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.posts = null
  })

  state.loadMainFeed = async () => {
    try {
      state.posts = await state.DB().listPosts({
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

  state.loadUserPosts = async () => {
    try {
      state.posts = await state.DB(state.currentProfile).listPosts({
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

  emitter.on('like', async post => {
    state.DB().vote(state.userArchive, {vote: 1, subject: post._url})
    post.votes.currentUsersVote = 1
    post.votes.value++
    post.votes.up++
    post.votes.upVoters.push(state.userArchive.url)
    emitter.emit('render')
  })

  emitter.on('unlike', async post => {
    state.DB().vote(state.userArchive, {vote: 0, subject: post._url})
    post.votes.currentUsersVote = 0
    post.votes.value--
    post.votes.up--
    post.votes.upVoters = post.votes.upVoters.filter(u => u !== state.userArchive.url)
    emitter.emit('render')
  })
}
