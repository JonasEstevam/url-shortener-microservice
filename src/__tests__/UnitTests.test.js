const app = require('../app');
const request = require('supertest');
const ClearTestDatabase = require('./utils/ClearTestDatabase');
const ShortUrl = require('../models/ShortUrl');
const mongoose = require('mongoose');

afterAll(async () => mongoose.connection.close());
beforeAll(async () => ClearTestDatabase());

describe('Testing the POST method on /api/shorturl', () => {
  it('should post a new url to be shortened and receive a HTTP status code 200 and a valid object', async () => {
    const response = await request(app)
      .post('/api/shorturl')
      .send({ url: 'https://google.com' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('original_url');
    expect(response.body).toHaveProperty('short_url');
  });

  it('should post an already shorted url and receive a HTTP status code 400 and a valid object', async () => {
    const response = await request(app)
      .post('/api/shorturl')
      .send({ url: 'https://google.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'URL already shortened');
    expect(response.body).toHaveProperty('shortenedUrl');
  });

  it('should post an invalid URL and receive a HTTP status code 400 and a valid object', async () => {
    const response = await request(app)
      .post('/api/shorturl')
      .send({ url: 'google.com' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'invalid url');
  });
});

describe('Testing the GET method on /api/shorturl', () => {});
