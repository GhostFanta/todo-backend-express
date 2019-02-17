const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/todolist/:id', function (req, res) {
  console.log(req.param);
  return res.status(200).send(req.param);
});

module.exports = router;