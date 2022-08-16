import express from 'express';
//import { calculateExercises } from './exerciseCalculator';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('<h1>Full Stack 2022 osa 9!</h1><a href="hello">klikkaas tästä (tehtävä 9.4</a>');
});

// tehtävä 9.4
app.get('/hello', (_req, res) => {
  res.send('<h1>Hello Full Stack!</h1>');
});

// tehtävä 9.5
app.get('/bmi', (req, res) => {
  // otetaan parametrit talteen
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters!' });
  }
  const bmi = calculateBmi(height, weight);  
  return res.status(200).json({ 
    weight,
    height,
    bmi
  });
});

// tehtävä 9.7
app.post('/exercises', (req, res) => {
  // otetaan parametrit talteen
  // daily_exercises on taulukko lukuja, target on yksi luku
  // ignoorataan no-unsafe-member-access/assignment säännöt

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  console.log(daily_exercises, target);
  

  // validoinnit
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing!' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  daily_exercises.forEach((h: number) => {
    if (isNaN(Number(h))) {
      return res.status(400).json({ error: 'malformatted parameters!' });
    }
    return;
  });
  

  if (isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters!' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  const exe = calculateExercises(target, daily_exercises);
  console.log(exe);
  return res.status(200).json(exe);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});