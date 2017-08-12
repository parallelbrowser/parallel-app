module.exports = function prescriptsStore (state, emitter) {
  state.error = null
  state.prescripts = null

  emitter.on('pushState', () => {
    // clear page state
    state.error = null
    state.prescripts = null
  })

  state.loadUserPrescripts = async () => {
    try {
      state.prescripts = await state.DB(state.currentProfile).listPrescripts({
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

  state.toggleSubscribe = async prescript => {
    try {
      if (prescript.isSubscribed) {
        await state.DB().subscribe(state.userProfile._origin, prescript._origin)
        prescript.isSubscribed = false
      } else {
        await state.DB().subscribe(state.userProfile._origin, prescript._origin)
        prescript.isSubscribed = true
      }
    } catch (e) {
      state.error = e
    }
    emitter.emit('render')
  }

  emitter.on('prescript-like', async prescript => {
    state.DB().vote(state.userArchive, {vote: 1, subject: prescript._url})
    prescript.votes.currentUsersVote = 1
    prescript.votes.value++
    prescript.votes.up++
    prescript.votes.upVoters.push(state.userArchive.url)
    emitter.emit('render')
  })

  emitter.on('prescript-unlike', async prescript => {
    state.DB().vote(state.userArchive, {vote: 0, subject: prescript._url})
    prescript.votes.currentUsersVote = 0
    prescript.votes.value--
    prescript.votes.up--
    prescript.votes.upVoters = prescript.votes.upVoters.filter(u => u !== state.userArchive.url)
    emitter.emit('render')
  })
}
