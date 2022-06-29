const { myServer } = require('myserver');
const { router } = require('./src/routes.js');

const main = () => {
  const app = myServer(router);

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
