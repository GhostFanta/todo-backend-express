const expect = require('expect');
const request = require('supertest');

const {app} = require('./../app');
const {TodoItem} = require('./../models/TodoItem');

describe('POST /todolists', () => {
  it('should create a new todolist', (done) => {
    var text = "Test todo text";

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

        TodoList.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  })
});