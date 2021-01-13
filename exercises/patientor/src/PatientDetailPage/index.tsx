import React, { useEffect } from "react";
import { Button, Icon, Segment } from "semantic-ui-react";
import { addEntry, addPatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Entry, Gender, Patient } from "../types";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientDetailPage: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    const getPatient = async (id: string) => {
      try {
        const { data: newPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}` 
        );
        dispatch(addPatient(newPatient));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    (!patients[id] || !patients[id].ssn) && getPatient(id);
  }, [dispatch, id, patients]);
  const patient = patients[id];
  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  if (!patient) {
    return null;
  }
  const getIconName = (gender: Gender) => {
    switch(gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };

  return (
    <div className="App">
      <h2>{patient.name}<Icon name={getIconName(patient.gender)} /></h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <h3>entries</h3>
      {patient.entries?.map(e => (
        <div key={e.id}>
          <Segment>
            <EntryDetails entry={e} />
            <ul>
              {e.diagnosisCodes?.map(d => <li key={d}>{d} {diagnoses[d] && diagnoses[d].name}</li>)}
            </ul>
          </Segment>
        </div>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientDetailPage;