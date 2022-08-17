import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatients
};