import { Grid, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { HCROption, SelectField, TextField } from "../AddPatientModal/FormField";
import { Entry, HealthCheckRating } from "../types";

//export type EntryFormValues = Omit<Entry, "id">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const hcOptions: HCROption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const AddHealthCheck = ({ onSubmit }: Props) => {

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.Healthy
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required!";
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
        return errors;
      }}
    >
    {() => {
      return (
        <Form className="form ui"><br/>
          <h3>HealthCheck Entry</h3>
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
            <SelectField label="Health Check Rating" name="healthCheckRating" options={hcOptions} />
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

export default AddHealthCheck;