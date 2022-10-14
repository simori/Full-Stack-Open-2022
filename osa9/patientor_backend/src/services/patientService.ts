import patients from '../../data/patients';
import { Entry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const getPatientById = (id: string): NonSensitivePatient => {
  const patient: NonSensitivePatient = patients.find(p => p.id === id)!;
  return patient;
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

// 9.23
const addEntry = ( entry: Entry, patient: NonSensitivePatient ): Entry => {
  const newEntry = {
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  addEntry,
  getNonSensitivePatients,
  getPatientById
};