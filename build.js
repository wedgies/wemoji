require('string.fromcodepoint')
var jf = require('jsonfile'),
    util = require('util'),
    csv = require('csv'),
    fs = require('fs')


var CSS_FORMAT = ".emoji-%s {background-size:100% !important; background-image: url('data:%s;base64,%s');}"

var platformAvailability = {}

jf.readFile('emoji-data/emoji.json', function(err, emojis) {
  readCategories('data/categories.csv', function(err, categories) {
    if (err) { return console.log( err ) }
    generateAssetsFor(emojis, categories, 'twitter', 'tw')
    generateAssetsFor(emojis, categories, 'apple', 'a')
    generateAssetsFor(emojis, categories, 'google', 'g')
    generateData( emojis, categories )
  })
})

function generateAssetsFor(emojis, categories, platform, platformCode) {

  var json = [], css = [], html = []

  html.push('<html><head>')
  html.push('<title>wemoji-' + platformCode + ' preview</title>')
  html.push('<link type="text/css" rel="stylesheet" media="all" href="emoji.css">')
  html.push('<link type="text/css" rel="stylesheet" media="all" href="wemoji-' + platformCode + '.css">')
  html.push('</head><body><table>')

  for ( i in emojis ) {

    var emoji = emojis[i],
      imagePath = emoji[platform + '_img_path']

    if ( emoji.name && imagePath ) {

      platformAvailability[ emoji.unified ] = platformAvailability[ emoji.unified ] || []
      platformAvailability[ emoji.unified ].push( platformCode )

      var jsonData = {
        name: emoji.short_name,
        unicode: emoji.unified,
        shortcode: cssIfyName(emoji.short_name),
        description: emoji.name,
        category: categories[ emoji.unified ]
      }

      // json data
      json.push(jsonData)

      // css data
      var base64 = getBase64( './emoji-data/' + imagePath )
      var cssStr = util.format(CSS_FORMAT, jsonData.shortcode, 'image/png', base64)
      css.push(cssStr)

      // html preview
      html.push('<tr>')
      html.push('<td><span class="emoji emoji-' + jsonData.shortcode +'">' + jsonData.shortcode + '</td>')
      html.push('<td>' + jsonData.unicode + '</td>')
      html.push('<td>' + jsonData.shortcode + '</td>')
      html.push('<td>' + jsonData.description + '</td>')
      html.push('</tr>')
    }

  }

  html.push('</table></body></html>')

  var cssFilename = 'dist/wemoji-' + platformCode + '.css'
  fs.writeFile(cssFilename, css.join("\n"), function(err) {
    if (err) return console.log(err);
    console.log("Wrote " + cssFilename)
  })

  var jsonFilename = 'dist/wemoji-' + platformCode + '.json'
  jf.writeFile(jsonFilename, json, function(err) {
    if (err) return console.log(err);
    console.log("Wrote " + jsonFilename)
  })

  var htmlFilename = 'dist/wemoji-' + platformCode + '.html'
  fs.writeFile(htmlFilename, html.join("\n"), function(err) {
    if (err) return console.log(err);
    console.log("Wrote " + htmlFilename)
  })

}

function generateData( emojis, categories ) {
  var json = {}
  for ( i in emojis ) {
    var emoji = emojis[i]
    var utf8 = toUTF8( emoji.unified )
    json[ utf8 ] = {
      emoji: utf8,
      platforms: platformAvailability[ emoji.unified ],
      description: emoji.name,
      name: emoji.short_name,
      css: cssIfyName( emoji.short_name ),
      category: categories[ emoji.unified ]
    }
  }
  jf.writeFile('lib/wemoji.json', json, function(err) {
    if (err) return console.log(err);
    console.log("Wrote lib/wemoji.json")
  })
}

function toUTF8(code) {
  var codes = code.split('-').map(function(value, index) {
    return parseInt(value, 16);
  });
  return String.fromCodePoint.apply(null, codes);
}

function getBase64(filename) {
  try {
    var bitmap = fs.readFileSync(filename);
  } catch (e) {
    return false;
  }
  var string = new Buffer(bitmap).toString('base64');
  return string;
}

function cssIfyName(name) {
  return name
  .replace('+', 'plus')
}

function readCategories(filename, callback) {
  var categories = {}
  fs.readFile(filename, 'utf-8', function(err, data) {
    if (err) { callback(err) }
    csv.parse(data, function(err, csvData) {
      if (err) { callback(err) }
      for (i in csvData) {
        categories[ csvData[i][1] ] = csvData[i][4]
      }
      callback(null,categories)
    })
  })
}
