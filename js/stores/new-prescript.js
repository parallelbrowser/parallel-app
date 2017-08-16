const {getViewShopURL} = require('../util')

module.exports = function newPrescriptStore (state, emitter) {
  state.savePrescript = async (values) => {
    console.log('values in save', values)
    try {
      await state.DB().prescript(state.userProfile._origin, values)
    } catch (e) {
      console.error(e)
      state.error = e
    }
    // DZ - redirect to shop page
    emitter.emit('pushState', getViewShopURL(state.userProfile))
  }
}
