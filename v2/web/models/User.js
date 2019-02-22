const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'cannot be blank'],
    match: [/\S+@\S+\.\S+/, 'is valid'],
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
    },
    index: true,
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, 'cannot be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is valid'],
    index: true,
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }],
});

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => token);
};

UserSchema.methods.removeToken = function (token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token },
    },
  }, (doc) => {
    console.log(doc);
  });
};

UserSchema.statics.findByToken = function (token) {
  const user = this;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return user.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth',
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  const User = this;

  return User.findOne({ email }).then((user) => {
    if (!user) {
      console.log(`user with ${email} does not exist`);
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          console.log('password not match');
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
