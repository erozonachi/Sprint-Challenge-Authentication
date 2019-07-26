const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../database/models/users');
const secret = require('./secret').jwtSecret;

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
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
  usersModel.insert({
    username,
    password: hashedPassword
  })
  .then(createdUser => {
    res.status(201)
    .json(createdUser)
  })
  .catch(error => {
    if(error.errno === 19) {
      return res.status(400)
        .json({ message: 'Supplied username field already exists' });
    }
    res.status(500)
      .json({
        error: 'Cannot complete user creation, try again'
      });
  });
}

async function login(req, res) {
  // implement user login
  try {
    const { username, password } = req.body;

    const user = await usersModel.getByUsername(username);
    if(bcrypt.compareSync(password, user.password)) {
      const payload = {
        sub: user.disposer,
        username: user.username
      }
      const token = jwt.sign(payload, secret, { expiresIn: '1d' });

      return res.status(200)
        .json({
          message: 'Login successful',
          token
        });
    }
    res.status(400)
      .json({
        message: 'Invalid login credentials'
      });
      
  } catch(error) {
    res.status(500)
      .json({
        error: 'Cannot complete user login, try again'
      });
  }
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
