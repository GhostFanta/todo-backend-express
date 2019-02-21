require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const { ObjectId } = require('mongodb');

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI);


const app = express();
app.use(bodyParser.json());
app.use(require('./routes'));

const userid = new ObjectId();
const user = new User({
  _id: userid,
  email: 'admin@admin.com',
  username: 'admin',
  password: '123456',
  tokens: [
    {
      access: 'auth',
      token: jwt.sign({ _id: userid, access: 'auth' }, process.env.JWT_SECRET).toString(),
    },
  ],
});

user.save();

const { PORT } = process.env;

const server = app.listen(PORT, () => {
  console.log(`Listen on port: ${server.address().port}`);
});

module.exports = app;
