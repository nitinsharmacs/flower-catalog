const htmlClasses = classes => {
  return 'class="' + classes.join(' ') + '"';
};

const attribute = ({ attr, value }) => {
  return attr + '="' + value + '"';
};

const attributes = (attrs) => {
  return attrs.map(attr => {
    return attribute(attr);
  }).join(' ');
};

const openingTag = (tag, classes, attrs) => {
  return '<' + tag + ' ' + htmlClasses(classes) + ' ' + attributes(attrs) + '>';
};

const closingTag = (tag) => {
  return '</' + tag + '>';
};

const createHtml = ({ tag, content, classes = [], attrs = [] }) => {
  return openingTag(tag, classes, attrs) + content + closingTag(tag);
};

const createDiv = ({ content, classes }) => {
  return createHtml({ tag: 'div', content, classes });
};

const createImage = ({ src, alt, classes }) => {
  return '<img ' + attributes([
    { attr: 'src', value: src },
    { attr: 'alt', value: alt }
  ]) + ' ' + htmlClasses(classes) + ' />';
};

const createAnchor = ({ content, href, classes }) => {
  return createHtml({
    tag: 'a',
    content,
    classes,
    attrs: [
      { attr: 'href', value: href }
    ]
  });
};

const createInput = ({ name, type, placeholder, classes }) => {
  return '<input ' + attributes([
    { attr: 'name', value: name },
    { attr: 'placeholder', value: placeholder },
    { attr: 'type', value: type },
  ]) + ' ' + htmlClasses(classes) + ' />';
};

const createLabel = ({ name, text, classes }) => {
  return createHtml({
    tag: 'label',
    content: text,
    classes,
    attrs: [{ attr: 'for', value: name }]
  });
};

const createParagraph = ({ content, classes }) => {
  return createHtml({
    tag: 'p',
    content,
    classes
  });
};

const cssLink = link => {
  return '<link ' + attributes([
    { attr: 'href', value: link },
    { attr: 'rel', value: 'stylesheet' }
  ]) + ' />';
};

const createHtmlHead = ({ title, cssLinks }) => {
  const titleHtml = createHtml({ tag: 'title', content: title });
  const cssLinksHtml = cssLinks.map(link => cssLink(link));
  return createHtml({
    tag: 'head',
    content: titleHtml + cssLinksHtml
  });
};

const createHtmlBody = body => {
  return createHtml({
    tag: 'body',
    content: body
  });
};

const createHtmlTemplate = ({ head, body }) => {
  return createHtml({
    tag: 'html',
    content: createHtmlHead(head) + createHtmlBody(body)
  });
};

exports.createHtml = createHtml;
exports.createDiv = createDiv;
exports.createImage = createImage;
exports.createAnchor = createAnchor;
exports.createLabel = createLabel;
exports.createParagraph = createParagraph;
exports.createHtmlTemplate = createHtmlTemplate;
exports.createInput = createInput;
