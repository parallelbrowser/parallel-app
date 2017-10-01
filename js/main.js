const choo = require('choo')

var app = choo()
app.use(require('./stores/dbs'))
app.use(require('./stores/profiles'))
app.use(require('./stores/posts'))
// app.use(require('./stores/new-post'))
app.use(require('./stores/feed'))
app.use(require('./stores/header'))
app.use(require('./stores/gizmos'))
app.use(require('./stores/comments'))

app.route('/', require('./views/main'))
app.route('/profile/:key', require('./views/profile'))
app.route('/profile/:key/follows', require('./views/follows'))
app.route('/profile/:key/edit', require('./views/profile'))
app.route('/post/*', require('./views/post'))
app.route('/settings', require('./views/settings'))

// TCW -- new routes
// user workbench: (for submitting scripts)
// shop: for displaying and subscribing to prescripts
// prescript: for displaying a single prescript in detail
// postscripts: for seeing the user feed of postscripts
// postscript: for seeing individual postscript details

app.route('/workbench', require('./views/workbench'))
app.route('/shop/:key', require('./views/shop'))
app.route('/gizmos/:key', require('./views/subgizmos'))
app.route('/gizmo/*', require('./views/gizmo'))

// end

app.mount('main')
