var express = require('express');
var app = express();
var deviceProfiler = require('./deviceProfiling');

// respond with "hello world" when a GET request is made to the homepage

//app.use(express.static('static'));
app.use( function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.get('/checkDevice', function(req, res) {
  var result = deviceProfiler.checkDevice(req.query.agent);
  res.send(result);
});
app.get('/learn', function(req, res) {
  var result = deviceProfiler.learn(req.query.agent,req.query.device);
  res.send({"learn":true});
});

var server = app.listen(6677, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
