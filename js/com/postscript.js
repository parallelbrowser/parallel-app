const html = require('choo/html')
const renderLikeBtn = require('./like-btn')

const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewPostscriptDetailURL, niceDate} = require('../util')

module.exports = function renderPostscript (state, emit, postscript, showDetails) {
  return html`
    <div class="broadcast parent}">
      <div class="broadcast-content">
        <a class="avatar-container" href=${getViewProfileURL(postscript.author)}>
          ${renderAvatar(postscript.author)}
        </a>

        <div class="broadcast-container">
          <div class="metadata">
            <a href=${getViewProfileURL(postscript.author)} class="name">${postscript.author.name}</span>
            <a href=${getViewPostscriptDetailURL(postscript)} target="_blank"><span class="date">${niceDate(postscript.createdAt)}</span></a>
          </div>

          <p class="content">Widget Name: ${postscript.subscriptName}</p>
          <p class="content">Widget Info: ${postscript.subscriptInfo}</p>
          <a href=${postscript.postscriptHTTP} target="_blank">
            <p class="content">Widget Link</p>
          </a>
          ${showDetails ? html`
            <div>
              <p class="content">Widget JS: ${postscript.postscriptJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, postscript)}
      </div>
    </div>
  `
}
