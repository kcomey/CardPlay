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

app.use(session({resave: true, secret: 'codefellows',
  saveUninitialized: true}));

app.use(passport.initialize());
//app.use(passport.session());
// This is middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(authenticateUser.isAuthenticated);


app.get('/login', function(req, res) {
  // Authenticate the user here
  console.log('This will be where the user can login');
  // add response


  var form = '<form action="/login" method="post">';
  form += '<br>Username: <input type="text" name="username" value="Username">';
  form += '<br>Password: <input type="password" name="password">';
  form += '<br><input type="submit" name="login" value="Log In">';
  form += '</form>\n';
  res.status(200).send(form);


});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res, next) {
    console.log('user is logged in');
    // User has successfully logged in here, send wherever you want them to go
    authenticateUser.setSession(req, res, function(err, sessionID) {
      console.log('session id is ' + sessionID);
      if (err) {
        res.status(500).send('Could not establish session');
      } else {
    // res.cookie('x-api-key', token);
        res.status(200).cookie('session', sessionID).send('User is logged in');
        req.session.token = sessionID;
      }
    });
  });

app.get('/solitaire/newgame', function(req, res) {
  var newGame = game.create();
  authenticateUser.saveState(newGame, function(err, game) {
    if (err) {
      res.status(500).send('Could not create a new game');
    } else {
      res.redirect('/solitaire/game/' + gameID);
    }
  });
});

app.get('/solitaire/game/:gameID', function(req, res) {
  authenticateUser.getState(req.params.gameID, function(err, game) {
    if (err) {
      res.status(404).send('Could not find game');
    } else {
      var form = '<form action="/solitaire/game/' + req.params.gameID + '" method="post">';
      form += '<br>move: <input type="text" name="move" value="draw">';
      form += '<br><input type="submit" name="login" value="Log In">';
      form += '</form>\n';
      res.status(200).send(form + game);
    }
  });
});

app.post('/solitaire/game/:gameID', function(req, res) {
  authenticateUser.getState(req.params.gameID, function(err, returnGame) {
    if (err) {
      res.status(404).send('Game does not exist');
      return;
    }
    switch (req.body.move) {
        case "draw":
          var newGame = actions.draw(returnGame);
          if (newGame) {
            authenticateUser.saveState(game, function(err, result) {
              if (err) {
                res.status(500).send('Could not save to database');
              } else {
                res.redirect('/solitaire/game/' + req.params.gameID);
              }
            })
          }
          break;

        case "move":
          break;

        case "flip":
          break;


}

  });
});

// Module close bracket
};


