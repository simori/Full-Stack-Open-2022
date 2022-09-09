import { Diagnosis, Entry, Gender, HealthCheckEntryType, HealthCheckRating, HospitalEntryType, OccupationalHealthcareEntryType, Patient } from '../types';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatient, useStateValue } from '../state';

import { Female, Male, Transgender, Work, MedicalServices, LocalHospital,
          SentimentVerySatisfied, SentimentSatisfied, SentimentDissatisfied,
          SentimentVeryDissatisfied } from '@mui/icons-material';

import Box from '@mui/material/Box';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';
import AddHealthCheck from './AddHealthCheck';
import AddHospitalEntry from './AddHospitalEntry';

/* interface Props {
  onSubmit: (id: string, values: EntryFormValues) => void;
  onCancel: () => void;
} */

const GenderIcon = ({ gender }: {gender: Gender}): JSX.Element => {
	if (gender === Gender.Male) return <Male />;
	else if (gender === Gender.Female) return <Female />;
	else if (gender === Gender.Other) return <Transgender />;
	else return <></>;
};

const HealthStatusIcon = ({ status }: {status: HealthCheckRating}): JSX.Element => {
	if (status === 0) return <SentimentVerySatisfied />;
	else if (status === 1) return <SentimentSatisfied />;
	else if (status === 2) return <SentimentDissatisfied />;
	else if (status === 3) return <SentimentVeryDissatisfied />;
	else return <></>;
};

const HospitalEntry = ({ entry, diagnoses }: {entry: HospitalEntryType, diagnoses: Diagnosis[]}): JSX.Element => {
	console.log('HospitalEntryn sisältö:', entry);

  if (entry.diagnosisCodes === undefined) return (<>no diagnoses!</>);
	return (
		<Box sx={{ p: 2, border: '2px solid black', borderRadius: 4 }}>
			{entry.date} <MedicalServices />
			<br />
			<em>{entry.description}</em> <br />
			<ul>
				{Object.prototype.hasOwnProperty.call(entry, 'diagnosisCodes') ? (
					entry.diagnosisCodes.map(
						(dc) => {
							const diag: Diagnosis = Object.values(diagnoses).find((d: Diagnosis) => d.code === dc) as Diagnosis;

							return (
								<li key={diag.name}>
									{dc} {diag.name}
								</li>
							);
						}
					)
				) : (
					<>no diagnoses!</>
				)}
				<br />
			</ul>

				Discharged on {entry.discharge.date}
				<br />
				Criteria for discharging: {entry.discharge.criteria}
					<br />

			diagnosed by {entry.specialist}
			<br />
		</Box>
	);
};

const OccupationalHCEntry = ({ entry, diagnoses }: {entry: OccupationalHealthcareEntryType, diagnoses: Diagnosis[]}) => {
	console.log(entry, diagnoses);
  if (entry.diagnosisCodes === undefined) return (<>no diagnoses!</>);
	return (
    
		<Box sx={{ p: 2, border: '2px solid black', borderRadius: 4 }}>
			{entry.date} <Work />
			<em>{entry.employerName}</em> <br />
			<em>{entry.description}</em>
			<br />
			<ul>
				{Object.prototype.hasOwnProperty.call(entry, 'diagnosisCodes') ? (
					entry.diagnosisCodes.map(
						(
							dc:
								| boolean
								| React.ReactChild
								| React.ReactFragment
								| React.ReactPortal
								| null
								| undefined, i: number
						) => {
							const diag: Diagnosis = Object.values(diagnoses).find((d: Diagnosis) => d.code === dc) as Diagnosis;

							return (
								<li key={i}>
									{dc} {diag.name}
								</li>
							);
						}
					)
				) : (
					<></>
				)}
				<br />
			</ul>
      {Object.prototype.hasOwnProperty.call(entry, 'sickLeave') && entry.sickLeave!==undefined
      ? (
				<>
					Sick leave starting from {entry.sickLeave.startDate !== "" ? entry.sickLeave.startDate : "-"}
					<br />
					Sick leave ending date: {entry.sickLeave.endDate !== "" ? entry.sickLeave.endDate : "-"}
					<br />
				</>
			) 
      : ( 
        <>no sick leave!</> 
      )}
			diagnose by {entry.specialist}
			<br />
		</Box>
	);
};

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
  console.log("healthcheckentry:", entry);
	return (
		<Box sx={{ p: 2, border: '2px solid black', borderRadius: 4 }}>
			{entry.date} <LocalHospital />
			<br />
			<em>{entry.description}</em>
			<br />
			<HealthStatusIcon status={entry.healthCheckRating} />
			<br />
			diagnose by {entry.specialist}
			<br />
		</Box>
	);
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
	throw new Error(
		`Unhandled discriminated union member: ${JSON.stringify(value)}`
	);
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
	entry,
	diagnoses
}) => {
	switch (entry.type) {
		case 'Hospital':
			return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
		case 'OccupationalHealthcare':
			return <OccupationalHCEntry entry={entry} diagnoses={diagnoses} />;
		case 'HealthCheck':
			return <HealthCheckEntry entry={entry} />;
		default:
			return assertNever(entry);
	}
};

