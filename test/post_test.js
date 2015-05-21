'use strict';

var app = require('../src/server');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongo = require('../src/mongoose.js');

var agent = chai.request.agent(app);

describe('The API responds to GETs & POSTs', function() {
  before(function(done) {
    mongo.User.findOneAndUpdate({username: 'daniel'},
      {username: 'daniel', password: 'test'},
      {upsert: true},
      function(err, doc) {
        if (err) {
          return err;
        }
        done();
      });
  });

  after(function(done) {
    mongo.User.findOneAndRemove({username: 'daniel'}, function(err, doc) {
      if (err) {
        return err;
      }
      done();
    });
  });

  it('should not be able to create new games if not logged in', function(done) {
    agent.get('/solitaire/newgame').redirects(0).end(function(err, res) {
      expect(res).to.redirectTo('/login');
      done();
    });
  });

  it('should not log in with bad password', function(done) {
    agent
      .post('/login')
      .redirects(0)
      .send({username: 'daniel', password: 'hunter2'})
      .end(function(err, res) {
        expect(res).to.redirectTo('/login');
        done();
      });
  });

  it('should log in testUser and return User is logged in', function(done) {
    agent
      .post('/login')
      .redirects(0)
      .send({username: 'daniel', password: 'test'})
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should be able to create new games', function(done) {
    agent.get('/solitaire/newgame').redirects(0).end(function(err, res) {
      expect(res).to.have.status(302);
      expect(res.headers.location.match(/^\/solitaire\/game\//)).to.not.be.null;
      done();
    });
  });

  it('should be able to create new games', function(done) {
    var gameURL;
    agent.get('/solitaire/newgame').then(function(res) {
      return agent
        .post(res.req.path)
        .send({
          action: "draw"
        })
        .end(function(err, res) {
          if (err) {
            return err;
          }
          expect(res).to.have.status(200);
          done();
        });
    });
});
  // it('', function(done) {
  //   agent.get('/solitaire/newgame').redirects(0).end(function(err, res) {
  //     expect(res).to.have.status(302);
  //     expect(res.headers.location.match(/^\/solitaire\/game\/.*/)).to.not.be.null;
  //     agent
  //       .post(res.headers.location)
  //       .send({ action: "draw" })
  //       .end(function(err, res) {
  //         if (err) { return err; }
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
