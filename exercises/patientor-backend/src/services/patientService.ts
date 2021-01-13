import patientData from "../../data/patients";
import { Patient, NewPatient, PublicPatient, Entry, NewEntry } from "../types";
import { v1 as uuid } from 'uuid';


const getPatients = (): Patient[] => {
  return patientData;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
};
const getNonSensitivePatients = (): PublicPatient[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return patientData.map(({ ssn, entries, ...rest }) => ({ ...rest }));  
};
const getNonSensitivePatient = (id: string): PublicPatient | undefined => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const patient = patientData.map(({ ssn, entries, ...rest }) => ({ ...rest }))
  .find(p => p.id === id);
  return patient;
};
const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};
const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = getPatient(patientId);
  patient && patient.entries.push(newEntry);
  return newEntry;
};
export default {
  getPatients,
  getNonSensitivePatients,
  getNonSensitivePatient,
  addPatient,
  getPatient,
  addEntry
};
