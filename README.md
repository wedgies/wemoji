# wemoji

A drop-in replacement for [gemoji](https://www.npmjs.com/package/gemoji), with perfectly CSS display and [emoji picker](https://github.com/wedgies/jquery-emoji-picker) assets. Built off of [emoji-data](https://github.com/iamcal/emoji-data)

## Installation

```
npm install wemoji
```

## Usage

```javascript
var wemoji = require('wemoji')

wemoji.name['dragon']
```

Yields:

```javascript
{ emoji: '🐉',
  platforms: [ 'tw', 'a', 'g' ],
  description: 'DRAGON',
  name: 'dragon',
  css: 'dragon',
  category: 'animal' }
```

## By unicode emoji:

```javascript
wemoji.unicode['🏩']
```

Yields:

```javascript
{ emoji: '🏩',
  platforms: [ 'tw', 'a', 'g' ],
  description: 'LOVE HOTEL',
  name: 'love_hotel',
  css: 'love_hotel',
  category: 'travel' }
```

## Fields Returned

- **emoji** : the utf-8 representation of the emoji
- **platform** : an array of platforms with images for this emoji (_a_ is for apple, _g_ is for google, _tw_ is for twitter)
- **description** : the official unicode description in loud-case
- **name** : short name
- **css** : the css class suffix for the stylesheets, not always the same as the name
- **category** : the name of the category we use in our picker

## Rebuilding Everything

We use [emoji-data](https://github.com/iamcal/emoji-data) as a submodule, so make sure you check out and initial the submodule prior to trying a rebuild.

```bash
$ git clone https://github.com/wedgies/wemoji
$ git submodule init
$ git submodule update
$ npm install
$ grunt build
```

## Why?

When we decided to write emoji support into our platform we were inspired by lots of great projects such as [twemoji](https://github.com/twitter/twemoji), [emojify](https://github.com/hassankhan/emojify.js), and [emoji-data](https://github.com/iamcal/emoji-data). If we put them together, we could have a complete front and back end solution. But there was one little problem - there were slight differences in each platform that made them hard to combine without a lot of little hacks.

We looked at each and decided that emoji-data had the nicest and most complete data, so that is what we decided to start with and build out everything else we needed:

- an npm data source module to replace gemoji (we plug this data into [emoji-text](https://www.npmjs.com/package/emoji-text) to accessibly convert emoji on our back end)
- CSS stylesheets with data-uri encoded images similar to those provided by [emojify](https://github.com/hassankhan/emojify.js) - a separate one for twitter, apple, and github emoji icons.
- A matched JSON data file to plug into our [emoji picker](https://github.com/wedgies/jquery-emoji-picker)



## Usage



[![Built with Wedgies](https://d3v9r9uda02hel.cloudfront.net/production/1.55.17/img/built-with-wedgies.png)](http://wedgies.com)