module.exports = function newPrescriptStore (state, emitter) {
  state.savePrescript = async (values) => {
    console.log('values in save', values)
    try {
      await state.DB().prescript(state.userProfile._origin, values)
    } catch (e) {
      console.error(e)
      state.error = e
    }
  }
}
