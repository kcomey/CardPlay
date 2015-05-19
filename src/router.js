var authenticateUser = require('./authenticate.js');

module.exports = function router(app) {
// This is middleware
//app.use(bodyParser.json());
app.use(function (req, res, next) {
  authenticateUser.isAuthenticated(req, res, next);
});

app.get('/login', function(req, res) {
  // Authenticate the user here
  res.send('This will be where the user can login');
});

app.route('/solitaire')
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
