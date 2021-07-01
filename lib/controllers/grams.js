import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth';
import Gram from '../models/Gram.js';

export default Router()

  .post('/api/v1/grams', ensureAuth, (req, res, next) => {
    Gram.insert({ ...req.body, userId: req.user.id })
      .then(gram => res.send(gram))
      .catch(next);
  })

  .get('/api/v1/grams/:id', async (req, res) => {
    try {
      const gram = await Gram.findById(req.params.id);
      res.send(gram);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })


  .get('/api/v1/grams', async (req, res) => {
    try {
      const grams = await Gram.findAll();
      res.send(grams);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/grams/:id', async (req, res) => {
    try {
      const gram = await Gram.delete(req.params.id);
      res.send(gram);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/grams/:id', ensureAuth, (req, res) => {

    try {
      const gram = Gram.update(req.params.id, { ...req.body, userId: req.user.id });
      res.send(gram);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }



  });

