const html = require('choo/html')
const renderAvatar = require('./avatar')
const {getViewProfileURL, getEditProfileURL, getViewWorkbenchURL, getViewShopURL, getViewSubgizmosURL} = require('../util')

module.exports = function renderFeed (state, emit) {
  return html`
    <header>
      <div class="container">
        <div class="links">
          <a href="#" class="btn transparent">
            <i class="fa fa-home"></i>
            Home
          </a>
        </div>

        ${state.userProfile ? html`
          <div class="avatar-card dropdown-menu-container" onclick=${onToggleDropdown}>
            <div class="dropdown-menu ${state.isDropdownOpen ? '' : 'hidden'}">
              <a href=${getEditProfileURL(state.userProfile)} class="dropdown-menu-item">
                Edit profile
              </a>
              <a href=${getViewSubgizmosURL(state.userProfile)} class="dropdown-menu-item">
                Gizmos
              </a>
              <a href=${getViewWorkbenchURL(state.userProfile)} class="dropdown-menu-item">
                Workbench
              </a>
              <a href=${getViewShopURL(state.userProfile)} class="dropdown-menu-item">
                Shop
              </a>
              <a href="https://github.com/beakerbrowser/dat-nexus-app/issues" class="dropdown-menu-item">
                Report an issue
              </a>
            </div>

            ${renderAvatar(state.userProfile)}
            <span class="name">${state.userProfile.name}</span>
            <i class="fa fa-caret-down"></>
          </div>`
          : ''}
      </div>
    </header>
  `

  function onToggleDropdown () {
    emit('toggle-dropdown')
  }
}
