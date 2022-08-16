import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/', (_req, res) => {
  console.log('Patientor backend!');
  res.send('<h1>Patientor App Bäkkäri!</h1>');
});

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here!');
  res.send('pong!');
});

app.get('/api/patients', (_req, res) => {
  console.log('patientteja kyselty!');
  res.send('<h1>Patientsit tänne</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});