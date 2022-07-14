const authRouter = (db) => {
  const router = require('express').Router();

  const {
    serveLoginPage,
    login,
    register,
    serveRegisterPage,
    logout
  } = require('../controllers/auth.js');

  router.get('/login', serveLoginPage);
  router.post('/login', login(db));

  router.get('/register', serveRegisterPage);
  router.post('/register', register(db));

  router.get('/logout', logout);

  return router;
};

module.exports = { authRouter };
