/* globals alert */

const html = require('choo/html')
const renderLikeBtn = require('./like-btn')
const renderSubscribeBtn = require('./subscribe-btn')
const renderAvatar = require('./avatar')
const renderComments = require('./comments')
const {getViewProfileURL, getViewGizmoURL, niceDate, pluralize} = require('../util')

module.exports = function renderGizmo (state, emit, gizmo, opts = {}) {
  if (opts.subgizmosView &&
    !gizmo.isSubscribed &&
    state.currentProfile._origin === state.userProfile._origin) {
    return ''
  }
  const commentsExpanded = state.expandedGizmos.indexOf(gizmo._url) !== -1
  return html`
    <div class="post parent}">
      <div class="post-content">
        <a class="avatar-container" href=${getViewProfileURL(gizmo.author)}>
          ${renderAvatar(gizmo.author)}
        </a>

        <div class="post-container">
          <div class="metadata">
            <a href=${getViewProfileURL(gizmo.author)} class="name">${gizmo.author.name}</span>
            <a href=${getViewGizmoURL(gizmo)} target="_blank"><span class="date">${niceDate(gizmo.createdAt)}</span></a>
          </div>

          <p class="content">Gizmo Name: ${gizmo.gizmoName}</p>
          <p class="content">Gizmo Description: ${gizmo.gizmoDescription}</p>
          ${opts.showDetails ? html`
            <div>
              <p class="content">Gizmo Docs: ${gizmo.gizmoDocs}</p>
              <a><p class="content" onclick=${() => alert(gizmo._url)}>Gizmo URL: Click for link</p></a>
              <p class="content">Gizmo Dependencies: ${gizmo.gizmoDependencies.length ? '' : 'No gizmo dependencies.'}</p>
                ${gizmo.gizmoDependencies.length ? html`
                  <ol>
                    ${niceDependencies(gizmo, true)}
                  </ol>
                ` : ''}
              <p class="content">Post Dependencies: ${gizmo.postDependencies.length ? '' : 'No post dependencies.'}</p>
                ${gizmo.postDependencies.length ? html`
                  <ol>
                    ${niceDependencies(gizmo, false)}
                  </ol>
                ` : ''}
              <p class="content">Gizmo JS: ${gizmo.gizmoJS}</p>
            </div>
          ` : ''}
        </div>
      </div>

      <div class="controls">
        ${renderLikeBtn(emit, gizmo)}
        ${renderSubscribeBtn(state, emit, gizmo)}
        <span class="action comment" onclick=${onToggleComments}>
          ${gizmo.replies && gizmo.replies.length
            ? html`
              <span>
                ${gizmo.replies.length}
                ${pluralize(gizmo.replies.length, 'comment', 's')}
              </span>`
            : 'Write a comment'}
        </span>
      </div>
      ${commentsExpanded ? renderComments(state, emit, gizmo) : ''}
    </div>
  `

  function niceDependencies (gizmo, forGizmoDependencies) {
    let arr = forGizmoDependencies ? gizmo.gizmoDependencies : gizmo.postDependencies
    arr = arr.map(d => {
      return html`
        <li>
          <a href=${getViewGizmoURL(d.url)}>
            <p>${d.name}</p>
          </a>
        </li>
      `
    })
    return arr
  }

  function onToggleComments () {
    var idx = state.expandedGizmos.indexOf(gizmo._url)
    if (idx === -1) {
      state.expandedGizmos.push(gizmo._url)
    } else {
      state.expandedGizmos.splice(idx, 1)
    }
    emit('render')
  }
}
