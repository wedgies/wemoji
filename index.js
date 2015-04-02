var unicode = require('./lib/wemoji.json')
var name = {}

for ( emoji in unicode ) {

  var data = unicode[ emoji ]

  // Create name map
  name[ data.name ] = data

  // Add variations to index
  if (data.variations) {
    for (i in data.variations) {
      var variation = data.variations[i]
      unicode[ variation ] = data
    }
  }

}

exports.unicode = unicode
exports.name = name
