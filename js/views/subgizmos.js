const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderProfileCard = require('../com/profile-card')
const renderGizmo = require('../com/gizmo')

module.exports = function subgizmosView (state, emit) {
  if (!state.userProfile) {
    return loadingView(state, emit)
  }

  if (!state.currentProfile) {
    state.loadProfile('dat://' + state.params.key, {getFollowProfiles: true})
    return loadingView(state, emit)
  }

  if (!state.subgizmos) {
    state.loadUserSubgizmos()
    return loadingView(state, emit)
  }

  const opts = {
    showDetails: false,
    subgizmosView: true
  }

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">Gizmos</h1>
          ${state.subgizmos.length
            ? html`<ul class="feed">${state.subgizmos.map(g => renderGizmo(state, emit, g, opts))}</ul>`
            : html`<p>${state.currentProfile.name} is not using any gizmos.</p>`
          }
        </div>
      </div>
    </main>
  `
}
