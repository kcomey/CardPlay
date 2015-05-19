var mongo = require('./mongoose.js');

// Expose this function to our app using module.exports
module.exports = function(passport) {
var LocalStrategy = require('passport-local').Strategy;
var keygen = require('keygen');

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username, password);
    User.findOne({ username: username }, function (err, user) {
        if (!user) {
          console.log(username,'No username');
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          console.log('Invalid password');
          return done(null, false, { message: 'Incorrect password.' });
        }
        // If username and password match
        console.log('login email and password match');
        var userKey = keygen.url(keygen.medium);
        // Write the keygen to the user file to check later
        User.findOneAndUpdate({_id: user.id}, {keygen: userKey}, {new: true},
          function(err, result) {
            if (err) {
              return done(null, false);
            };
          }
        )
        return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('serialize ' + user.id);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser line 36');
    console.log('id is ' + id);
    User.findOne({ _id: id },function(err, user) {
    done(err, user);
  });
});
};




