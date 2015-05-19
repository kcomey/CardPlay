var authenticateUser = require('./authenticate.js');
var bodyParser = require('body-parser');
var passport = require('passport');
var authenticateUser = require('./authenticate.js');
require('./config_passport')(passport);

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
  function(req, res) {
    // User has successfully logged in here, send wherever you want them to go
    res.status(200).send('Logged in');
    //res.redirect('/');
  });

  app.get('/solitaire', function(req, res) {
  // Send to draw function
    console.log('not getting here?');
    res.status(200).send('Checking authentication, this works')
  })


// Needs to be fixed, changed, deleted, whatever
/*app.route('/solitaire')
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
  });*/
};
