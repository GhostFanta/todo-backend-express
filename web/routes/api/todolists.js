const router = require('express').Router();
const mongoose = require('mongoose');
const TodoLists = require('../../models/TodoList');

router.get('/', function (req, res) {
  TodoLists.find({}).then(function (docs) {
      res.status(200).send(docs);
    }
  );
});

module.exports = router;