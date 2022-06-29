const { Router, serveFile } = require('myserver');
const {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook,
  serveComments
} = require('./controllers.js');

const router = new Router();

router.get('/comments', serveComments);

router.get('/public', serveFile);

router.get('/guest-book', guestBook);

router.get('/comment', storeComment);

router.get('/', homePage);

router.use(notFoundHanlder);

module.exports = { router };
