const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../app');
const {TodoItem} = require('../models/TodoItem');
const {User} = require('../models/User');

const users = [{
  _id: new ObjectID(),
  email: 'user1@test.com',
  token: '123456',
  username: 'user1'
}, {
  _id: new ObjectID(),
  email: 'user2@test.com',
  token: '123456',
  username: 'user2'
}];

beforeEach((done) => {
  User.remove({}).then(() => {
    return User.insertMany(users);
  }).then(() => done());
});


describe('POST /user', () => {
  it('should create a new user', (done) => {
    const email = 'user3@test.com';
    const token = '123456';
    const username = 'user3';

    request(app)
      .post('/user')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.find({}).then((users) => {
          expect(users.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create user when field not valid', (done) => {
    const email = 'user4';
    const token = '123456';
    const username = 'user4';

  });
});

describe('GET /user', () => {
  it('should get all users', (done) => {
    request(app)
      .get('/user')

  });

  it('should ', (done) => {

  });
});

describe('POST /todolists', () => {
  it('should create a new todolist', (done) => {
    const text = "Test todo text";

    request(app)
      .post('/todolists')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect((res.body.text).toBe(text));
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        TodoList.find({}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  })
});