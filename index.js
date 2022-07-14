const express = require('express');
const { router } = require('./src/routes.js');

const main = () => {
  const app = express();

  app.use(router);

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
