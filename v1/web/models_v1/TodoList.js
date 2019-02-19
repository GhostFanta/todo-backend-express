const mongoose = require('mongoose');
const TodoItem = require('./TodoItem');

const TodoListSchema = mongoose.Schema({
    title: {type: String},
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'TodoItem'}]
  },
  {
    timestamps: {
      createdAt: 'created',
      modifiedAt: 'modified'
    }
  });


module.exports = mongoose.model('TodoList', TodoListSchema);

