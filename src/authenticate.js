var mongo = require('./mongoose.js');


module.exports.isAuthenticated = function(req, res, next) {
  // If they are just logging in they don't need to be authenticated yet
  if (req.path === '/login') return next();

  var apiKey = req.headers['x-api-key'];
    mongo.User.findOne({ keygen: apiKey },function(err, user) {
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




