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

  if (!state.shopGizmos) {
    state.loadUserShopGizmos()
    return loadingView(state, emit)
  }

  const opts = {
    showDetails: false
  }

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">Shop</h1>
          ${state.shopGizmos.length
            ? html`<ul class="feed">${state.shopGizmos.map(g => renderGizmo(state, emit, g, opts))}</ul>`
            : html`<p>${state.currentProfile.name} has no gizmos in the shop.</p>`
          }
        </div>
      </div>
    </main>
  `
}
