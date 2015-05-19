var request = require('superagent');

// After you have logged in with POST, get your keygen
// from the database and put it in this GET request

request
  .get('http://localhost:3000/solitaire')
  .set('X-API-Key', 'J4KYFTtcVhwMUVMUMZ4ynQ')
  .set('Accept', 'application/json')
  .end(function(err, res) {
  });




