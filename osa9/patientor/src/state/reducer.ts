import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
    {
      type: string; // "SET_PATIENT_LIST"
      payload: Patient[];
    }
  | {
      type: string; //"ADD_PATIENT"
      payload: Patient;
    }
  | {
      type: string; //"SET_DIAGNOSES"
      payload: Diagnosis[];
    }
  | {
      type: string;  //"ADD_ENTRY"
      payload: Entry;
    }
  | {
      type: string; //"UPDATE_PATIENT"
      payload: Entry[];
    }; 

// 9.18 action creatorit
export const setPatientList = (content: Patient[]) => {
  console.log("setPatientList content:", content);
  
  return {
    type: "SET_PATIENT_LIST",
    payload: 
      content
    
  };
};

export const setDiagnoses = (content: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSES",
    payload:
      content
    
  };
};

export const addPatient = (content: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: 
      content
    
  };
};

export const addEntry = (content: Entry) => {
  return {
    type: "ADD_ENTRY",
    payload: 
      content
    
  };
};

export const updatePatient = (content: Entry[]) => {
  return {
    type: "UPDATE_PATIENT",
    payload: {
      ...content
    }
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      console.log('SET_PATIENT_LIST state', state, 'action', action);
      
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo: Patient, patient: Patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      console.log('ADD_PATIENT_ state', state, 'action', action);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      console.log('SET_DIAGNIOSES state', state, 'action', action);
      return {
        ...state,
        diagnoses: {
          ...action.payload
        }
      };  
    case "ADD_ENTRY":
      console.log('ADD_ENTRY state',state);
      console.log('ADD_ENTRY action',action);
        //const patient = state.patients.find((p: { id: string; }) => p.id === action.payload.id);
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload
        }
      };  
    case "UPDATE_PATIENT":
      console.log('UPDATE_PATIENTY state',state);
      console.log('UPDATE_PATIENTY action',action);
      //const patient = state.patients.find((p: { id: string; }) => p.id === action.payload.id);
      return {
        ...state,
        entries: {
          ...action.payload
        }
      };  
    default:
      return state;
  }
};
