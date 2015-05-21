var app = require('./server');

app.listen(process.env.PORT || 3000, function() {
  console.log('server started');
});
