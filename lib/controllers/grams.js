import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Gram from '../models/Gram.js';

export default Router()

  .post('/api/v1/grams', ensureAuth, (req, res, next) => {
    Gram.insert({ ...req.body, userName: req.user.userName })
      .then(gram => res.send(gram))
      .catch(next);
  });
