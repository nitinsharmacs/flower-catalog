const { Router } = require('./router.js');
const { serveFile } = require('./serveFiles.js');
const { homePage } = require('./controllers.js');

const router = new Router();

router.get('/public', serveFile);

router.get('/', homePage);

module.exports = { router };
