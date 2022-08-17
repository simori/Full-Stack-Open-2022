import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

/* const getNonSensitiveEntries = (): NonSensitiveDiagnose[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code, name, latin
  }));
}; */

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
  //getNonSensitiveEntries
};