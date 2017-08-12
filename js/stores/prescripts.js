module.exports = function prescriptStore (state, emitter) {
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

  state.loadCurrentPrescript = async function (url) {
    try {
      state.currentPrescript = await state.DB().getPrescript(url)
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