const PatientInfo = () => {
	const { id } = useParams<{ id: string }>();
	const [{patients, diagnoses, entries}, dispatch] = useStateValue();
	const [currentPatient, setCurrentPatient] = useState<Patient>();
  //const [entries, setEntries] = useState<Array<Entry>>();

	React.useEffect(() => {
    console.log('PATIENTINFO USEEFFECT STATE', patients, diagnoses, entries);
		const fetchPatientById = async () => {
			try {
/* 				if (
					patients.length === 0 ||
					patients.filter((p: { id: string | undefined }) => p.id === id)
						.length === 0
				) { */
					const { data: patientById } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${id || 'default'}`
					);

					console.log('potilas ID:n perusteella on', patientById);
					/* const { data: allDiagnoses } = await axios.get<Diagnosis[]>(
            `${apiBaseUrl}/diagnoses/`
          );
          console.log('diagnoosit hookissa:',allDiagnoses); */

					setCurrentPatient(patientById);
          console.log('currentPatient::', currentPatient);
          console.log('patientById::', patientById);
					//setPatient(patientById);
          //const entries = currentPatient.entries;
          dispatch(updatePatient(patientById.entries));
          console.log('entryt useEffectissä:', patientById.entries);
					//setDiagnoses(allDiagnoses);

					//console.log('currentPatient on nyt', currentPatient);
					//console.log('diagnoses state:', diagnoses);

					//dispatch({ type: "UPDATE_PATIENT", payload: patientById });
/* 				} else {
					console.log('alsdklasdklsa');
					const patient = patients.find(
						(p: { id: string | undefined }) => p.id === id
					);
					setCurrentPatient(patient);
				} */
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientById();
	}, [dispatch]);

	if (!currentPatient) return null;
	//const entries = currentPatient.entries;
	/* console.log('entryt:', entries)
	console.log('tilan diagnoosit:', diagnoses)
	const patientsDiagnoses = currentPatient.entries.map((e) => e.diagnosisCodes);
	console.log('potilaan diagnoosikoodit:', patientsDiagnoses)
	console.log('potilaan diagnoosikoodit ...:', ...patientsDiagnoses) */
	/* const testDiag = Object.values(diagnoses).find(d => d.code === patientsDiagnoses[0][0]);
  console.log('testDiag on',testDiag);
  console.log('testi diagnoses keys', Object.keys(diagnoses));
  console.log('testi diagnoses values', Object.values(diagnoses));
  console.log('testi diagnoses entries', Object.entries(diagnoses)); */
  console.log('entryt ennen returnia useEffectin jälkeen:', entries);
/*   const entryArr = [...entries];
  console.log('yritetään muuttaa taulukoks ',entryArr); */
  

	return (
		<div className="patientInfo">
			<h2>
				{currentPatient.name} <GenderIcon gender={currentPatient.gender} />
			</h2>
			ssn: {currentPatient.ssn}
			<br />
			occupation: {currentPatient.occupation}
			<br />
			<h3>entries</h3>
			{Object.values(entries).length > 0 ? (
				Object.values(entries).map((e, i: number) => (
					<div key={i}>
						<EntryDetails entry={e} diagnoses={diagnoses} />
					</div>
				))
			) : (
				<>no entries!</>
			)}
			<h3>Add OccupationalHealthcare Entry</h3>
			<AddEntryForm
				onSubmit={async (values: EntryFormValues) => {
					try {
						const { data: newEntry } = await axios.post<Entry>(
							`${apiBaseUrl}/patients/${currentPatient.id}/entries`,
							values
						);
						dispatch(addEntry(newEntry));
						//dispatch({ type: "ADD_PATIENT", payload: newPatient }); // >> dispatch(addPatient(newPatient));
					} catch (e: unknown) {
						if (axios.isAxiosError(e)) {
							console.error(e?.response?.data || 'Unrecognized axios error');
							//setError(String(e?.response?.data?.error) || "Unrecognized axios error");
						} else {
							console.error('Unknown error', e);
							//setError("Unknown error");
						}
					}
				}}
			/>
			<AddHealthCheck
				onSubmit={async (values: EntryFormValues) => {
					try {
						const { data: newEntry } = await axios.post<Entry>(
							`${apiBaseUrl}/patients/${currentPatient.id}/entries`,
							values
						);
						dispatch(addEntry(newEntry));
						//dispatch({ type: "ADD_PATIENT", payload: newPatient }); // >> dispatch(addPatient(newPatient));
					} catch (e: unknown) {
						if (axios.isAxiosError(e)) {
							console.error(e?.response?.data || 'Unrecognized axios error');
							//setError(String(e?.response?.data?.error) || "Unrecognized axios error");
						} else {
							console.error('Unknown error', e);
							//setError("Unknown error");
						}
					}
				}}
			/>
			<AddHospitalEntry
				onSubmit={async (values: EntryFormValues) => {
					try {
						console.log(
							'submitNewEntry valuet:',
							values,
							'\ncurrentPatient id',
							currentPatient.id
						);

						const { data: newEntry } = await axios.post<Entry>(
							`${apiBaseUrl}/patients/${currentPatient.id}/entries`,
							values
						);
						dispatch(addEntry(newEntry));
						//dispatch({ type: "ADD_PATIENT", payload: newPatient }); // >> dispatch(addPatient(newPatient));
					} catch (e: unknown) {
						if (axios.isAxiosError(e)) {
							console.error(e?.response?.data || 'Unrecognized axios error');
							//setError(String(e?.response?.data?.error) || "Unrecognized axios error");
						} else {
							console.error('Unknown error', e);
							//setError("Unknown error");
						}
					}
				}}
			/>
		</div>
	);
};

export default PatientInfo;
