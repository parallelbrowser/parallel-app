const html = require('choo/html')
const renderBroadcast = require('./broadcast')

module.exports = function renderFeed (state, emit) {
  if (!state.broadcasts) {
    return html`
      <p class="card">
        <i class="fa fa-spinner"></i> Loading feed...
      </p>
    `
  }

  let broadcasts = state.broadcasts
  const showDetails = false

  return html`
    <ul class="feed">${broadcasts.map(b => renderBroadcast(state, emit, b, showDetails))}</ul>
  `
}
