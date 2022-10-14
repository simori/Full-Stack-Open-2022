import { Entry, Gender, NewPatient, HealthCheckRating, BaseEntry } from "./types";
import { v1 as uuid } from 'uuid';

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, 
                occupation: unknown, gender: Gender };

type HospitalEntryFields = { discharge: { dischDate: string, criteria: string} };
type OccupationalHCFields = { employerName: string, sickLeave: {startDate?: string, endDate?: string} };
type HealthCheckEntryFields = { healthCheckRating: HealthCheckRating };
type BaseFields = { description: string, date: string, specialist: string, type: string};

// type-guard
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// nimen validointi
const parseString = (string: unknown): string => {
  // varmistetaan että nimi on olemassa ja että se on tyyppiä string.
  // Jos ei, heitä virhe
  console.log('parseString:', string);
  
  if (!string || !isString(string)) {
    throw new Error('Incorrect or missing string!');
  }
  // jos tänne asti on päästy, kääntäjä tietää että comment on varmasti tyyppiä string!
  return string;
};

// nimen validointi
const parseName = (name: unknown): string => {
  // varmistetaan että nimi on olemassa ja että se on tyyppiä string.
  // Jos ei, heitä virhe
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name!');
  }
  // jos tänne asti on päästy, kääntäjä tietää että comment on varmasti tyyppiä string!
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSickDate = (date: unknown): string => {
  console.log('parsitaan sairaspäivä', date);
  if (!date) return "";
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDate = (dateOfBirth: unknown): string => {
  console.log('parsitaan normipäivä', dateOfBirth);
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
  // jos tänne asti on päästy, kääntäjä tietää että occupation on varmasti tyyppiä string!
  return occupation;
};

// sukupuolen validointi
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: Gender): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: Gender): Gender => {
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
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};

// parsitaan hospitaalientry
export const parseNewHospitalEntry = (base: BaseEntry, { discharge: {dischDate, criteria }}: HospitalEntryFields): Entry => {
  const entry = { ...base, type: "Hospital", discharge: { date: dischDate, criteria }};
  return entry;
};

// parsitaan työterveysentry
export const parseNewOHCEntry = (base: BaseEntry, { employerName, sickLeave: {startDate, endDate} }: OccupationalHCFields): Entry => {
  if (startDate && endDate) {
    return { ...base, type: "OccupationalHealthcare", employerName, sickLeave: {startDate, endDate}};
  }
  // ei saikkua
  const entry = { ...base, type: "OccupationalHealthcare", employerName };
  return entry;
};

// parsitaan terveystarkastus
export const parseNewHealthCheckEntry = (base: BaseEntry, { healthCheckRating }: HealthCheckEntryFields): Entry => {
  const entry = { ...base, type: "HealthCheck", healthCheckRating };
  return entry;
};

export const parseBase = ( { description, date, specialist }: BaseFields ): BaseEntry => {
  return {
    id: uuid(),
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
  };
};
/* 
export const parseNewEntry = (
  { description, date, specialist, type, discharge: {dischDate, criteria}, 
    employerName, healthCheckRating, sickLeave: {startDate, endDate}, diagnosisCodes }: EntryFields): Entry  => {
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseNewEntry = (data: { description: unknown; date: unknown; specialist: unknown; type: unknown; discharge: { date: unknown, criteria: unknown };  diagnosisCodes: string[]; employerName: unknown; sickLeave: { startDate: unknown; endDate: unknown; }; healthCheckRating: HealthCheckRating; }): Entry  => {
  const base = {
    id: uuid(),
    description: parseString(data.description),
    date: parseDate(data.date),
    specialist: parseString(data.specialist),
    type: parseString(data.type)
  };

  ///let newEntry: Entry;

  if (data.type === "Hospital") {
    const newEntry: Entry = { ...base,
      discharge: {
        date: parseDate(data.discharge.date),
        criteria: parseString(data.discharge.criteria),
      },
      diagnosisCodes: data.diagnosisCodes // EI PAKOLLINEN
    };

    return newEntry;
  }
  else if (data.type === "OccupationalHealthcare") {
    const newEntry: Entry = { ...base,
      employerName: parseString(data.employerName),
      sickLeave: { // EI PAKOLLINEN
        startDate: parseSickDate(data.sickLeave.startDate),
        endDate: parseSickDate(data.sickLeave.endDate)
      },
      diagnosisCodes: data.diagnosisCodes
    };

    return newEntry;
  }
  else if (data.type === "HealthCheck") {
    const newEntry: Entry = { ...base,
      healthCheckRating: data.healthCheckRating
    };
    return newEntry;
  }
  throw new Error('Incorrect type of entry!');
};

export default parseNewPatient;