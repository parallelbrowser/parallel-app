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
            <label for="prescriptName">Gizmo Name</label>
            <input id="prescriptName" name="prescriptName" type="text" autofocus />
          </p>

          <p>
            <label for="prescriptInfo">Gizmo Info</label>
            <input id="prescriptInfo" name="prescriptInfo" type="text" autofocus />
          </p>

          <p>
            <label for="prescriptJS">Gizmo JS</label>
            <textarea id="prescriptJS" name="prescriptJS"></textarea>
          </p>

          <p>
            <label for="prescriptCSS">Gizmo CSS</label>
            <textarea id="prescriptCSS" name="prescriptCSS"></textarea>
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

    // DZ - add await so the prescript is actually saved
    await state.savePrescript({
      prescriptName: e.target.prescriptName.value || '',
      prescriptInfo: e.target.prescriptInfo.value || '',
      prescriptJS: e.target.prescriptJS.value || '',
      prescriptCSS: e.target.prescriptCSS.value || ''
    })

    document.getElementById('prescriptName').value = ''
    document.getElementById('prescriptInfo').value = ''
    document.getElementById('prescriptJS').value = ''
    document.getElementById('prescriptCSS').value = ''
  }
}
