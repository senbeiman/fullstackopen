import express from 'express';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());
interface ExercisesValues {
  daily_exercises: Array<number>;
  target: number;
}
app.post('/exercises', (req, res) => {
  const body = req.body as ExercisesValues;
  const dailyExercises = body.daily_exercises;
  const target = body.target;
  if (!dailyExercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  if (typeof target !== 'number' || dailyExercises.find(d => typeof d !== 'number')) {
    return res.status(400).json({ error: 'malformed parameters'});
  }
  const result = calculateExercises(dailyExercises, target);
  return res.status(200).json(result);

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});