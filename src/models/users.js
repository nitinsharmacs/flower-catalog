const { generateId } = require('../util/idGenerator.js');

class Users {
  #users;
  constructor() {
    this.#users = [];
  }

  addUser(user) {
    const userId = generateId();
    this.#users.push({ id: userId, ...user });
  }

  find(username) {
    return this.#users.find(user => user.username === username);
  }
}

module.exports = { Users };
