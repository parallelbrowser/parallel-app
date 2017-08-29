/* globals window */

const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderPost = require('../com/post')
const {getViewProfileURL} = require('../util')

module.exports = function postView (state, emit) {
  if (!state.isAppLoaded) {
    return loadingView(state, emit)
  }
  if (!state.currentPost) {
    state.loadCurrentPost('dat://' + state.params.wildcard)
    return loadingView(state, emit)
  } else {
    var author = state.currentPost.author
  }
  state.expandedPosts.push(state.currentPost._url)
  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}
      <div class="main-container">
        <div class="main-content center">
          ${renderError(state, emit)}
          <a href=${getViewProfileURL(author)} class="breadcrumbs">
            <i class="fa fa-caret-left"></i>
            Back to ${author.name}'s feed
          </a>
          ${state.currentPostParent
            ? renderPost(state, emit, state.currentPostParent, true)
            : ''
          }
          ${renderPost(state, emit, state.currentPost, true)}
        </div>
      </div>
    </main>
  `
}
