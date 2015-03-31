var unicode = require('./lib/wemoji.json')
var name = {}

for ( emoji in unicode ) {
  var data = unicode[ emoji ]
  name[ data.name ] = data
}

exports.unicode = unicode
exports.name = name
