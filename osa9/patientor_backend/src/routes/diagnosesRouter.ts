import express from 'express';
import diagnoService from '../services/diagnoService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnoose!');
});

export default router;