const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
  User.find({}).then((docs) => {
    res.status(200).send(docs);
  }, (err) => {
    res.status(404).send(docs);
  })
});

router.get('/:id', (req, res) => {
  User.find({_id: req.params.id}).then((doc) => {
    console.log(req.params);
    res.status(200).send(doc);
  }, (err) => {
    res.status(404).send(err);
  });

});

router.post('/', (req, res) => {
  const user = new User(req.body);
  user.save().then(function (doc) {
    res.status(201).json(doc);
  }, function (err) {
    res.status(500).send(err);
  });
});

router.delete('/:id', (req, res) => {
  User.deleteOne({_id: req.param.userid}).then((doc) => {
    res.status(204).json(doc);
  }, (err) => {
    res.status(404).send(err);
  })
});

router.put('/', (req, res, next) => {
  User.findOneAndUpdate({email: req.body.email}, req.body, {
    upsert: true,
    new: true
  }).then((user) => {
    if (!user) {
      res.sendStatus(401);
    }

    if (typeof req.body.username !== 'undefined') {
      user.username = req.body.username;
    }

    return user.save().then((doc) => {
      res.status(200).json(doc);
    });

  }).catch(next)
});

module.exports = router;