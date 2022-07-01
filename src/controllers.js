const fs = require('fs');
const { createDiv, createParagraph } = require('./html.js');
const { connectDb } = require('nql');

const db = connectDb('./db/flower_catalog.json');

const notFoundHanlder = (req, res) => {
  res.status(404).send('page not found');
};

const homePage = (req, res) => {
  res.redirect('/public/index.html');
};

const isValidComment = (name, comment) => {
  return name !== '' && comment !== '';
};

const storeComment = (req, res) => {
  const { body: { name, comment } } = req;

  if (isValidComment(name, comment)) {
    db.comments.insert({ name, comment, timestamp: new Date() });
  }

  res.redirect('/guest-book');
};

const getTime = (date) => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };
};

const getDate = (date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  };
};

const formateDate = (date) => {
  const { hours, minutes, seconds } = getTime(date);
  const { year, month, day } = getDate(date);

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  const formattedDate = `${day}-${month}-${year}`;

  return `${formattedDate} | ${formattedTime}`;
};

const createCommentHtml = ({ name, timestamp, comment }) => {
  const author = createParagraph({
    content: name,
    classes: ['author']
  });

  const commentText = createParagraph({
    content: comment,
    classes: ['comment-text']
  });

  const time = createParagraph({
    content: formateDate(new Date(timestamp)),
    classes: ['timestamp']
  });

  return createDiv({
    content: `${author}${commentText}${time}`,
    classes: ['comment']
  });
};

const guestHtml = (comments, template) => {
  const commentsHtml = comments.map(comment => {
    return createCommentHtml(comment);
  }).join('');

  return template.replace('__COMMENTS__', commentsHtml);
};

const guestBook = (req, res) => {
  fs.readFile('./template/guest_book.html', 'utf8', (err, fileContent) => {
    if (err) {
      res.status(500).send('Some error occurred, please try again!');
      return;
    }

    const comments = db.comments.findMany({}).slice(0).reverse();

    res.sendHtml(guestHtml(comments, fileContent));
  });
};

const serveComments = (req, res) => {
  const comments = db.comments.findMany({});
  res.json(comments);
};

module.exports = {
  homePage,
  notFoundHanlder,
  storeComment,
  guestBook,
  serveComments
};
