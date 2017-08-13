const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderSubscripts = require('../com/subscripts')
const renderProfileCard = require('../com/profile-card')

module.exports = function subscriptsView (state, emit) {
  if (!state.userProfile) {
    return loadingView(state, emit)
  }
  if (!state.currentProfile) {
    // load the profile and rerender
    state.loadProfile('dat://' + state.params.key, {getFollowProfiles: true, getSubscripts: true})
    return loadingView(state, emit)
  }
  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}

      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">Gizmo Collection</h1>
          ${renderSubscripts(state, emit, state.currentProfile)}
        </div>
      </div>
    </main>
  `
}
