const db = require('../database/dbConfig');
const server = require('./server');
const request = require('supertest');

beforeAll(async () => {
  await db('users').truncate();
});

describe('server', () => {
  it('[POST] /api/register WORKS!', () => {
    return request(server)
      .post('/api/register')
      .send({ username: 'james', password: '12345ABC' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({ id: 1, username: 'james' });
      });
  });

});
