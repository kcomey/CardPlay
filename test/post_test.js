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
    mongo.User.findOneAndUpdate({
        username: 'daniel'
      }, {
        username: 'daniel',
        password: 'test'
      }, {
        upsert: true
      },
      function(err, doc) {
        if (err) {
          return err;
        }
        done();
      });
  });

  after(function(done) {
    mongo.User.findOneAndRemove({
      username: 'daniel'
    }, function(err, doc) {
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
      .send({
        username: 'daniel',
        password: 'hunter2'
      })
      .end(function(err, res) {
        expect(res).to.redirectTo('/login');
        done();
      });
  });

  it('should log in testUser and return User is logged in', function(done) {
    agent
      .post('/login')
      .redirects(0)
      .send({
        username: 'daniel',
        password: 'test'
      })
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

  it('should be able to draw 8 times on a fresh deck', function(done) {
    var gameURL;
    var drawAction = {
      action: 'draw'
    };
    agent.get('/solitaire/newgame')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should not be able to draw 9 times on a fresh deck', function(done) {
    var gameURL;
    var drawAction = {
      action: 'draw'
    };
    agent.get('/solitaire/newgame')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(400);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should be able to draw 8 times then flip', function(done) {
    var gameURL;
    var drawAction = {
      action: 'draw'
    };
    agent.get('/solitaire/newgame')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send(drawAction);
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'flip'
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should not be able to flip on a fresh deck', function(done) {
    var gameURL;
    agent.get('/solitaire/newgame')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'flip'
        });
      })
      .then(function(res) {
        expect(res).to.have.status(400);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should promote the Ace of Clubs when unshuffled', function(done) {
    var gameURL;
    agent.get('/solitaire/newgame?key=un')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'promote',
          movefrom: '0',
          cardID: 1,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should unpromote the Ace of Clubs on a special deck', function(done) {
    var gameURL;
    agent.get('/solitaire/newgame?key=special')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'promote',
          movefrom: '1',
          cardID: 1,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'reveal',
          movefrom: '1',
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'unpromote',
          movefrom: '1',
          cardID: 1,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });

  it('should move an entire stack of cards on the chain deck', function(done) {
    var gameURL;
    agent.get('/solitaire/newgame?key=chain')
      .then(function(res) {
        gameURL = res.req.path;
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '6',
          moveto: '5',
          cardID: 14,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '5',
          moveto: '4',
          cardID: 2,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '4',
          moveto: '3',
          cardID: 16,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '3',
          moveto: '2',
          cardID: 4,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '2',
          moveto: '1',
          cardID: 18,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return agent.post(gameURL).send({
          action: 'move',
          movefrom: '1',
          moveto: '0',
          cardID: 4,
        });
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        return done();
      })
      .catch(done); // Call done(err) to fail the test on any error
  });
});
