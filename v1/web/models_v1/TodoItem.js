var mongoose = require('mongoose');

var TodoItemSchema = mongoose.Schema({
  content: {type: String},
  completed: {type: Boolean},
  listid: {type: mongoose.Schema.Types.ObjectId, ref: "TodoList"}
});

module.exports = mongoose.model('TodoItem', TodoItemSchema);