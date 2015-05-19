'use strict';

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongo = require('../src/mongoose.js');

describe('Tests to check Passport authenication and x-api-keys', function() {
  before(function(done) {

  var user = { username: 'Roger', password: "MadMen" }
    mongo.User.populate(user, function (err, user) {
    console.log(user.username) // whip
  })

  });

  it('Expect login to return OK if credentials are valid',
  function(done) {
    chai.request(app)
      .post('http://localhost:3000/login')
      .send({ username: "Roger", password: "MadMen" })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        done();
      });
  });

// End describe
});
