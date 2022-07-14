const request = require('supertest');
const { connectDb } = require('nql');
const assert = require('assert');

const { createApp } = require('../src/app.js');
const { loginPage, registerPage } = require('../src/views/auth.js');

const testDbPath = './testDb/db.json';
const db = connectDb(testDbPath);

const session = () => {
  return (req, res, next) => {
    req.session = {};
    req.session.saveSession = function (cb) {
      res.set('set-cookie', 'sessionId=121');
      cb();
    }

    req.session.destroySession = function (cb) {
      res.set('set-cookie', 'sessionId=;Max-Age=0');
      cb();
    }
    next();
  };
};

const app = createApp({
  dbPath: testDbPath,
  session
});

describe('GET /register', () => {
  it('should respond with register page', (done) => {
    request(app)
      .get('/register')
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.text, registerPage);
        done();
      });
  });
});

describe('GET /login', () => {
  it('should respond with login page', (done) => {
    request(app)
      .get('/login')
      .expect('content-type', 'text/html; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.text, loginPage);
        done();
      });
  });
});

describe('POST /login', () => {
  it('should respond with user not found', (done) => {
    request(app)
      .post('/login')
      .expect(404)
      .expect('User not found!', done);
  });

  it('should respond cookie header and redirected location', (done) => {
    db.users.insert({ username: 'nitin', password: 'nitin' });

    request(app)
      .post('/login')
      .send({ username: 'nitin', password: 'nitin' })
      .expect('set-cookie', 'sessionId=121')
      .expect('location', '/guest-book')
      .expect(302, done);
  });
});

describe('POST /register', () => {
  it('should register the user', (done) => {
    request(app)
      .post('/register')
      .send({ username: 'hemant', name: 'Hemant', password: 'hemant' })
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('GET /logout', () => {
  it('should delete the session', (done) => {
    request(app)
      .get('/logout')
      .expect('location', '/login')
      .expect('set-cookie', 'sessionId=;Max-Age=0')
      .expect(302, done);
  });
});

