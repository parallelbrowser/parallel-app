const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderAvatar = require('./avatar')
const renderComments = require('./comments')
const {getViewProfileURL, getViewPostURL, getViewGizmoURL, niceDate, pluralize} = require('../util')

module.exports = function renderPost (state, emit, post, showDetails) {
  var commentsExpanded = state.expandedPosts.indexOf(post._url) !== -1
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

          <p class="content">${post.postText}</p>
          <a href=${getViewGizmoURL(post.gizmo)}> <p class="content">Gizmo Used: ${post.gizmo.gizmoName}</p></a>
          <a href=${post.postHTTP} target="_blank"> <p class="content">Link to Post: ${post.postHTTP}</p></a>
          ${showDetails ? html`
            <div>
              <p class="content">Post JS: ${post.postJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, post)}
        <span class="action comment" onclick=${onToggleComments}>
          ${post.replies && post.replies.length
            ? html`
              <span>
                ${post.replies.length}
                ${pluralize(post.replies.length, 'comment', 's')}
              </span>`
            : 'Write a comment'}
        </span>
      </div>
      ${commentsExpanded ? renderComments(state, emit, post) : ''}
    </div>
  `

  function onToggleComments () {
    var idx = state.expandedPosts.indexOf(post._url)
    if (idx === -1) {
      state.expandedPosts.push(post._url)
    } else {
      state.expandedPosts.splice(idx, 1)
    }
    emit('render')
  }
}
