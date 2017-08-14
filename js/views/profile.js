/* globals window */

const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderFeed = require('../com/feed')
const renderProfileCard = require('../com/profile-card')

module.exports = function profileView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  if (!state.currentProfile) {
    // load the profile and rerender
    state.loadProfile('dat://' + state.params.key)
    return loadingView(state, emit)
  }
  if (!state.broadcasts) {
    state.loadUserBroadcasts()
    return loadingView(state, emit)
  }

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}

      <div class="main-container">
        <div class="main-content center">

          ${renderProfileCard(state, emit, state.currentProfile)}

          <div class="feed-container">
            ${renderError(state, emit)}
            ${renderFeed(state, emit)}
          </div>
        </div>
      </div>
    </main>
  `
}
