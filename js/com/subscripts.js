const html = require('choo/html')
const {getViewSubscriptOriginURL} = require('../util')

module.exports = function renderSubscripts (state, emit, profile) {
  if (profile.subscripts.length) {
    return html`
      <div class="follows">
        ${profile.subscripts.map(s => renderSubscript(state, emit, s))}
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

function renderSubscript (state, emit, subscript) {
  return html`
    <div class="profile-card minimal">
      <div class="profile-card-header">
        <div class="profile-card-info">
          <h2 class="name">
            <a href=${getViewSubscriptOriginURL(subscript)}>${subscript.subscriptName}</a>
          </h2>
        </div>
      </div>
      <p class="description">${subscript.subscriptInfo}</p>
      <a href=${getViewSubscriptOriginURL(subscript)}>See gizmo details</a>
    </div>
  `
}
