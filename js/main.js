const choo = require('choo')

var app = choo()
app.use(require('./stores/dbs'))
app.use(require('./stores/profiles'))
app.use(require('./stores/broadcasts'))
app.use(require('./stores/comments'))
app.use(require('./stores/new-post'))
app.use(require('./stores/feed'))
app.use(require('./stores/header'))

// TCW -- new stores:
// new-prescript: for saving a prescript generated in the shop
// prescripts: for loading and working with prescripts

app.use(require('./stores/new-prescript'))
app.use(require('./stores/prescripts'))

// TCW -- END

app.route('/', require('./views/main'))
app.route('/profile/:key', require('./views/profile'))
app.route('/profile/:key/follows', require('./views/follows'))
app.route('/profile/:key/edit', require('./views/profile'))
app.route('/broadcast/*', require('./views/broadcast'))
app.route('/settings', require('./views/settings'))

// TCW -- new routes
// user workbench: (for submitting scripts)
// store: for displaying scripts
// prescript: for displaying a single prescript in detail

app.route('/workbench', require('./views/workbench'))
app.route('/shop/:key', require('./views/shop'))
app.route('/prescript/*', require('./views/prescript'))

// TCW -- end

app.mount('main')
