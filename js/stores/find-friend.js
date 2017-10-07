const {getViewProfileURL} = require('../util')

module.exports = function findFriendsStore (state, emitter) {
  state.findFriend = async (friendURL) => {
    emitter.emit('pushState', getViewProfileURL(friendURL))
  }
}
