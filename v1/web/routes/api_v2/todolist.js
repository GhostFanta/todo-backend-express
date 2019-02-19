const router = require('express').Router();
const TodoList = require('../../models_v2/TodoList');

// get todolists for dashboard
router.get('/', (req, res) => {
  TodoList.find({}).then((docs) => {
    res.status(200).send(docs);
  }, (err) => {
    res.status(404).send(err);
  }).catch(next);
});

// get info of a certain todolist
router.get('/todolist/:todolistid', (req, res, next) => {
  TodoList.find({_id: req.parmas.todolistid}).then((docs) => {
    res.status(200).send(docs);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// creat a new todolist
router.post('/createnewlist', (req, res, next) => {
  const todoList = new TodoList(
    req.body
  );

  todoList.save().then((doc) => {
    res.status(201).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// update the title or todos of a todolist
router.put('/todolist/', (req, res, next) => {
  TodoList.findOneAndUpdate({}).then((doc) => {

  }).catch(next);
});

// delete a todolist
router.delete('/todolist/', (req, res, next) => {
  TodoList.deleteOne({_id: req.body.todolistid}).then((doc) => {
    res.status(203).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

module.exports = router;