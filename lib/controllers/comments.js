import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Comment from '../models/Comment.js';

export default Router()

  .post('/api/v1/comments', ensureAuth, (req, res, next) => {
    Comment.insert({ ...req.body, userId: req.user.id })
      .then(comment => res.send(comment))
      .catch(next);
  })

  .delete('/api/v1/comments/:id', ensureAuth, async (req, res) => {
    try {
      const comment = await Comment.delete(req.params.id);
      res.send(comment);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  ;

