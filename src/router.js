var authenticateUser = require('./authenticate.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var authenticateUser = require('./authenticate.js');
require('./config_passport')(passport);
var game = require('./solitaire/game.js');
var actions = require('./solitaire/actions.js');
var session = require('express-session');
var mongo = require('./mongoose.js');

module.exports = function router(app) {

  app.use(session({
    resave: true,
    secret: 'codefellows',
    saveUninitialized: true,
  }));

  app.use(passport.initialize());
  // This is middleware
  app.use(bodyParser.urlencoded({
    extended: false,
  }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(authenticateUser.isAuthenticated);


  app.get('/login', function(req, res) {
    // Authenticate the user here
    console.log('This will be where the user can login');
    // Add response


    var form = '<form action="/login" method="post">';
    form += '<br>Username: <input type="text" name="username" ';
    form += 'value="Username">';
    form += '<br>Password: <input type="password" name="password">';
    form += '<br><input type="submit" name="login" value="Log In">';
    form += '</form>\n';
    res.status(200).send(form);


  });

  app.post('/login',
    passport.authenticate('local', {
      failureRedirect: '/login',
    }),
    function(req, res, next) {
      console.log('user is logged in');
      // User has successfully logged in here, send wherever you want them to go
      authenticateUser.setSession(req, res, function(err, sessionID) {
        console.log('session id is ' + sessionID);
        if (err) {
          res.status(500).send('Could not establish session');
        } else {
          res.status(200).cookie('session', sessionID)
          .send('User is logged in');
          req.session.token = sessionID;
        }
      });
    });

  app.get('/solitaire/newgame', function(req, res) {
    var newGame;
    if (req.query.key === 'un') {
      var unshuffled = {
        deck: 'unshuffled',
      };
      newGame = game.create(unshuffled);
    } else if (req.query.key === 'special') {
      var special = {
        deck: 'special',
      };
      newGame = game.create(special);
    } else if (req.query.key === 'chain') {
      var chain = {
        deck: 'chain',
      };
      newGame = game.create(chain);
    } else {
      newGame = game.create();
    }
    authenticateUser.saveState(newGame, function(err, game) {
      if (err) {
        res.status(500).send('Could not create a new game');
      } else {
        res.redirect('/solitaire/game/' + game.options.id);
      }
    });
  });

  app.get('/solitaire/game/:gameID', function(req, res) {
    authenticateUser.getState(req.params.gameID, function(err, game) {
      if (err) {
        res.status(404).send('Could not find game');
      } else {
        var form = '<form action="/solitaire/game/' + req.params.gameID +
        '" method="post">';
        form += '<br><input type="text" name="cardID" value="">';
        form += '<p>move from: <select name="movefrom">';
        form += '<option value="drawpile">Draw Pile</option><option value="0">';
        form += '0</option>';
        form += '<option value="1">1</option><option value="2">2</option>';
        form += '<option value="3">3</option><option value="4">4</option>';
        form += '<option value="5">5</option><option value="6">6</option>';
        form += '</select>';
        form += '&nbsp;move to: <select name="moveto">';
        form += '<option value="0">0</option>';
        form += '<option value="1">1</option><option value="2">2</option>';
        form += '<option value="3">3</option><option value="4">4</option>';
        form += '<option value="5">5</option><option value="6">6</option>';
        form += '</select>';
        form += '<p>Select Action: <select name="action">';
        form += '<option value="draw">Draw</option><option value="flip">Flip';
        form += '</option>';
        form += '<option value="move">Move</option><option value="reveal">';
        form += 'Reveal</option>';
        form += '<option value="promote">Promote</option><option value=';
        form += '"unpromote">Unpromote</option></select>';
        form += '<p><input type="submit" name="login" value="Submit Action">';
        form += '</form>\n';
        res.status(200).send(form + JSON.stringify(game));
      }
    });
  });

  app.post('/solitaire/game/:gameID', function(req, res) {
    var newGame;
    authenticateUser.getState(req.params.gameID, function(err, returnGame) {
      if (err) {
        res.status(404).send('Game does not exist');
        return;
      }
      switch (req.body.action) {
        case 'draw': {
          newGame = actions.draw(returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else { // Invalid action, can't draw on an empty deck
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">');
          }
          break;
        }
        case 'promote': {
          newGame = actions.promote(req.body.cardID, req.body.movefrom,
            returnGame);
          console.log(newGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'flip': {
          newGame = actions.flip(returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'reveal': {
          newGame = actions.reveal(req.body.movefrom, returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
        case 'unpromote': {
          newGame = actions.unpromote(req.body.cardID, req.body.movefrom,
            returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }

        case 'move': {
          newGame = actions.move(req.body.cardID, req.body.movefrom,
            req.body.moveto, returnGame);
          if (newGame) {
            authenticateUser.saveState(newGame, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            });
          } else {
            res.status(400)
            .send('<img src="http://httpcats.herokuapp.com/400">\n');
          }
          break;
        }
      }

    });
  });
  // Module close bracket
};
