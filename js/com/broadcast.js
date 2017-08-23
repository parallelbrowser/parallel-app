const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewBroadcastURL, niceDate} = require('../util')

module.exports = function renderBroadcast (state, emit, broadcast, showDetails) {
  return html`
    <div class="broadcast">
      <div class="broadcast-content">
        <a class="avatar-container" href=${getViewProfileURL(broadcast.author)}>
          ${renderAvatar(broadcast.author)}
        </a>

        <div class="broadcast-container">
          <div class="metadata">
            <a href=${getViewProfileURL(broadcast.author)} class="name">${broadcast.author.name}</span>
            <a href=${getViewBroadcastURL(broadcast)} target="_blank"><span class="date">${niceDate(broadcast.createdAt)}</span></a>
          </div>

          <p class="content">Gizmo Used: ${broadcast.gizmoName}</p>
          <p class="content">Gizmo Description${broadcast.gizmoDescription}</p>
          <a href=${broadcast.postscriptHTTP} target="_blank"> <p class="content">Widget Link: ${broadcast.postscriptHTTP}</p></a>
          ${showDetails ? html`
            <div>
              <p class="content">Widget JS: ${broadcast.postscriptJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, broadcast)}
    </div>
  `
}
