import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';


const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('signs up a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'Peaches',
        password: 'password',
        profilePhotoUrl: 'https://place-puppy.com/300x300'
      });

    expect(res.body).toEqual({
      id: '1',
      userName: 'Peaches',
      profilePhotoUrl: 'https://place-puppy.com/300x300'
    });
  });

  test('login a user via POST', async () => {
    await request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'Peaches',
        password: 'password',
        profilePhotoUrl: 'https://place-puppy.com/300x300'
      });
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        userName: 'Peaches',
        password: 'password',
        // profilePhotoUrl: 'https://place-puppy.com/300x300'
      });
    expect(res.body).toEqual({
      id: '1',
      userName: 'Peaches',
      profilePhotoUrl: 'https://place-puppy.com/300x300'
    });
  });

});

