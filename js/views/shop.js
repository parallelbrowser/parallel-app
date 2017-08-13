const html = require('choo/html')
const loadingView = require('./loading')
const renderError = require('../com/error')
const renderHeader = require('../com/header')
const renderProfileCard = require('../com/profile-card')
const renderPrescript = require('../com/prescript')

module.exports = function shopView (state, emit) {
  if (!state.userProfile) {
    return loadingView(state, emit)
  }
  if (!state.currentProfile) {
    // load the profile and rerender
    state.loadProfile('dat://' + state.params.key, {getFollowProfiles: true})
    return loadingView(state, emit)
  }

  // TCW CHANGES -- load user prescripts

  if (!state.prescripts) {
    state.loadUserPrescripts()
    return loadingView(state, emit)
  }

  let prescripts = state.prescripts
  console.log('subscripts', state.userProfile.subscripts)
  console.log('profile', state.userProfile)
  prescripts = prescripts.map(p => {
    p.isSubscribed = state.userProfile.subscriptURLs.indexOf(p._url) !== -1
    return p
  })
  console.log('prescripts', prescripts)

  // TCW -- END

  const showDetails = false

  return html`
    <main>
      ${renderHeader(state, emit, state.userProfile)}

      <div class="main-container">
        <div class="main-content center">
          ${renderProfileCard(state, emit, state.currentProfile)}
          ${renderError(state, emit)}
          <h1 class="heading subtle">Shop -- Gizmos for sale!</h1>
          <ul class="feed">${prescripts.map(p => renderPrescript(state, emit, p, showDetails))}</ul>
        </div>
      </div>
    </main>
  `
}
