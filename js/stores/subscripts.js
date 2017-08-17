// module.exports = function newSubscriptStore (state, emitter) {
//   state.toggleSubscript = async (prescript) => {
//     console.log('values in subscript save', prescript)
//     try {
//       if (prescript.isSubscribed) {
//         console.log('user prof origin', state.userProfile._origin)
//         console.log('prescript url in sub store', prescript._url)
//         await state.DB().removeSubscript(prescript._url)
//         prescript.isSubscribed = false
//       } else {
//         await state.DB().subscript(state.userProfile._origin, {
//           subscriptOrigin: prescript._origin,
//           subscriptURL: prescript._url
//         })
//         prescript.isSubscribed = true
//       }
//     } catch (e) {
//       console.error(e)
//       state.error = e
//     }
//   }
//   emitter.emit('render')
// }
