var mongoose = require('mongoose');

var TodoItemSchema = mongoose.Schema({
  content: {type: String},
  completed: {type: Boolean},
  listid: {type: mongoose.Schema.Types.ObjectId, ref: "TodoList"}
});

TodoItemSchema.methods = {
  jsonfy: function (listid) {
    return {
      content: this.content,
      completed: this.completed,
      listid: this.listid
    }
  },
  updateTodoItem: function (itemid) {

  },
  toggleComplete: function (itemid) {

  },
  addTodoItem: function (content) {

  }
};

module.exports = mongoose.model('TodoItem', TodoItemSchema);
