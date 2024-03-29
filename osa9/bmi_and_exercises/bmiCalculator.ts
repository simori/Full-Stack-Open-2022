// tehtävä 9.1 painoindeksi
export const calculateBmi = (height: number, weight: number) : string => {
  const height_m = height / 100; // pituus metreiksi
  const bmi = weight / (height_m * height_m);

  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  }
  else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  }
  else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  }
  else if (bmi < 25) {
    return "Normal (healthy weight)";
  }
  else if (bmi < 30) {
    return "Overweight";
  }
  else if (bmi < 35) {
    return "Obese (Class 1)";
  }
  else if (bmi < 40) {
    return "Obese (class 2)";
  }
  else if (bmi >= 40) {
    return "Severely obese";
  }
  else {
    return "Erroneous arguments! Usage: npm run calculateBmi [height in cm] [weight in kg]";
  }
};

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

console.log(calculateBmi(height, weight)); // tulostaa: "Normal (healthy weight)"