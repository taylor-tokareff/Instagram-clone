import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Gram from '../lib/models/Gram.js';
import Comment from '../lib/models/Comment.js';



describe('demo routes', () => {
  let agent;
  let user;

  beforeEach(async () => {
    await setup(pool);
    agent = await request.agent(app);
    user = await UserService.create({
      userName: 'Peaches',
      password: 'password',
      profilePhotoUrl: 'https://place-puppy.com/300x300'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        userName: 'Peaches',
        password: 'password'
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
        commentBy: user.id,
        postId: post.id
      });

    expect(res.body).toEqual({
      id: '1',
      comment: 'thats a good looking biscuit',
      commentBy: '1',
      postId: '1'
    });
  });

  test('deletes comment1', async () => {
    const post = await Gram.insert({
      userId: user.id,
      photoUrl: 'https://place-puppy.com/300x300',
      caption: 'not actually Peaches',
      tags: '#imposter'
    });

    const comment1 = await Comment.insert({
      comment: 'thats a good looking biscuit',
      commentBy: user.id,
      postId: post.id
    });

    const res = await agent.delete(`/api/v1/comments/${comment1.id}`);

    expect(res.body).toEqual(comment1);

  });


});

