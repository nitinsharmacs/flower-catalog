const loginPage = `<html lang="en">
<head>
  <title>Login</title>
</head>
<body>
  <form action="/login" method="post" id="login-form">
    <section>
      <label for="username">Username : </label>
      <input type="text" name="username" placeholder="Enter username">
    </section>
    <section>
      <label for="password">Password : </label>
      <input type="password" name="password" placeholder="Enter password">
    </section>
    <input type="submit" value="Login">
  </form>
  <p>If you have no account,<a href='/register'>Register</a></p>
</body>
</html>`;

const registerPage = `<html lang="en">
<head>
  <title>Register</title>
</head>
<body>
  <form action="/register" method="post">
    <section>
      <label for="username">Username : </label>
      <input type="text" name="username" placeholder="Enter username">
    </section>
    <section>
      <label for="name">Name : </label>
      <input type="text" name="name" placeholder="Enter name">
    </section>
    <section>
      <label for="password">Password : </label>
      <input type="password" name="password" placeholder="Enter password">
    </section>
    <input type="submit" value="Register">
  </form>
  <p>Already have account,<a href='/login'>Login</a></p>
</body>
</html>`;

module.exports = { loginPage, registerPage };
