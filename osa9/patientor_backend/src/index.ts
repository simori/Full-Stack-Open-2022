import cors from 'cors';
import express from 'express';
import diagnosesRouter from './routes/diagnosesRouter';
import patientsRouter from './routes/patientsRouter';

const app = express();
app.use(express.json());


app.use(cors());

const PORT = 3001;

app.get('/', (_req, res) => {
  console.log('Patientor backend!');
  res.send('<h1>Patientor App Bäkkäri!</h1>');
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged herre!');
  res.send('pong!');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});