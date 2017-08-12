const choo = require('choo')

var app = choo()
app.use(require('./stores/dbs'))
app.use(require('./stores/profiles'))
app.use(require('./stores/broadcasts'))
app.use(require('./stores/comments'))
app.use(require('./stores/new-post'))
app.use(require('./stores/feed'))
app.use(require('./stores/header'))
app.use(require('./stores/new-prescript'))
app.route('/', require('./views/main'))
app.route('/profile/:key', require('./views/profile'))
app.route('/profile/:key/follows', require('./views/follows'))
app.route('/profile/:key/edit', require('./views/profile'))
app.route('/broadcast/*', require('./views/broadcast'))
app.route('/settings', require('./views/settings'))

// TCW -- new routes
// user workbench: (for submitting scripts)
// store: for displaying scripts

app.route('/workbench', require('./views/workbench'))
app.route('/shop/:key', require('./views/shop'))

// TCW -- end

app.mount('main')
