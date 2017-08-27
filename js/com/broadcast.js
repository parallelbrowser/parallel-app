const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewBroadcastURL, getViewGizmoURL, niceDate} = require('../util')

module.exports = function renderBroadcast (state, emit, broadcast, showDetails) {
  console.log('broadcast in renderBroadcast', broadcast)
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

          <p class="content">Text: ${broadcast.postText}</p>
          <a href=${getViewGizmoURL(broadcast.gizmo)}> <p class="content">Gizmo Used: ${broadcast.gizmo.gizmoName}</p></a>
          <p class="content">Gizmo Description: ${broadcast.gizmo.gizmoDescription}</p>
          <a href=${broadcast.postHTTP} target="_blank"> <p class="content">Widget Link: ${broadcast.postHTTP}</p></a>
          ${showDetails ? html`
            <div>
              <p class="content">Post JS: ${broadcast.postJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, broadcast)}
    </div>
  `
}
