var mongo = require('./mongoose.js');
var keygen = require('keygen');
var cookieParser = require('cookie-parser');

exports.saveState = function(gameID, game) {
  var key = game.options.id;
  console.log(key);
  console.log(gameID);
  console.log(game);

  mongo.Solitaire.findOneAndUpdate({key: gameID}, game, {new: true},
    function(err, result) {
      if (err) {
        res.status(404).send('Cannot save game');
      }
    });
};

exports.getState = function(gameID) {
  mongo.Solitaire.findOne({ "options.id": "100" }, function (err, game) {
    if (err) {
      res.status(404).send('Game not found');
    }
    res.status(200).send(game);
  });
};

exports.setSession = function(req, res, next) {
  var userKey = keygen.url(keygen.medium);
  // Write the keygen to the user file to check later
  mongo.User.findOneAndUpdate({username: req.body.username}, {session: userKey}, {new: true},
    function(err, result) {
      if (err) {
        return err;
      };
    }
  )
  req.session.token = userKey;
}

exports.isAuthenticated = function(req, res, next) {
  // If they are just logging in they don't need to be authenticated yet
  if (req.path === '/login') return next();
   var token = req.session.token;
   mongo.User.findOne({ session: token },function(err, user) {
      console.log('user is ' + user);
      if (err) {
        return err;
      }
      // If key is found, send them on their way
      if (user) {
        next();
      }
      else {
        // Are not authorized
        res.redirect('/login');
      }
    });
};




