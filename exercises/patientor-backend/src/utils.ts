import diagnosisService from "./services/diagnosisService";
import { Diagnosis, Discharge, Entry, EntryType, Gender, HealthCheckRating, NewEntry, NewPatient, Patient, SickLeave } from "./types";

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date|| !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + (date as string));
  }
  return date;
};

const parseStringProperty = (property: unknown, name: string): string => {
  if (!property || !isString(property)){
    throw new Error(`Incorrect or missing ${name}: ${property as string}`);
  }
  return property;
};
const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + (gender as string));
  }
  return gender;
};
const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing healthcheck rating: ' + (rating as string));
  }
  return rating;
};
const isArray = (array: unknown): array is Array<unknown> => {
  return (array instanceof Array);
};
const parseDiagnosisCode = (code: string): Diagnosis['code'] => {
  if (!diagnosisService.getEntries().map(e => e.code).includes(code)) {
    throw new Error('Incorrect or missing diagnosis code: ' + (code));
  }
  return code;
};
const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!isArray(codes)) {
    throw new Error('Incorrect or missing diagnosis codes: ' + (codes as string));
  }
  return codes.map(c => parseDiagnosisCode(parseStringProperty(c, 'diagnosisCode')));
};
const parseDischarge = (object: unknown): Discharge => {
  if (!object) {
    throw new Error('Incorrect or missing discharge: ' + (object as string));
  }
  const objectAsDischarge = object as Discharge;
  return {
    date: parseDate(objectAsDischarge.date),
    criteria: parseStringProperty(objectAsDischarge.criteria, 'criteria')
  };
};
const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object) {
    return undefined;
  }
  const objectAsSickLeave = object as SickLeave;
  return {
    startDate: parseDate(objectAsSickLeave.startDate),
    endDate: parseDate(objectAsSickLeave.endDate)
  };
};
export const toNewPatient = (object: unknown): NewPatient => {
  const objectAsPatient = object as Patient;
  return {
    name: parseStringProperty(objectAsPatient.name, 'name'),
    dateOfBirth: parseDate(objectAsPatient.dateOfBirth),
    ssn: parseStringProperty(objectAsPatient.ssn, 'ssn'),
    gender: parseGender(objectAsPatient.gender),
    occupation: parseStringProperty(objectAsPatient.occupation, 'occupation')
  };
};
export const toNewEntry = (object: unknown): NewEntry => {
  const objectAsEntry = object as Entry;
  const baseEntry = {
    description: parseStringProperty(objectAsEntry.description, 'description'),
    date: parseDate(objectAsEntry.date),
    specialist: parseStringProperty(objectAsEntry.specialist, 'specialist')
  };
  if (objectAsEntry.diagnosisCodes) {
    (baseEntry as Entry).diagnosisCodes = parseDiagnosisCodes(objectAsEntry.diagnosisCodes);
  }
  switch (objectAsEntry.type) {
    case EntryType.Hospital:
      return { 
        ...baseEntry,
        type: objectAsEntry.type,
        discharge: parseDischarge(objectAsEntry.discharge)
      };
    case EntryType.HealthCheck:
      return {
        ...baseEntry,
        type: objectAsEntry.type,
        healthCheckRating: parseHealthCheckRating(objectAsEntry.healthCheckRating)
      };
    case EntryType.OccupationalHealthcare:
      return {
        ...baseEntry,
        type: objectAsEntry.type,
        employerName: parseStringProperty(objectAsEntry.employerName, 'emloyerName'),
        sickLeave: parseSickLeave(objectAsEntry.sickLeave)
      };
    default:
      throw Error('Incorrect or missing type: ' + ((objectAsEntry as Entry).type as string));
  }
};