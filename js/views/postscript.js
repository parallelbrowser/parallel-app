const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderPostscript = require('../com/postscript')
const {getViewPostscriptsURL} = require('../util')

module.exports = function postscriptView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  if (!state.currentPostscript) {
    state.loadCurrentPostscript('dat://' + state.params.wildcard)
    return loadingView(state, emit)
  } else {
    var author = state.currentPostscript.author
  }

  const showDetails = true

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderError(state, emit)}
          <a href=${getViewPostscriptsURL(author)} class="breadcrumbs">
            <i class="fa fa-caret-left"></i>
            Back to ${author.name}'s Widgets
          </a>
          ${renderPostscript(state, emit, state.currentPostscript, showDetails)}
        </div>
      </div>
    </main>
  `
}
