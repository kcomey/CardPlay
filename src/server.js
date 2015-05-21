var express = require('express');
var app = express();
var router = require('./router.js');
var morgan = require('morgan');

app.use(morgan('dev'));

router(app);

module.exports = app;
