import React from "react";
import { Icon } from "semantic-ui-react";
import { HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <h1>{entry.date}<Icon name='hospital' /></h1>
      <p>{entry.description}</p>
      <p>{entry.discharge.date} {entry.discharge.criteria}</p>
    </div>
  );
};
export default HospitalEntryDetails;
