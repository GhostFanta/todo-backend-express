var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

var TodoList = require('./models_v1/TodoList');
var User = require('./models_v1/User');

var Todo = new TodoList({
  title:"ha",
  todos:[]
});

// Todo.save();

TodoList.find({}).then(function (res){

});

var app = express();
app.use(bodyParser.json());
app.use(require('./routes'));

var server = app.listen(3000, function () {
  console.log('Listen on port: ' + server.address().port);
});