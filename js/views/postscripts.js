const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderProfileCard = require('../com/profile-card')
const renderPostscript = require('../com/postscript')

module.exports = function postscriptsView (state, emit) {
  if (!state.userProfile) {
    return loadingView(state, emit)
  }
  if (!state.currentProfile) {
    // load the profile and rerender
    state.loadProfile('dat://' + state.params.key, {getFollowProfiles: true})
    return loadingView(state, emit)
  }

  if (!state.postscripts) {
    state.loadUserPostscripts()
    return loadingView(state, emit)
  }

  let postscripts = state.postscripts

  const showDetails = false

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}

      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">${state.currentProfile.author}'s Wigets</h1>
          <ul class="feed">${postscripts.map(p => renderPostscript(state, emit, p, showDetails))}</ul>
        </div>
      </div>
    </main>
  `
}
