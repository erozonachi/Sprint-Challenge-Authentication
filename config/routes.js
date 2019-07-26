const axios = require('axios');
const bcrypt = require('bcryptjs');
const usersModel = require('../database/models/users');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  try {
    const { username, password } = req.body;
    if(!username || username.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required username field'
        });
    }
    if(!password || password.trim() === '') {
      return res.status(400)
        .json({
          message: 'Missing required password field'
        });
    }
    const hashedPassword = bcrypt.hashSync(password, 12);
    const createdUser = usersModel.insert({
      username,
      password: hashedPassword
    });

    res.status(201)
      json(createdUser);
      
  } catch(error) {
    if(err.errno === 19) {
      return res.status(400)
        .json({ message: 'Supplied username field already exists' });
    }
    res.status(500)
      .json({
        error: 'Cannot complete user creation, try again'
      });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
