var express = require('express');
var app = express();
var router = require('./router.js');
var morgan = require('morgan');

app.use(morgan('dev'));

router(app);

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
