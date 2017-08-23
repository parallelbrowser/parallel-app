const html = require('choo/html')
const renderGizmo = require('./gizmo')

module.exports = function renderGizmos (state, emit, profile) {
  if (state.gizmos.length) {
    const showDetails = false
    return html`
      <div class="follows">
        ${state.gizmos.map(g => renderGizmo(state, emit, g, showDetails))}
      </div>
    `
  } else {
    return html`
      <p class="follows">
        ${state.currentProfile.name} is not using any gizmos.
      </p>
    `
  }
}
