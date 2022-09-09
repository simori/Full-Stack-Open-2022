import { Grid, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import {
	DiagnosisSelection,
	TextField
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Entry } from '../types';

//export type EntryFormValues = Omit<Entry, "id">;
// OCCUPATIONAL HEALTHCARE FORMI
/* 
  diagnoosit ja saikku ei pakollisia!
*/

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
// Define Entry without the 'id' property
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
	onSubmit: (values: EntryFormValues) => void
}

const AddEntryForm = ({ onSubmit }: Props) => {
	const [{ diagnoses }] = useStateValue();

	return (
		<Formik
			initialValues={{
				/// ...
				type: 'OccupationalHealthcare',
				date: '',
				description: '',
				specialist: '',
				sickLeave: {
					startDate: '',
					endDate: ''
				},
				employerName: ''
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required!';
				const errors: { [field: string]: string } = {};
				if (!values.date || !Date.parse(values.date)) {
					errors.date = 'Date malformed or missing!';
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
				if (!values.type) {
					errors.type = requiredError;
				}
				return errors;
			}}
		>
			{({ setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
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
							label="Sick leave starting date"
							placeholder="YYYY-MM-DD"
							name="sickLeave.startDate"
							component={TextField}
						/>
						<Field
							label="Sick leave end date"
							placeholder="YYYY-MM-DD"
							name="sickLeave.endDate"
							component={TextField}
						/>
						<Field
							label="Employer name"
							placeholder=""
							name="employerName"
							component={TextField}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnoses)}
						/>

						<Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="contained"
									style={{ float: 'left' }}
									type="button"
								>
									Cancel
								</Button>
							</Grid>
							<Grid item>
								<Button
									style={{
										float: 'right'
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

export default AddEntryForm;
