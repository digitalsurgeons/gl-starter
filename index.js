var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
app.use(require('choo-devtools')())
app.use(require('./stores/webgl.js'))
app.route('/*', require('./views/main'))

module.exports = app.mount('body')
