const db = require('../dbConfig');

module.exports = {
  insert: function(user) {
    return db('users')
      .insert(user)
      .then(([ id ]) => this.getById(id));
  },
}