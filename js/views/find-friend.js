const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderFindFriend = require('../com/find-friend')
const {getViewProfileURL} = require('../util')

module.exports = function findFriendsView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}

      <div class="main-container">
        <div class="main-content center">
          ${renderError(state, emit)}
          <a href=${getViewProfileURL(state.userProfile)} class="breadcrumbs">
            <i class="fa fa-caret-left"></i>
            Back to Home
          </a>
          ${renderFindFriend(state, emit, state.userProfile)}
        </div>
      </div>
    </main>
  `
}
