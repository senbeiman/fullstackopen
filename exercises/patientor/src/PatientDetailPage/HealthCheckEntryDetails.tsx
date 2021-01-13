import React from "react";
import { Icon } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from '../types';

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const getHeartColor = (rating: HealthCheckRating) => {
    switch(rating) {
      case HealthCheckRating.Healthy:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        throw Error('undifined healthcheck rating');
    }
  };
  return (
    <div>
      <h1>{entry.date}<Icon name='doctor' /></h1>
      <p>{entry.description}</p>
      <Icon name='heart' color={getHeartColor(entry.healthCheckRating)} />
    </div>
  );
};
export default HealthCheckEntryDetails;