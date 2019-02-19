const router = require('express').Router();
const User = require('../../models_v2/User');

// get info of a user
router.get('/:userid', (req, res, next) => {
  const userid = req.params.userid;
  User.find({_id: userid}).then((user) => {
    res.status(200).send(user);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// create a new user
router.post('/', (req, res, next) => {
  const userid = req.body.userid;
  const user = new User(
    req.body
  );

  user.save().then((user) => {
    res.status(201).send(user);
  }, (err) => {
    res.status(500).send(user);
  }).catch(next);
});

// update the info of a user
router.put('/', (req, res, next) => {
  User.findOneAndUpdate().then((user) => {
    res.status(202).send(user);
  }, (err) => {
    res.status(500).send();
  }).catch(next);
});

module.exports = router;
