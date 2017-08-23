const {getViewShopURL} = require('../util')

module.exports = function newGizmoStore (state, emitter) {
  state.publishGizmo = async (values) => {
    try {
      await state.DB().gizmo(state.userProfile._origin, values)
      emitter.emit('pushState', getViewShopURL(state.userProfile))
    } catch (e) {
      console.error(e)
      state.error = e
    }
  }

  state.toggleSubscribe = async (gizmo) => {
    try {
      if (gizmo.isSubscribed) {
        if (state.userProfile._origin !== gizmo.gizmoOriginArchive) {
          await state.DB().removeGizmo(gizmo)
        }
        await state.DB().unsubscribeFromGizmo(state.userProfile._origin, gizmo)
        gizmo.isSubscribed = false
      } else {
        if (state.userProfile._origin !== gizmo.gizmoOriginArchive) {
          await state.DB().gizmo(state.userProfile._origin, gizmo)
        }
        await state.DB().subscribeToGizmo(state.userProfile._origin, gizmo)
        gizmo.isSubscribed = true
      }
    } catch (e) {
      console.error(e)
      state.error = e
    }
    emitter.emit('render')
  }
}
