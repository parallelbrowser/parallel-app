/* globals DatArchive */

const ParallelAPI = require('parallel-scratch-api')

module.exports = async function dbStore (state, emitter) {
  var userURL = null
  var userDB = null
  var cacheDB = null

  // this method selects an appropriate DB based on the
  // current app state and the given target (target = who we want to read about)
  // the userdb is only for the user and ppl the user follows
  // the cachedb is for unfollowed users
  state.DB = function (target) {
    console.log('target in dbs', target);
    if (!userDB) {
      // use cachedb if userdb isnt loaded yet
      console.log('there is no db');
      console.log('cache db when no userdb', cacheDB);
      return cacheDB
    }
    if (target) {
      // check if the target is the user, or is followed by the user
      // if it is, give the main userdb
      // otherwise, give the cachedb
      console.log('there is a target', target);

      if (typeof target === 'object' && target._origin) {
        target = target._origin
      }
      if (typeof target === 'object' && target.url) {
        target = target.url
      }
      console.log('target after assignment', target);
      if (target === userURL) {
        console.log('userdb if target === userurl', userDB);
        return userDB
      }
      if (userDB.listArchives().find(a => a.url === target)) {
        console.log('userb when listArchives', userDB);
        return userDB
      }
      return cacheDB
    }
    return userDB
  }

  state.loadUserDB = async function (_userURL) {
    console.log('_userURL when state.loadUserDB', _userURL);
    userURL = _userURL
    userDB = await ParallelAPI.open(new DatArchive(userURL))
    console.log('userDB after state.loadUserDB', userDB);
    emitter.emit('userdb-ready')
  }

  // load the cache DB by default
  cacheDB = await ParallelAPI.open(/* cache db */)
  console.log('cache db in dbs', cacheDB);
  emitter.emit('cachedb-ready')
}
