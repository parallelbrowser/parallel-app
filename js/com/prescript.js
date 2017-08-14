const html = require('choo/html')
const renderLikeBtn = require('./like-btn')

// TCW -- button to subscribe
const renderSubscribeBtn = require('./subscribe-btn')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewPrescriptURL, niceDate} = require('../util')

module.exports = function renderPrescript (state, emit, prescript, showDetails) {
  return html`
    <div class="broadcast parent}">
      <div class="broadcast-content">
        <a class="avatar-container" href=${getViewProfileURL(prescript.author)}>
          ${renderAvatar(prescript.author)}
        </a>

        <div class="broadcast-container">
          <div class="metadata">
            <a href=${getViewProfileURL(prescript.author)} class="name">${prescript.author.name}</span>
            <a href=${getViewPrescriptURL(prescript)} target="_blank"><span class="date">${niceDate(prescript.createdAt)}</span></a>
          </div>

          <p class="content">Gizmo Name: ${prescript.prescriptName}</p>
          <p class="content">Gizmo Info: ${prescript.prescriptInfo}</p>
          ${showDetails ? html`
            <div>
              <p class="content">Gizmo JS: ${prescript.prescriptJS}</p>
              <p class="content">Gizmo CSS: ${prescript.prescriptCSS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, prescript)} ${renderSubscribeBtn(state, emit, prescript)}
      </div>
    </div>
  `
}
