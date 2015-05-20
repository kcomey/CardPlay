var authenticateUser = require('./authenticate.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticateUser = require('./authenticate.js');
require('./config_passport')(passport);
var game = require('./solitaire/game.js');
var session = require('express-session');
var mongo = require('./mongoose.js');

module.exports = function router(app) {

app.use(session({resave: true, secret: 'codefellows',
  saveUninitialized: true}));

app.use(passport.initialize());
//app.use(passport.session());
// This is middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
  authenticateUser.isAuthenticated(req, res, next);
});

app.get('/login', function(req, res) {
  // Authenticate the user here
  console.log('This will be where the user can login');
  // add response
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
        res.status(200).send('User is logged in');
        req.session.token = sessionID;
      }
    });
  });

app.get('/solitaire/newgame', function(req, res) {
  var newGame = game.create();
  var gameID = newGame.options.id;
  authenticateUser.saveState(gameID, newGame);
  res.redirect('/solitaire/game/' + gameID);
});

app.get('/solitaire/game/:gameID', function(req, res) {
  authenticateUser.getState(req, res, req.params.gameID);
});



};

