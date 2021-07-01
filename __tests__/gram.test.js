import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Gram from '../lib/models/Gram.js';



describe('demo routes', () => {
  let agent;
  let user;

  beforeEach(() => {
    return setup(pool);
  });
  beforeEach(async () => {
    agent = request.agent(app);

    await agent
      .post('/api/v1/auth/signup')
      .send({
        userName: 'Peaches',
        password: 'password',
        profilePhotoUrl: 'https://place-puppy.com/300x300'
      });
    user = await agent
      .post('/api/v1/auth/login')
      .send({
        userName: 'Peaches',
        password: 'password',
        // profilePhotoUrl: 'https://place-puppy.com/300x300'
      });
  });

  test('creates a gram via POST', async () => {
    const res = await agent
      .post('/api/v1/grams')
      .send({
        photoUrl: 'https://place-puppy.com/300x300',
        caption: 'not actually Peaches',
        tags: '#imposter'
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });
  });

  test('find a gram by id via Get route', async () => {
    const gram = await Gram.insert({
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });
    const res = await request(app).get(`/api/v1/grams/${gram.id}`);

    expect(res.body).toEqual(gram);

  });

  test('finds all grams via GET route', async () => {

    const gram1 = await Gram.insert({
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });
    const gram2 = await Gram.insert({
      photoUrl: 'https://place-puppy.com/200x300',
      caption: 'is puppy',
      tags: '#puppy'
    });
    const gram3 = await Gram.insert({
      photoUrl: 'https://place-puppy.com/400x400',
      caption: 'good dog',
      tags: '#goodest'
    });

    const res = await request(app).get('/api/v1/grams');
    expect(res.body).toEqual([gram1, gram2, gram3]);
  });


  test('deletes gram1', async () => {
    const gram1 = await Gram.insert({
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });

    const res = await agent.delete(`/api/v1/grams/${gram1.id}`);

    expect(res.body).toEqual(gram1);

  });

  test('it updates a gram', async () => {

    const gram1 = await Gram.insert({
      userId: '1',
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });
    const gram2 = {
      photoUrl: 'https://place-puppy.com/200x300',
      caption: 'is puppy',
      tags: '#puppy'
    };

    const res = await agent.put(`/api/v1/grams/${gram1.id}`).send(gram2);
    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      photoUrl: 'https://place-puppy.com/200x300',
      caption: 'is puppy',
      tags: '#puppy'
    });




  });
});
