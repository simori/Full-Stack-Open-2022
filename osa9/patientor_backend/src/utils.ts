import { Gender, NewPatient } from "./types";

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown };

// type-guard
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// nimen validointi
const parseName = (name: unknown): string => {
  // varmistetaan että nimi on olemassa ja että se on tyyppiä string.
  // Jos ei, heitä virhe
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing comment!');
  }
  // jos tänne asti on päästy, kääntäjä tietää että comment on varmasti tyyppiä string!
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
      throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

// sotun validointi
const parseSSN = (ssn: unknown): string => {
  // varmistetaan että sotu on olemassa ja että se on tyyppiä string.
  // (riittää tarkistaa että se on string)
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number!');
  }
  // jos tänne asti on päästy, kääntäjä tietää että ssn on varmasti tyyppiä string!
  return ssn;
};

// ammatin validointi
const parseOccupation = (occupation: unknown): string => {
  // varmistetaan että nimi on olemassa ja että se on tyyppiä string.
  // Jos ei, heitä virhe
  if (!occupation || !isString(occupation)) {
    throw new Error('Malformed or missing occupation!');
  }
  // jos tänne asti on päästy, kääntäjä tietää että comment on varmasti tyyppiä string!
  return occupation;
};

// sukupuolen validointi
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender!: ' + gender);
  }
  return gender;
};

const parseNewPatient = ({ name, ssn, dateOfBirth, occupation, gender } : Fields): NewPatient => {
  const newEntry: NewPatient = {
    // ...
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDate(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender)
  };

  return newEntry;
};

export default parseNewPatient;