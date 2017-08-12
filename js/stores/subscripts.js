module.exports = function newSubscriptStore (state, emitter) {
  state.toggleSubscript = async (values) => {
    console.log('values in subscript save', values)
    try {
      await state.DB().subscript(state.userProfile._origin, {
        subscriptOrigin: values._origin,
        subscriptOriginUrl: values._url,
        subscriptID: values.prescriptID
      })
    } catch (e) {
      console.error(e)
      state.error = e
    }
  }
}
