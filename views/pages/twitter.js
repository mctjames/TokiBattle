//API Section. Proceed with caution

var Twit = require('twit')

var T = new Twit({
  consumer_key:         'fUQDXW479q8xYCk3gWPsx0WbL',
  consumer_secret:      'hohfYIwnRBQdzYkNOMvmlGxSVgZl93mLc4mopLnyzB8saWI183',
  access_token:         '1193989007530610689-lmxbjSVscDQDNmAfZpd1WhORdX3HMA',
  access_token_secret:  'YztB5mHP356SNKSyNPTJkqcfisZOO3cpITa1MeBwQRCod',
})

//
//  tweet 'hello world!'
//

    T.post('statuses/update', { status: 'goodbye world!' }, function(err, data, response) {
    console.log(data)
    })