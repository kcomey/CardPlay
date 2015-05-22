'use strict';

var app = require('../src/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongo = require('../src/mongoose.js');

describe('Tests to check Passport authenication and x-api-keys', function() {

  before(function(done) {
    mongo.User.findOneAndUpdate({username: 'daniel'},
      {username: 'daniel', password: 'test'},
      {upsert: true},
      function(err, doc) {
        if (err) {
          done();
        }
        console.log('user daniel created');
      });
    done();
  });

  after(function(done) {
    mongo.User.findOneAndRemove({username: 'daniel'}, function(err, doc) {
      if (err) {
        done();
      }
      console.log('user daniel removed');
    });
    done();
  });

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

  it('should redirect to /login if you start a newgame w/o logging in', function(done) {
    chai.request(app)
      .get('/solitaire/newgame')
      .redirects(0)
      .end(function(err, res) {
        expect(res).to.redirectTo('/login');
        done();
      });
  });


  it('should log in testUser and return User is logged in', function(done) {
    chai.request(app)
      .post('/login')
      .redirects(0)
      .send({username: 'daniel', password: 'test'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should redirect to /login if user is not in database', function(done) {
    chai.request(app)
      .post('/login')
      .redirects(0)
      .send({username: 'tom', password: 'notgood'})
      .end(function(err, res) {
        expect(res).to.redirectTo('/login');
        done();
      });
  });


// End describe
});
