const { Users } = require('../models/users.js');
const { loginPage, registerPage } = require('../views/auth.js');

const users = new Users();

const login = (db) => (req, res) => {
  const { body } = req;
  const { username, password } = body;

  const user = db.users.find({ $eq: { username } });

  if (!user) {
    res.status(404).send('User not found!');
    return;
  }

  if (user.password !== password) {
    res.status(401).send('Invalid user or password!');
    return;
  }

  req.session.logined = true;
  req.session.username = username;
  req.session.saveSession((err) => {
    res.redirect('/guest-book');
  });
};

const serveLoginPage = (req, res) => {
  res.type('html');
  res.send(loginPage);
};

const register = (db) => (req, res) => {
  const { body } = req;

  const { username, name, password } = body;

  db.users.insert({ username, name, password });

  res.redirect('/login');
};

const serveRegisterPage = (req, res) => {
  res.type('html');
  res.send(registerPage);
};

const logout = (req, res) => {
  req.session.destroySession(() => {
    res.redirect('/login');
  });
};

module.exports = {
  login,
  serveLoginPage,
  register,
  serveRegisterPage,
  logout
};
