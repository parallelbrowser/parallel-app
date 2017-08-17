module.exports = function postscriptStore (state, emitter) {
  state.error = null
  state.postscripts = null

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.postscripts = null
  })

  state.loadUserPostscripts = async () => {
    try {
      state.postscripts = await state.DB(state.currentProfile).listPostscripts({
        fetchAuthor: true,
        countVotes: true,
        reverse: true,
        author: state.currentProfile._origin
      })
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  state.loadCurrentPostscript = async function (url) {
    try {
      state.currentPostscript = await state.DB().getPostscript(url)
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  emitter.on('postscript-like', async postscript => {
    state.DB().vote(state.userArchive, {vote: 1, subject: postscript._url})
    postscript.votes.currentUsersVote = 1
    postscript.votes.value++
    postscript.votes.up++
    postscript.votes.upVoters.push(state.userArchive.url)
    emitter.emit('render')
  })

  emitter.on('postscript-unlike', async postscript => {
    state.DB().vote(state.userArchive, {vote: 0, subject: postscript._url})
    postscript.votes.currentUsersVote = 0
    postscript.votes.value--
    postscript.votes.up--
    postscript.votes.upVoters = postscript.votes.upVoters.filter(u => u !== state.userArchive.url)
    emitter.emit('render')
  })
}
