// tehtävä 9.2

interface Result { // tulos-olion interface
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

/* 
  laskee päivittäisten treenituntien keskiarvon ja vertaa sitä annettuun 
  treenituntien minimimäärään, palauttaa olion jossa on
  - ajanjakson päivien lkm 
  - treenipäivien lkm
  - päivittäisten treenituntien tavoitemäärä
  - laskettu keskimääräinen treeniaika
  - boolean saavutettiinko tavoite
  - arvosana 1-3 kuinka hyvin tavoite toteutui (päätä itse miten lasket!)
  - tekstimuotoinen arvio

  päivittäiset treenitunnit annetaan taulukkona, alkioina kuinka monta treenituntia
  maanantaista sunnuntaihin tuli tehtyä. 0 = ei treeniä

  viimenen parametri on tavoitetunnit, kaikki sitä ennen kuuluu parametri-taulukkoon!

  AJAMINEN: npm run calculateExercises <tavoitetunnit> [treenitunnit (väh.1kpl annettava)]
*/
const calculateFunc = (trHours: number[], target: number) : Result => {
  // yhteenlaskettu treenituntien lkm
  const allHours = trHours.reduce((acc,hr) => {
    return acc + hr;
  })

  // treenipäivien lkm
  let trDays = 0;
  trHours.forEach(hr => {
    if (hr > 0) {
      trDays++;
    }
  })

  // keskimääräinen treeniaika päivässä
  const aveHours = allHours / trHours.length;

  // numeroarvio
  let rating;
  let ratingDescription;
  if (aveHours < 0.666 * target) { // kirkkaasti riman ali
    rating = 1;
    ratingDescription = 'Not good enough! You need to exercise more!';
  }
  else if (aveHours < target) { // ihan ei tavoite toteutunut
    rating = 2;
    ratingDescription = 'Not too bad but could be better!'
  }
  else { // tavoite toteutui
    rating = 3;
    ratingDescription = 'Keep up the good work!'
  }

  return {
    periodLength: trHours.length,
    trainingDays: trDays,
    target: target,
    average: aveHours,
    success: aveHours > target ? true : false,
    rating,
    ratingDescription
  }
}

interface Arguments {
  target: number,
  hours: number[]
}
// tehtävä 9.3 parsitaan parametrit
const parseArgs = (args: Array<string>): Arguments => {
  // virhe, jos on annettu pelkkä tavoitemäärä eikä tunteja
  if (args.length < 4) throw new Error('Not enough arguments!');
  
  // virhe, jos tavoitemäärä on NaN
  if (isNaN(Number(args[2]))) throw new Error('Provided target value was not number!');

  // parsitaan treenitunnit talteen argumenteista
  let hoursArr: number[] = []
  for (let i = 3; i < args.length; i++) {
    // jos jokin arvo ei olekaan numero, heitetään virhe asiasta
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided hour values were not numbers!');
    }
    hoursArr.push(Number(args[i]))
  }
  
  // kaikki onnistui! palautetaan annetut arvot oliona jatkokäsittelyä varten!
  return {
    target: Number(args[2]),
    hours: hoursArr
  }
}

// argumentillinen versio (EKA argumentti on tavoite, loput on treenipäiviä)
const calculateExercises = (target: number, trHours: number[]) : Result => {
  return calculateFunc(trHours, target);
}

const { target, hours } = parseArgs(process.argv) // tehtävä 9.3
console.log(calculateExercises(target, hours));

