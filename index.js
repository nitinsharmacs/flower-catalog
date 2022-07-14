const { createApp } = require('./src/app.js');
const session = require('myserver-session');

const main = () => {
  const app = createApp({
    dbPath: './db/flower_catalog.json',
    session
  });

  const PORT = 3002;
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

main();
