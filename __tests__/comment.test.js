import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Comment from '../lib/models/Comment.js';
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

  test('creates a comment via POST', async () => {
    const post = await Gram.insert({
      userId: user.id,
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });

    const res = await agent
      .post('/api/v1/comments')
      .send({
        comment: 'thats a good looking biscuit',
        commentBy: user.userId,
        postId: post.id
      });

    expect(res.body).toEqual({
      id: '1',
      userId: '1',
      comment: 'thats a good looking biscuit',
      commentBy: '1',
      postId: '1'
    });





  });
