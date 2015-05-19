var mongo = require('./mongoose.js');
var keygen = require('keygen');
var LocalStrategy = require('passport-local').Strategy;

module.exports.authenticate = function(username, password) {
  mongo.User.findOne({ username: username }, function (err, user) {
    if (err) {
    console.log('Error!');
    }
    if (password != user.password) {
      console.log('Password is not correct');
    }
    var userKey = keygen.url(keygen.medium);
    mongo.User.findOneAndUpdate({_id: user.id}, {keygen: userKey}, {new: true},
      function(err, result) {
        if (err) {
          return done(null, false);
        };
      }
    );
    console.log(user.username + ' is logged in');
  });
};

module.exports.isAuthenticated = function(req, res, next) {
  console.log('checking auth');
  console.log(req.header);
  next();
};




