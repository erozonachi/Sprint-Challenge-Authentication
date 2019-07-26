const db = require('../dbConfig');

module.exports = {
  insert: function(user) {
    return db('users')
      .insert(user)
      .then(([ id ]) => this.getById(id));
  },

  getById: function(id) {
    return db('users')
      .select('id', 'username')
      .where({ id })
      .first();
  },

  getByUsername: function(username) {
    return db('users')
      .where({ username })
      .first();
  },
}