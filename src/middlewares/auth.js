const auth = (req, res, next) => {
  if (req.session.logined) {
    return next();
  }

  res.redirect('/login');
};

module.exports = { auth };
