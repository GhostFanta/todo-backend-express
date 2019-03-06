require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
const TodoList = require('./models/TodoList');

const { ObjectId } = require('mongodb');

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI);

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => { setTimeout(next, 1000); });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(require('./routes'));

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  // Create seed user
  const userid = new ObjectId();
  const user = new User({
    _id: userid,
    email: 'admin@admin.com',
    username: 'admin',
    password: '123456',
    tokens: [
      {
        access: 'auth',
        token: jwt.sign({ _id: userid, access: 'auth' }, process.env.JWT_SECRET).toString(),
      },
    ],
  });

  user.save();

  // Create seed todolist
  const todolistid = new ObjectId();
  const todolist = new TodoList({
    _id: todolistid,
    title: 'list1',
    userid: userid.toString(),
    todos: [
      {
        content: 'todo1',
        completed: false,
      },
      {
        content: 'todo2',
        completed: false,
      },
      {
        content: 'todo3',
        completed: false,
      },
    ],
  });

  todolist.save();
}

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Listen on port: ${server.address().port}`);
});

module.exports = app;
