export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type GenderAction =
| "Male" | "Female" | "Other";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export type Entry = HospitalEntryType | OccupationalHealthcareEntryType | HealthCheckEntryType;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}  
// 9.19
export interface OccupationalHealthcareEntryType extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
}

/* type HospitalEntry = {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
} & BaseEntry; */
export interface HospitalEntryType extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string
  }
}

export interface HealthCheckEntryType extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: [];
  singlePatient?: Patient
}