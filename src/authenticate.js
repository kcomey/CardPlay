var mongo = require('./mongoose.js');

module.exports =
  function(username, password) {
    mongo.User.findOne({ username: username }, function (err, user) {
      if (err) {
      console.log('Error!');
      }
      if (password != user.password) {
        console.log('Password is not correct');
      }
      console.log(user.username + ' is logged in');
    });
  };
