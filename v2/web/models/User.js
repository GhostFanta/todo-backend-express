const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'cannot be blank'],
    match: [/\S+@\S+\.\S+/, 'is valid'],
    index: true
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'cannot be blank'],
    match: [/^[a-zA-Z0-9]+$/, 'is valid'],
    index: true
  },
  token: {type: String}
});

module.exports = mongoose.model('User', UserSchema);