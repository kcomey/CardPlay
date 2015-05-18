var express = require('express');
var expressStatic  = require('express-static');
var session = require('express-session')
var app = express();
var authenticate = require('./authenticate.js');

authenticate('Kendall', 'Lucky7');

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
