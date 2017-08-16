const html = require('choo/html')

module.exports = function renderFollowBtn (state, emit, profile) {
  if (profile.isFollowed) {
    return html`
      <button id="follow-toggle" class="btn center" onmouseout=${() => onShowFollowingButton(this)} onmouseover=${() => onShowUnfollowButton(this)} onclick=${toggleFollow}>Following<i class="fa fa-check"></i></button>
    `
  } else {
    return html`
      <button id="follow-toggle" class="btn primary center" onclick=${toggleFollow}>Follow<i class="fa fa-plus"></i></button>
    `
  }

  function toggleFollow () {
    state.toggleFollow(profile)
  }

  function onShowUnfollowButton (thisButton) {
    // DZ - TODO: match mouse action to each button respectively
    // const btn = document.getElementById('follow-toggle')
    console.log(thisButton);
    thisButton.innerHTML = 'Unfollow<i class="fa fa-times"></i>'
    // btn.innerHTML = 'Unfollow<i class="fa fa-times"></i>'
  }

  function onShowFollowingButton (thisButton) {
    // const btn = document.getElementById('follow-toggle')
    // const btn = thisButton
    thisButton.innerHTML = 'Following<i class="fa fa-check"></i>'
    // btn.innerHTML = 'Following<i class="fa fa-check"></i>'
  }
}
