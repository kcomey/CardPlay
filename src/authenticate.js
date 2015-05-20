var mongo = require('./mongoose.js');
var keygen = require('keygen');

exports.saveState = function(gameID, game) {
  var key = game.options.id;
  console.log(key);
  console.log(gameID);
  console.log(game);

  // mongo.Solitaire.findOneAndUpdate({"options.id": gameID}, game, {upsert: true, new: true},
  mongo.Solitaire.findOneAndUpdate({"options.id": "100"}, game, {upsert: true, new: true},
    function(err, result) {
      console.dir(err);
      console.log('thats the err');
      console.dir(result);
      console.log('thats the result');
      if (err) {
        res.status(404).send('Cannot save game');
      }
      result.save();
    });
};

exports.getState = function(req, res, gameID) {
  console.log('getState: ', gameID);
  mongo.Solitaire.findOne({ "options.id": gameID }, function (err, game) {
    if (err) {
      res.status(404).send('Game not found');
    }
    var form = '<form action="/solitaire/game/' + gameID + '" method="post">';
    form += '<br>Username: <input type="text" name="user" value="Username">';
    form += '<br>Password: <input type="password" name="pass">';
    form += '<br><input type="submit" name="login" value="Log In">';
    form += '</form>\n';
    res.status(200).send(form + game);
  });
};

exports.setSession = function(req, res, callback) {
  var userKey = keygen.url(keygen.medium);
  // Write the keygen to the user file to check later
  mongo.User.findOneAndUpdate({username: req.body.username}, {session: userKey},
    {new: true},
    function(err, result) {
      callback(err, userKey);
    }
  )
};

exports.isAuthenticated = function(req, res, next) {
  // If they are just logging in they don't need to be authenticated yet
  if (req.path === '/login') return next();
   // var token = req.session.token;
   var token = req.cookies.session;
   console.log(token);
   console.log('thats the token');
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




