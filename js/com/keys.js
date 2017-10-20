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
        <h2>How to Set Up Parallel</h2>
        <br>
        <h3>Step 1: Profile Key</h3>
        <p>Send us your profile key so we can put you into the network. Copy and paste from above.</p>
        <br>
        <h3>Step 2: Set Up Your Sidebar</h3>
        <a href=${getViewSidebarSetupURL(state.userProfile._origin)} target="_blank" class="btn" style="{padding-bottom: 15px;}">
          Click here to set up your sidebar.
        </a>
        <p></p>
        <br>
        <h3>Step 3: Set Up Your Toolkit</h3>
        <a class="btn" onclick=${() => setupParallel()} style="{padding-bottom: 15px;}">Click here to set up your toolkit.</a>
        <p></p>
        <br>
        <h3>Using Your Sidebar</h3>
        <p>Navigate to a normal HTTP site (say, the Wikipedia page for Puppies).</p>
        <p>Click on the red Parallel logo button to the right of the URL bar.</p>
        <p>This will cause the dropdown sidebar to appear.</p>
        <p>NOTE: If gizmos or posts don't load right away, try closing and opening the sidebar again.</p>
        <p>To use a gizmo, make sure the "Gizmos" button at the top of the sidebar is selected.</p>
        <p>Click the gizmo you want to use, and follow the instructions.</p>
        <p>To display a post, click the "Posts" button at the top of the sidebar.</p>
        <p>Click the post you want to use to see it displayed.</p>
        <p>Hovering over a post will display options to leave a comment, view that user's profile, or see details about the post.</p>
      </div>
    </div>
  `

  function setupParallel () {
    state.setupParallel()
  }
}
