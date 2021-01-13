import React from "react";
import { Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from '../types';

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div>
      <h1>{entry.date}<Icon name='stethoscope' />{entry.employerName}</h1>
      <p>{entry.description}</p>
    </div>
  );
};
export default OccupationalHealthcareEntryDetails;