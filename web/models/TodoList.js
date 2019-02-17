var mongoose = require('mongoose');
var TodoItem = require('./TodoItem');

var TodoListSchema = mongoose.Schema({
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

TodoListSchema.methods = {
  jsonfy: function (todolist) {
    return {
      id: this._id,
      title: this.title,
      created: this.created,
      modified: this.modified
    }
  },
  getTodoLists: function () {
    this.find({}).populate()
  },

  createTodoList: function (title) {

  },
  updateTodoList: function (listid, title) {

  },
  getTodoList: function (listid) {

  },
  deleteTodoList: function (listid) {
    
  },
  deleteTodoItem: function (listid, itemid) {
    
  }
};

module.exports = mongoose.model('TodoList', TodoListSchema);

