const homePage = (req, res) => {
  if (req.uri !== '/') {
    res.status(404).send('page not found');
  }

  res.redirect('/public/index.html');
};

module.exports = { homePage };
