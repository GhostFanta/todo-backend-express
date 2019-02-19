const mongoose = require('mongoose');
const TodoList = require('./TodoList');
const User = require('./User');

mongoose.connect('mongodb://localhost:27017/TodoApp');

TodoList.findOne({'title': 'list1'}).populate("userid").exec().then((doc) => {
  console.log(doc);
});


