const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderPrescript = require('../com/prescript')
const {getViewShopURL} = require('../util')

module.exports = function prescriptView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  if (!state.currentPrescript) {
    state.loadCurrentPrescript('dat://' + state.params.wildcard)
    return loadingView(state, emit)
  } else {
    var author = state.currentPrescript.author
  }

  const showDetails = true

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderError(state, emit)}
          <a href=${getViewShopURL(author)} class="breadcrumbs">
            <i class="fa fa-caret-left"></i>
            Back to ${author.name}'s shop
          </a>
          ${renderPrescript(state, emit, state.currentPrescript, showDetails)}
        </div>
      </div>
    </main>
  `
}
