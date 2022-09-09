import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HospitalEntryType as HospitalEntry } from "../types";

//export type EntryFormValues = Omit<Entry, "id">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<HospitalEntry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddHospitalEntry = ({ onSubmit }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      /// ...
      type: "Hospital",
      date: "",
      description: "",
      specialist: "",
      discharge: {
        date: "",
        criteria: ""
      }
    }}
    onSubmit={onSubmit}
    validate={(values) => {
      const requiredError = "Field is required!";
      const requiredErrorDisch = "Discharge Fields is required!";
      const dischDateError = "Erroneous or missing discharge date!";
      const errors: { [field: string]: string } = {};
      if (!values.date || !Date.parse(values.date)) {
        errors.date = "Date malformed or missing!";
      }
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
/*       if (!values.sickLeave.startDate) {
        errors.sickLeave = requiredError;
      } */
      if (!values.discharge.date || !Date.parse(values.discharge.date)) {
        errors.discharge = dischDateError;
      }
      if (!values.discharge.criteria) {
        errors.discharge = requiredErrorDisch;
      }
      return errors;
    }}
  >
    {({ setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui"><br/>
          <h3>Add Hospital Entry</h3>
          <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Discharging date"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />    
            {/* <SelectField label="Gender" name="gender" options={genderOptions} /> */}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={false}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddHospitalEntry;