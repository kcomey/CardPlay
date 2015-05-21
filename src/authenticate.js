var mongo = require('./mongoose.js');
var keygen = require('keygen');

exports.saveState = function(game, callback) {
  var gameID = game.options.id;

  mongo.Solitaire.findOneAndUpdate({'options.id': gameID}, game,
    {upsert: true, new: true}, callback);
};

exports.getState = function(gameID, callback) {
  mongo.Solitaire.findOne({ 'options.id': gameID }).lean().exec(callback);
};

exports.setSession = function(req, res, callback) {
  var userKey = keygen.url(keygen.medium);
  // Write the keygen to the user file to check later
  mongo.User.findOneAndUpdate({username: req.body.username}, {session: userKey},
    {new: true},
    function(err, result) {
      callback(err, userKey);
    }
  );
};

exports.isAuthenticated = function(req, res, next) {
  // If they are just logging in they don't need to be authenticated yet
  if (req.path === '/login') {
    return next();
  }
  var token = req.cookies.session;
  if (token === undefined) {
    res.redirect('/login');
  }
  mongo.User.findOne({ session: token }, function(err, user) {
    console.log('user is ' + user);
    if (err) {
      return err;
    }
    // If key is found, send them on their way
    if (user) {
      next();
    } else {
      // Are not authorized
      res.redirect('/login');
    }
  });
};




