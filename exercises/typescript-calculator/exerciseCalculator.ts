
const ratingDescriptions = [
  'bad',
  'not too bad but could be better',
  'good'
] as const;
type RatingDescription = typeof ratingDescriptions[number];

interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  average: number;
  rating: 1 | 2 | 3;
  ratingDescription: RatingDescription;
  target: number;
}

const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseValues => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const average = dailyHours.reduce((sum, val) => sum + val, 0) / dailyHours.length;
  const success = average >= target;
  const rate = (ave: number, tar: number) => {
    if (ave < tar / 2) {
      return 1;
    } else if (ave < tar) {
      return 2;
    } else {
      return 3;
    }
  };
  const rating = rate(average, target);
  const ratingDescription = ratingDescriptions[rating-1];
  return {
    periodLength,
    trainingDays,
    average,
    success,
    ratingDescription,
    rating,
    target
  };
};


export default calculateExercises;