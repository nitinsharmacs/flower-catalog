const { Router, serveFile, bodyParser } = require('myserver');
const {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook,
  serveComments
} = require('./controllers.js');

const router = new Router();

router.use(bodyParser);

router.get('/comments', serveComments);

router.get('/public', serveFile);

router.get('/guest-book', guestBook);

router.post('/add-comment', storeComment);

router.get('/', homePage);

router.use(notFoundHanlder);

module.exports = { router };
