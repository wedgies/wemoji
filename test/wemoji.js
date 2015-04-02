var assert = require("assert"),
  wemoji = require("..");

describe('wemoji', function() {

  it('works on utf-8', function(){
    var emoji = wemoji.unicode['❤️']
    assert.equal(emoji.description,"HEAVY BLACK HEART");
  })

  it('works on utf-8 variants', function(){
    var emoji = wemoji.unicode['❤']
    assert.equal(emoji.description,"HEAVY BLACK HEART");
  })

  it('works on names', function(){
    var emoji = wemoji.name['heart']
    assert.equal(emoji.description,"HEAVY BLACK HEART");
  })

})
