const html = require('choo/html')
const {getUserProfileURL, getViewSidebarSetupURL} = require('../util')

module.exports = function renderKeys (state, emit, profile) {
  return html`
    <div class="profile-card profile-sidebar" style="width: 600px">
      <div class="profile-info edit">
        <h3>Your App Key</h3>
        <p>${window.location.href.slice(0, 70)}</p>
        <h3>Your Profile Key</h3>
        <p>${getUserProfileURL()}</p>
        <br>
        <h3>Set Up Your Sidebar</h3>
        <a href=${getViewSidebarSetupURL(state.userProfile._origin)} target="_blank" class="btn">
          Click here to set up your sidebar.
        </a>
        <br>
        <h3>Set Up Your Toolkit</h3>
        <button id="follow-toggle" class="btn primary center" onclick=${() => setupParallel()}>Click here to set up your toolkit.</button>
        <h3>Refresh Network</h3>
        <button id="follow-toggle" class="btn primary center" onclick=${() => refreshNetwork()}>Click here to refresh the network and follow new users.</button>
        <h3>Using Your Sidebar (To do)</h3>
      </div>
    </div>
  `

  function setupParallel () {
    state.setupParallel()
  }

  function refreshNetwork () {
    state.refreshNetwork()
  }

  function sendPulse () {
    state.sendPulse()
  }
}
