const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const Todolist = require('../../models/TodoList');

const userid1 = new ObjectId();
const userid2 = new ObjectId();
const userid3 = new ObjectId();

const user1 = {
  _id: userid1,
  email: 'zichu@test1.com',
  username: 'zichu1',
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign({_id: userid1, access: 'auth'}, process.env.JWT_SECRET).toString(),
    },
  ],
};

const user2 = {
  _id: userid2,
  email: 'zichu@test2.com',
  username: 'zichu2',
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign({_id: userid2, access: 'auth'}, process.env.JWT_SECRET).toString(),
    }],
};

const user3 = {
  _id: userid3,
  email: 'zichu@test3.com',
  username: 'zichu3',
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign({_id: userid3, access: 'auth'}, process.env.JWT_SECRET).toString(),
    }],
};

const users = [
  user1,
  user2,
  user3,
];

const todolistid1 = new ObjectId();
const todolistid2 = new ObjectId();

const todolists = [{
  _id: todolistid1,
  userid: userid1,
  title: 'list1',
  todos: [{
    todoid: new ObjectId(),
    content: 'todo1',
    completed: false,
  }, {
    todoid: new ObjectId(),
    content: 'todo2',
    completed: false,
  }],
}, {
  _id: todolistid2,
  userid: userid2,
  title: 'list2',
  todos: [{
    todoid: new ObjectId(),
    content: 'todo3',
    completed: false,
  }, {
    todoid: new ObjectId(),
    content: 'todo4',
    completed: false,
  }],
}];

const populateTodolists = (done) => {
  Todolist.remove({}).then(() => {
    Todolist.insertMany(todolists);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();
    const userThree = new User(users[2]).save();

    return Promise.all([userOne, userTwo, userThree]);
  }).then(() => done());
};

module.exports = {
  todolists, users, populateTodolists, populateUsers,
};
