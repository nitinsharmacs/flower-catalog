const express = require('express');
const { connectDb } = require('nql');

const {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook,
  serveComments
} = require('./controllers/guestBook.js');

const { auth } = require('./middlewares/auth.js');

const { authRouter } = require('./routes/auth.js');


const createApp = ({ dbPath, session }) => {
  const db = connectDb(dbPath);

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session());

  app.use(express.static('public'));

  app.use(authRouter(db));

  app.get('/comments', serveComments(db));

  app.get('/guest-book', auth, guestBook(db));

  app.post('/add-comment', auth, storeComment(db));

  app.get('/', homePage);

  app.use(notFoundHanlder);

  return app;
};

module.exports = { createApp };
