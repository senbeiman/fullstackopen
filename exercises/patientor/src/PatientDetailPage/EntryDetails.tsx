import React from "react";
import { Entry, EntryType } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthcareEntryDetails";
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
  }
};
export default EntryDetails;