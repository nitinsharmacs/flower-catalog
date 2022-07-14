const request = require('supertest');
const { createApp } = require('../src/app.js');
const { connectDb } = require('nql');
const assert = require('assert');

const testDbPath = './testDb/db.json';
const db = connectDb(testDbPath);
const comments = db.comments.findMany({});

const session = () => {
  return (req, res, next) => {
    req.session = {};
    req.session.logined = true;
    req.session.saveSession = function (cb) {
      res.set('set-cookie', 'sessionId=121');
      cb();
    }
    next();
  };
};


const app = createApp({
  dbPath: testDbPath,
  session
});

describe('GET /comments', () => {
  it('should respond with comments json', (done) => {
    request(app)
      .get('/comments')
      .expect('content-type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        assert.deepStrictEqual(res.body, comments);
        done();
      });
  });
});

describe('GET /guest-book', () => {
  it('should respond with guest book html page', (done) => {
    request(app)
      .get('/guest-book')
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(200, done);
  });
});

describe('GET /add-comment', () => {
  it('should redirect to /guest-book endpoint', (done) => {
    request(app)
      .post('/add-comment')
      .send({ name: 'nitin', comment: 'testing' })
      .expect('location', '/guest-book')
      .expect(302, done);
  });
});
