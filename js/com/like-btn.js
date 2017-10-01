const html = require('choo/html')

module.exports = function renderLikeBtn (emit, post) {
  var likeAction
  if (post.votes.currentUsersVote === 1) {
    likeAction = html`
      <button onclick=${() => emit('unlike', post)}>
        <i class="fa fa-star"></i>
      </button>`
  } else {
    likeAction = html`
      <button onclick=${() => emit('like', post)}>
        <i class="fa fa-star-o"></i>
      </button>`
  }

  return html`
    <span class="action like">
      ${likeAction}
      <a class="count">${post.votes.up || ''}</a>
    </span>`
}
