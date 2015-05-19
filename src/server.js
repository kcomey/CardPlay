var express = require('express');
var passport = require('passport');
var app = express();
var router = require('./router.js');
var morgan = require('morgan');
app.use(passport.initialize());
app.use(passport.session());
require('./config_passport')(passport);
var authenticateUser = require('./authenticate.js');

router(app);

// Setting up middleware
//app.use(bodyParser.json());
app.use(morgan('dev'));
/*app.use(function (req, res, next) {
  authenticateUser.isAuthenicated(req, res, next);
});*/

/*app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('works to authenticate');
    console.log(req.user);
    res.status(200).send('Logged in');
    //res.redirect('/');
  });*/

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
