import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, TypeOption, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { EntryType, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [ currentType, setCurrentType ] = useState(EntryType.HealthCheck);
  const switchInitialValues = (type: EntryType): EntryFormValues => {
    switch (type) {
      case EntryType.HealthCheck:
        return (
          {
            type: EntryType.HealthCheck,
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            healthCheckRating: HealthCheckRating.Healthy
          }
        );
      case EntryType.Hospital:
        return (
          {
            type: EntryType.Hospital,
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            discharge: {
              date: "",
              criteria: ""
            }
          }
        );
      case EntryType.OccupationalHealthcare:
        return (
          {
            type: EntryType.OccupationalHealthcare,
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            employerName: "",
            sickLeave: {
              startDate: "",
              endDate: ""
            }
          }
        );
  }};
  return (
    <Formik
      enableReinitialize
      initialValues={switchInitialValues(currentType)}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.diagnosisCodes) {
          errors.diagnosisCodes = requiredError;
        }
        switch (values.type) {
          case EntryType.HealthCheck:
            break;
          case EntryType.Hospital:
            if (!values.discharge.date){
              errors["discharge.date"] = requiredError;
            }
            if (!values.discharge.criteria) {
              errors["discharge.criteria"]= requiredError;
            }
            break;
          case EntryType.OccupationalHealthcare:
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (!values.sickLeave?.startDate){
              errors["sickLeave.startDate"] = requiredError;
            }
            if (!values.sickLeave?.endDate) {
              errors["sickLeave.endDate"] = requiredError;
            }
            break;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="type"
              name="type"
              options={typeOptions}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                console.log(e.currentTarget.value);
                return setCurrentType(e.currentTarget.value as EntryType);
              }}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {(() => {
              switch (values.type) {
                case EntryType.HealthCheck:
                  return (
                    <Field
                      label="healthCheckRating"
                      name="healthCheckRating"
                      component={NumberField}
                      min={0}
                      max={3}
                    />
                  );
                case EntryType.Hospital:
                  return (
                    <div>
                      <Field
                        label="discharge date"
                        placeholder="YYYY-MM-DD"
                        name="discharge.date"
                        component={TextField}
                      />
                      <Field
                        label="discharge criteria"
                        placeholder="discharge criteria"
                        name="discharge.criteria"
                        component={TextField}
                      />
                    </div>
                  );
                case EntryType.OccupationalHealthcare:
                  return (
                    <div>
                      <Field
                        label="Employer name"
                        placeholder="Employer Name"
                        name="employerName"
                        component={TextField}
                      />
                      <Field
                        label="sick leave start date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.startDate"
                        component={TextField}
                      />
                      <Field
                        label="sick leave end date"
                        placeholder="YYYY-MM-DD"
                        name="sickLeave.endDate"
                        component={TextField}
                      />
                    </div>
                  );
              }
            })()
          }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;

