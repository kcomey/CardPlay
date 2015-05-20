var mongo = require('./mongoose.js');

// Expose this function to our app using module.exports
module.exports = function(passport) {
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    mongo.User.findOne({ username: username }, function (err, user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        // If username and password match
        return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    mongo.User.findOne({ _id: id },function(err, user) {
    done(err, user);
  });
});

};




