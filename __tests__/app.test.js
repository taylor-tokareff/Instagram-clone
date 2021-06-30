import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeAll(() => {
    return setup(pool);
  });

  test('signs up a user via POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'https://place-puppy.com/300x300'
      });

    expect(res.body).toEqual({
      id: '1',
      userName: 'test@test.com',
      profilePhotoUrl: 'https://place-puppy.com/300x300'
    });
  });

  it('login a user via POST', async () => {
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        userName: 'test@test.com',
        password: 'password',
        profilePhotoUrl: 'https://place-puppy.com/300x300'
      });

    expect(res.body).toEqual({
      id: '1',
      userName: 'test@test.com',
      profilePhotoUrl: 'https://place-puppy.com/300x300'
    });
  });

  // test('creates a gram via POST', async () => {
  //   const res = await agent
  //     .post('/api/v1/grams')
  //     .send({
  //       photoUrl: 'https://place-puppy.com/300x300',
  //       caption: 'not actually Peaches',
  //       tags: '#imposter'
  //     });

  //   expect(res.body).toEqual({
  //     id: '1',
  //     userName: 'Peaches',
  //     photoUrl: 'https://place-puppy.com/300x300',
  //     caption: 'not actually Peaches',
  //     tags: '#imposter'
  //   });
  // });
});

