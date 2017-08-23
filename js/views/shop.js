const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderProfileCard = require('../com/profile-card')
const renderGizmo = require('../com/gizmo')

module.exports = function shopView (state, emit) {
  if (!state.userProfile) {
    return loadingView(state, emit)
  }

  if (!state.currentProfile) {
    state.loadProfile('dat://' + state.params.key, {getFollowProfiles: true})
    return loadingView(state, emit)
  }

  if (!state.gizmos) {
    state.loadUserGizmos()
    return loadingView(state, emit)
  }

  let gizmos = state.gizmos.filter(g => state.currentProfile._origin === g.gizmoOriginArchive)

  const showDetails = false

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">Gizmo Shop</h1>
          <ul class="feed">${gizmos.map(g => renderGizmo(state, emit, g, showDetails))}</ul>
        </div>
      </div>
    </main>
  `
}
