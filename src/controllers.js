const homePage = (req, res) => {
  if (req.uri !== '/') {
    res.status(404).send('page not found');
    return;
  }

  res.redirect('/public/index.html');
};

const comments = [];
const storeComment = (req, res) => {
  const { queryParams } = req;
  const name = queryParams.get('name');
  const comment = queryParams.get('comment');

  comments.push({
    name, comment, timestamp: new Date()
  });
};

module.exports = { homePage };
