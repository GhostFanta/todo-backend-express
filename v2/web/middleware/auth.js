const User = require('./../models/User');

const authenticate = function (req, res, next) {
  const token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      console.log('user not exist');
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(e);
  });
};

module.exports = authenticate;
