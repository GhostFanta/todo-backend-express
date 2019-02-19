const mongoose = require('mongoose');
const mongodb = require('mongodb');

const TodoListSchema = mongoose.Schema({
  title: {type: String},
  userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User_V2'},
  todos: [{
    todoid: mongodb.ObjectId,
    content: String,
    completed: Boolean
  }]
}, {
  timestamp: {
    createdAt: 'created',
    modifiedAt: 'modified'
  }
});

module.exports = mongoose.model('TodoList_V2', TodoListSchema);
