import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if(!patient) {
    res.sendStatus(404);
  } else {
    res.send(patient);
  }
});

router.post('/', (req, res) => {
  const newEntry = toNewPatient(req.body);
  const addedEntry = patientService.addPatient(newEntry);
  res.json(addedEntry);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(404).json({ error: (e as Error).message });
  }
});

export default router;