const html = require('choo/html')
const renderPost = require('./post')

module.exports = function renderFeed (state, emit) {
  if (!state.posts) {
    return html`
      <p class="card">
        <i class="fa fa-spinner"></i> Loading feed...
      </p>
    `
  }

  let posts = state.posts

  return html`
    <ul class="feed">${posts.map(p => renderPost(state, emit, p, false))}</ul>
  `
}
