const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');
const app = require('../app');

const TodoList = require('../models/TodoList');
const User = require('../models/User');

process.env.NODE_ENV = 'test';
require('../config/config');

const {
  todolists, users, populateTodolists, populateUsers,
} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodolists);

describe('POST /user', () => {
  it('should create a new user', (done) => {
    const email = 'user3@test.com';
    const password = '123456';
    const username = 'user3';

    request(app)
      .post('/user')
      .send({ email, username, password })
      .expect(201)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        return User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch(e => done(e));
      });
  });

  it('should not create user when some fields are missing', (done) => {
    const email = 'user4@test.com';
    const password = '123456';

    request(app)
      .post('/user')
      .send({ email, password })
      .expect(500)
      .end(done);
  });


  it('should not create user when some fields are invalid', (done) => {
    const email = 'user4';
    const password = '123456';

    request(app)
      .post('/user')
      .send({ email, password })
      .expect(500)
      .end(done);
  });
});

describe('GET /user', () => {
  it('should retrieve user info according to jwt', (done) => {

  });
});

describe('POST /todolist', () => {
  it('should create a new todolist', (done) => {
    const user = users[2];
    const userid = user._id.toString();
    const list1 = {
      title: 'list1',
      userid,
      todos: [
        {
          content: 'todo1',
          completed: false,
        },
        {
          content: 'todo2',
          completed: false,
        },
      ],
    };

    request(app)
      .post('/todolist')
      .set('x-auth', user.tokens[0].token)
      .send(list1)
      .expect(201)
      .expect((res) => {
        expect(res.body.title).toBe(list1.title);
        expect(res.body.userid).toBe(list1.userid);
        expect(res.body.todos[0].content).toBe(list1.todos[0].content);
        expect(res.body.todos[0].completed).toBe(list1.todos[0].completed);
        expect(res.body.todos[1].content).toBe(list1.todos[1].content);
        expect(res.body.todos[1].completed).toBe(list1.todos[1].completed);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        TodoList.find({ userid }).then((docs) => {
          expect(docs.length).toBe(1);
          expect(docs[0].todos.length).toBe(2);
          done();
        }).catch(e => done(e));
      });
  });
});

describe('GET /todolist', () => {
  it('should get todolist of a user according to jwt', (done) => {

  });
});

describe('DELETE /todolist', () => {
  it('should delete todolist of a user by todolistid', (done) => {

  });
});

describe('PUT /todolist', () => {
  it('should update a todo list of user by todolistid', (done) => {

  });

  it('should return 404 when the todolist is not existing', (done) => {

  });
});

describe('POST /login', () => {
  it('should return token and 200 when username and password matches', (done) => {

  });

  it('should return 404 if user is not existing', (done) => {

  });
});

describe('POST /logout', () => {

});

describe('', () => {

});
