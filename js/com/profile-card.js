const html = require('choo/html')
const renderFollowBtn = require('./follow-btn')
const renderAvatar = require('./avatar')
const renderEditProfileBtn = require('./edit-profile-btn')
const {getViewProfileURL, getViewFollowsURL, getViewShopURL, getViewSubgizmosURL, getViewFindFriendURL, getViewKeysURL, pluralize} = require('../util')

module.exports = function renderProfileCard (state, emit, profile) {
  if (!profile) {
    return ''
  }

  var numFollows = profile.follows ? profile.follows.length : 0
  var isUser = profile._origin === state.userProfile._origin

  return html`
    <div class="profile-card">
      <div class="profile-card-header">
        <a class="avatar-container" href=${getViewProfileURL(profile)}>
          ${renderAvatar(profile)}
        </a>

        <div class="profile-card-info">
          <h1 class="name"><a href=${getViewProfileURL(profile)}>${profile.name}</a></h1>
          <div class="profile-card-stats">
            <a class="stat" href=${getViewFollowsURL(profile)}>
              <span class="value">${numFollows}</span>
              <span class="label">following</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewProfileURL(profile)}>
              <span class="value">${profile.numPosts}></span>
              <span class="label">${pluralize(profile.numPosts, 'post')}</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewShopURL(profile)}>
              <span class="value"></span>
              <span class="label">Shop</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewSubgizmosURL(profile)}>
              <span class="value"></span>
              <span class="label">Gizmos</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewFindFriendURL(profile)}>
              <span class="value"></span>
              <span class="label">Find Friend</span>
            </a>
            <span aria-hidden="true">•</span>
            <a class="stat" href=${getViewKeysURL(profile)}>
              <span class="value"></span>
              <span class="label">Setup</span>
            </a>
          </div>
        </div>
      </div>

      ${profile.bio ? html`<p class="description">${profile.bio}</p>` : ''}
      ${isUser ? renderEditProfileBtn(state, emit, profile) : renderFollowBtn(state, emit, profile)}
    </div>
  `
}
