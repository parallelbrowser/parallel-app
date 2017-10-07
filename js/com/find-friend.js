const html = require('choo/html')
const {getViewProfileURL} = require('../util')

module.exports = function renderFindFriend (state, emit, profile) {
  return html`
    <div class="profile-card profile-sidebar">
      <div class="profile-info edit">
        <form onsubmit=${onSubmit}>
          <p>
            <label for="friendURL">Enter Your Friend's Profile Key</label>
            <input id="friendURL" name="friendURL" type="text" autofocus />
          </p>

          <p>
            <a href=${getViewProfileURL(profile)} class="btn">Cancel</a>
            <button type="submit" class="btn primary">Find Friend</button>
          </p>
        </form>
      </div>
    </div>
  `

  async function onSubmit (e) {
    e.preventDefault()
    const friendURL = e.target.friendURL.value
    state.findFriend(friendURL)
    document.getElementById('friendURL').value = ''
  }
}
