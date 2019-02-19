const router = require('express').Router();
const mongoose = require('mongoose');
const TodoList = require('../../models_v1/TodoList');

router.get('/todolist/:todolistid', (req, res, next) => {
  TodoList.find({_id: req.params.todolistid}).then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

router.get('/', (req, res, next) => {
  TodoList.find({}, 'title createdAt modifiedAt').then((doc) => {
    res.status(200).send(doc);
  }, (err)=>{
    res.status(500).send(err);
  }).catch(next);
});

router.post('/createtodolist', (req, res, next) => {
  const todolist = new TodoList(
    req.body
  );
  todolist.save().then((doc) => {
    res.status(201).send(doc);
  }).catch(next);
});

module.exports = router;