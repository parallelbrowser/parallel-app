const html = require('choo/html')
const {getUserProfileURL, getViewProfileURL} = require('../util')

module.exports = function renderKeys (state, emit, profile) {
  return html`
    <div class="profile-card profile-sidebar">
      <div class="profile-info edit">
        <h3>Your App Key</h3>
        <p>${window.location.href.slice(0, 70)}</p>
        <h3>Your Profile Key</h3>
        <p>${getUserProfileURL()}</p>
        <br>
        <h3>Setting Up Your Sidebar</h3>
        <ol>
          <li>--Copy your profile key into your clipboard.</li>
          <li>--Click the button below and follow the instructions there.</li>
        </ol>
        <a href="beaker://keys" target="_blank" class="btn">
          Click here to view your keys.
        </a>
        <br>
        <h3>Building Your First Toolkit</h3>
        <ol>
          <li>--Click on the button below to visit Parallel's account</li>
          <li>--Press the "Follow" Button</li>
          <li>--Click the "Shop" link to browse through the list of Parallel's gizmos
          <li>--Click "Subscribe" on "Change Background Color" and "Edit Paragraph."</li>
          <li>--Check your sidebar. They should be ready to use!</li>
        </ol>
        <a href=${getViewProfileURL('dat://7ab172e713e390a19c732c3dc47c99dda08d301e7f301d1845199cd3e50b2a00')} class="btn">
          Click here to follow Parallel's official account.
        </a>
        <h3>Using Your Sidebar (To do)</h3>
      </div>
    </div>
  `
}
