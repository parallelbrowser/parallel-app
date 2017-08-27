/* globals FileReader */

const html = require('choo/html')
const {getViewProfileURL, getAvatarStyle} = require('../util')

module.exports = function renderWorkbench (state, emit, profile) {
  var avatarStyle = state.tmpAvatarURL ? `background-image: url(${state.tmpAvatarURL})` : getAvatarStyle(profile)
  return html`
    <div class="profile-card profile-sidebar">
      <div class="profile-info edit">
        <form onsubmit=${onSubmit}>
          <label>Gizmo Icon</label>
          <div class="avatar avatar-editor" style=${avatarStyle}>
            <input type="file" accept="image/*" onchange=${onChangeAvatar} />
            <div class="icon-container">
              <i class="fa fa-picture-o"></i>
            </div>
          </div>
          <input name="avatar" type="hidden"/>
          <p>
            <label for="gizmoName">Gizmo Name</label>
            <input id="gizmoName" name="gizmoName" type="text" autofocus />
          </p>

          <p>
            <label for="gizmoDescription">Gizmo Description</label>
            <input id="gizmoDescription" name="gizmoDescription" type="text" autofocus />
          </p>

          <p>
            <label for="gizmoDocs">Gizmo Docs</label>
            <textarea id="gizmoDocs" name="gizmoDocs"></textarea>
          </p>

          <p>
            <label for="gizmoJS">Gizmo JS</label>
            <textarea id="gizmoJS" name="gizmoJS"></textarea>
          </p>

          <p>
            <a href=${getViewProfileURL(profile)} class="btn">Cancel</a>
            <button type="submit" class="btn primary">Save</button>
          </p>
        </form>
      </div>
    </div>
  `

  async function onChangeAvatar (e) {
    if (e.target.files) {
      const reader = new FileReader()
      reader.onload = () => {
        state.tmpAvatar = e.target.files[0]
        state.tmpAvatarURL = reader.result
        emit('render')
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  async function onSubmit (e) {
    e.preventDefault()

    state.publishGizmo({
      gizmoName: e.target.gizmoName.value || '',
      gizmoDescription: e.target.gizmoDescription.value || '',
      gizmoDocs: e.target.gizmoDocs.value || '',
      gizmoJS: e.target.gizmoJS.value || ''
    })

    document.getElementById('gizmoName').value = ''
    document.getElementById('gizmoDescription').value = ''
    document.getElementById('gizmoDocs').value = ''
    document.getElementById('gizmoJS').value = ''
  }
}
