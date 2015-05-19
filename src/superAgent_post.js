var request = require('superagent');

// Add your username and password to the database and
// then login with a POST to /login

request
  .post('http://localhost:3000/login')
  .send({ username: "Kendall", password: "Lucky7" })
  .set('Accept', 'application/json')
  .end(function(err, res) {
  });




