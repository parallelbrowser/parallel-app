const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewPrescriptURL, niceDate} = require('../util')

module.exports = function renderPrescript (state, emit, prescript, isParent) {
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

          <p class="content">${prescript.prescriptName}</p>
          <p class="content">${prescript.prescriptInfo}</p>
          <p class="content">${prescript.prescriptJS}</p>
          <p class="content">${prescript.prescriptCSS}</p>

        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, prescript)}
      </div>
    </div>
  `
}
