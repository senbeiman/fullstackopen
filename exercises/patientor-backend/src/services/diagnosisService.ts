import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnosisData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};