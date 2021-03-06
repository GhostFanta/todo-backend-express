const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('./../../middleware/auth');
const User = require('../../models/User');

// GET /user: get info of a user
router.get('/', authenticate, (req, res) => {
  const { _id } = req.user;
  User.findById({ _id }).then((user) => {
    res.status(200).send(user);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// POST /user :create a new user
router.post('/', (req, res, next) => {
  const body = _.pick(req.body, ['email', 'username', 'password']);
  const newuser = new User(
    body,
  );

  newuser.save().then(() => newuser.generateAuthToken()).then((token) => {
    res.status(201).header('x-auth', token).send(newuser);
  }, (err) => {
    res.status(500).send(err);
  }).catch(next);
});

// PUT /user: update the info of a user
router.put('/', authenticate, (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id }).then((user) => {
    const { email, username, bio } = req.body;
    if (email) {
      user.email = email;
    }
    if (username) {
      user.username = username;
    }
    if (bio) {
      user.bio = bio;
    }
    user.save().then((doc) => {
      res.status(202).send(doc);
    }, (err) => {
      res.status(500).send(err);
    });
  }).catch(next);
});

// POST /user/login: user login
router.post('/login', (req, res, next) => {
  const { email, password } = _.pick(req.body, ['email', 'password']);
  User.findByCredentials(email, password).then(user => user.generateAuthToken().then((token) => {
    res.header('x-auth', token).status(200).send({ ...user, token });
  }), (err) => {
    res.status(404).send(err);
  }).catch(next);
});

// DELETE /user/logout: user logout
router.delete('/logout', authenticate, (req, res, next) => {
  const { token } = req;
  User.findByToken(token).then((user) => {
    user.removeToken(token);
    res.status(204).send(token);
  }, (err) => {
    res.status(404).send(err);
  }).catch(next);
});


module.exports = router;
