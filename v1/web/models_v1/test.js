const mongoose = require('mongoose');
const TodoItem = require('./TodoItem');
const TodoList = require('./TodoList');
const User = require('./User');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

const user1 = new User({
  email: 'test@test.com',
  token: 'fdjkasfj'
});

const list1 = new TodoList({
  title: "list1",
  userid: user1._id,
  todos: []
});

const item1 = new TodoItem({
  content: 'item1',
  completed: 'false',
  listid: list1._id
});

list1.todos.push(item1);


item1.save();
user1.save();
list1.save();


TodoItem.findOne({content: 'item1'}).populate('listid').exec(function (err, info) {
  console.log(info.listid.title);
});

//Add user
//Update user
//Get user by email

// Add todo list
// Remove todolist



// TodoItem.deleteMany({completed:false}).exec();
// TodoList.deleteMany({title:'list1'}).exec();
// User.deleteMany({email:'test@test.com'}).exec();
