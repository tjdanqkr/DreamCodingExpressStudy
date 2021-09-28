import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).send('GET: /users');
});

router.post('/', (req, res) => {
  res.status(201).send('POST: /users');
});

router.delete('/:id', (req, res) => {
  res.status(201).send('DELETE: /users');
});

router.put('/:id', (req, res) => {
  res.status(201).send('PUT: /users');
});

export default router;
