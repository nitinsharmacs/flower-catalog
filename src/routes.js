const express = require('express');
const bodyParser = require('myserver-bodyparser');

const {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook,
  serveComments
} = require('./controllers.js');

const router = express.Router();

router.use(bodyParser);

router.use(express.static('public'));

router.get('/comments', serveComments);


router.get('/guest-book', guestBook);

router.post('/add-comment', storeComment);

router.get('/', homePage);

router.use(notFoundHanlder);

module.exports = { router };
