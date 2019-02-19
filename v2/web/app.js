var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

var TodoList = require('./models/TodoList');
var User = require('./models/User');

var app = express();
app.use(bodyParser.json());
app.use(require('./routes'));

var server = app.listen(3000, function () {
  console.log('Listen on port: ' + server.address().port);
});