'use strict';

var app = require('../src/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongo = require('../src/mongoose.js');

describe('Tests to check Passport authenication and x-api-keys', function() {


  it('should send the user to a login page', function(done) {
    var form = '<form action="/login" method="post">';
        form += '<br>Username: <input type="text" name="username" value="Username">';
        form += '<br>Password: <input type="password" name="password">';
        form += '<br><input type="submit" name="login" value="Log In">';
        form += '</form>\n';

    chai.request(app)
      .get('/login')
      .end(function(err, res) {
        expect(res.text).to.eql(form);
        expect(res).to.have.status(200);
        done();
      });
  });


  it('should log in testUser and return User is logged in', function(done) {
    chai.request(app)
      .post('/login')
      .auth('daniel', 'esqueda')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

// End describe
});
