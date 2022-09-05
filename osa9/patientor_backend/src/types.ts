// 9.13
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export type EntryType = {
  hospital: "Hospital";
  ohc: "OccupationalHealthcare";
  healthCheck: "HealthCheck";
};

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}  
// 9.19
type OccupationalHealthcareEntry = {
  type: string,
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
} & BaseEntry;

type HospitalEntry = {
  type: string,
  discharge: {
    date: string,
    criteria: string
  }
} & BaseEntry;

interface HealthCheckEntry extends BaseEntry {
  type: string;
  healthCheckRating: HealthCheckRating;
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string; // optionaalinen kenttä
}

// 9.11
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;
//export type NonSensitiveDiagnose = Omit<Diagnose, 'latin'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>; // 9.11 utilitytyyppi, ei näytetä sotua
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
// Define special omit for unions
//type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
//type EntryWithoutId = UnionOmit<Entry, 'id'>;