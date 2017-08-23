const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderGizmo = require('../com/gizmo')
const {getViewProfileURL} = require('../util')

module.exports = function gizmoView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  if (!state.currentGizmo) {
    state.loadCurrentGizmo('dat://' + state.params.wildcard)
    return loadingView(state, emit)
  } else {
    var author = state.currentGizmo.author
  }

  const showDetails = true

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderError(state, emit)}
          <a href=${getViewProfileURL(author)} class="breadcrumbs">
            <i class="fa fa-caret-left"></i>
            ${author.name}'s profile
          </a>
          ${renderGizmo(state, emit, state.currentGizmo, showDetails)}
        </div>
      </div>
    </main>
  `
}
