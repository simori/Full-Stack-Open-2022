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
  const id = req.params.id;
  
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

// 923
router.post('/:id/entries', (req, res) => {
  console.log("entryn postaus", req.body);
  try {    
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