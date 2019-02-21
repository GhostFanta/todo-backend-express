const router = require('express').Router();
const TodoList = require('../../models/TodoList');
const authenticate = require('../../middleware/auth');

// get todolists for the dashboard
router.get('/', authenticate, (req, res, next) => {
  TodoList.find({ userid: req.user._id }).then((docs) => {
    res.status(200).send(docs);
  }, (err) => {
    res.status(404).send(err);
  }).catch(next);
});

// get info of a certain todolist
router.get('/todolist/:todolistid', authenticate, (req, res, next) => {
  TodoList.findOne({ _id: req.params.todolistid }).then((docs) => {
    res.status(200).send(docs);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// creat a new todolist
router.post('/createnewlist', authenticate, (req, res, next) => {
  const todoList = new TodoList(
    req.body,
  );

  todoList.save().then((doc) => {
    res.status(201).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// PUT /todolist: update the title or todos of a todolist identified by todolistid and userid
router.put('/todolist/', authenticate, (req, res, next) => {
  TodoList.findOneAndUpdate({ _id: req.body.todolistid, userid: req.user._id }, {
    $set: {
      title: req.body.title,
      todos: req.body.todos,
    },
  }).then((doc) => {
    if (!doc) {
      res.status(404).send();
    }
    res.status(202).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// delete a todolist
router.delete('/todolist/', authenticate, (req, res, next) => {
  TodoList.deleteOne({ _id: req.body.todolistid, userid: req.user._id }).then((doc) => {
    res.status(202).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

module.exports = router;
