import express from 'express';
import patientService from '../services/patientService';
//import { parseNewEntry, parseNewHealthCheckEntry, parseNewHospitalEntry, parseNewOHCEntry } from '../utils';
import parseNewPatient from '../utils';
import { Entry } from '../types';
import { parseNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  console.log("haetaan potilaat");
  
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  console.log("haetaan potilaat id perusteella");
  const id = req.params.id;
  console.log("id on", id);
  
  res.send(patientService.getPatientById(id));
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = parseNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong!';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

/* // eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidEntry = (str: any): str is Entry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return ['Hospital', 'OccupationalHealthcare', 'HealthCheck'].includes(str);
}; */

/* const isEntry = (entry: unknown): entry is Entry => {
  return typeof entry === 'object' || isValidEntry(entry);
}; */

// 923
router.post('/:id/entries', (req, res) => {
  console.log("entryn postaus", req.body);
  try {
    /* if (isEntry(req.body)) { 
      let entree;  
      switch (req.body.type) {
        case "Hospital":
          entree = parseNewHospitalEntry(req.body);
          break;
        case "OccupationalHealthcare":
          entree = parseNewOHCEntry(req.body);
          break;
        case "HealthCheck":
          entree = parseNewHealthCheckEntry(req.body);
          break;
        }

      const patient = patientService.getPatientById(req.params.id);
      const addedEntry = patientService.addEntry(entree, patient);
      res.json(addedEntry);
    } */
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const entree: Entry = parseNewEntry(req.body);
    const patient = patientService.getPatientById(req.params.id);
    console.log('req.param id', req.params.id);
    
    console.log('patientservicen patient', patient);
    
      const addedEntry = patientService.addEntry(entree, patient);
      res.json(addedEntry);
    
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong!';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;