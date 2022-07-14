const postsPage = (username) => `<html lang="en">
<head>
  <title>Posts</title>
</head>
<body>
  <main>
    <h1>Welcome, ${username}</h1>
    <h1>Here are your posts...</h1>
    <a href='/logout'>Logout</a>
  </main>
</body>
</html>`;

module.exports = { postsPage };
