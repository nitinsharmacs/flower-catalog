const { Router } = require('./router.js');
const { serveFile } = require('./serveFiles.js');
const {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook
} = require('./controllers.js');

const router = new Router();

router.get('/public', serveFile);

router.get('/guest-book', guestBook);

router.get('/comment', storeComment);

router.get('/', notFoundHanlder, homePage);

module.exports = { router };
