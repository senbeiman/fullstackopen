import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        patientId: string;
        newEntry: Entry;
      };
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const targetPatient = state.patients[action.payload.patientId];
      const updatedPatient = { ...targetPatient, entries: targetPatient.entries.concat(action.payload.newEntry)};
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: updatedPatient
        }
      };
    default:
      return state;
  }
};

export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};
export const addEntry = (patientId: string, newEntry: Entry): Action => {
  return { type: "ADD_ENTRY", payload: { patientId, newEntry } };
};
export const setPatientList = (patientList: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};
export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosisList };
};
