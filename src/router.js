var authenticateUser = require('./authenticate.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticateUser = require('./authenticate.js');
require('./config_passport')(passport);
var game = require('./solitaire/game.js');

module.exports = function router(app) {

app.use(passport.initialize());
app.use(passport.session());
// This is middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
  authenticateUser.isAuthenticated(req, res, next);
});

app.get('/login', function(req, res) {
  // Authenticate the user here
  console.log('This will be where the user can login');
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res, next) {
    // User has successfully logged in here, send wherever you want them to go
    authenticateUser.setCookie(req, res, next);
  });

app.route('/')
  app.get('/solitaire/newgame', function(req, res) {
    var newGame = game.create();
    var gameID = newGame.options.id;
    res.redirect('/game/' + gameID)
  })
  app.post('/draw', function(req, res) {
  // Send to draw function
  })
  app.post('/flip', function(req, res) {
  // Send to flip function
  })
  app.post('/move', function(req, res) {
  // Send to move function
  })
  app.post('/promote', function(req, res) {
  // Send to promote function
  })
  app.post('/unpromote', function(req, res) {
  // Send to unpromote function
  })
  app.post('/reveal', function(req, res) {
  // Send to reveal function
  });
};
