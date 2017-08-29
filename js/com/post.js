const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getViewPostURL, getViewGizmoURL, niceDate} = require('../util')

module.exports = function renderPost (state, emit, post, showDetails) {
  return html`
    <div class="post">
      <div class="post-content">
        <a class="avatar-container" href=${getViewProfileURL(post.author)}>
          ${renderAvatar(post.author)}
        </a>

        <div class="post-container">
          <div class="metadata">
            <a href=${getViewProfileURL(post.author)} class="name">${post.author.name}</span>
            <a href=${getViewPostURL(post)} target="_blank"><span class="date">${niceDate(post.createdAt)}</span></a>
          </div>

          <p class="content">Text: ${post.postText}</p>
          <a href=${getViewGizmoURL(post.gizmo)}> <p class="content">Gizmo Used: ${post.gizmo.gizmoName}</p></a>
          <p class="content">Gizmo Description: ${post.gizmo.gizmoDescription}</p>
          <a href=${post.postHTTP} target="_blank"> <p class="content">Widget Link: ${post.postHTTP}</p></a>
          ${showDetails ? html`
            <div>
              <p class="content">Post JS: ${post.postJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, post)}
    </div>
  `
}
