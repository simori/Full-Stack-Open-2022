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
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload
        }
      };  
    case "ADD_ENTRY":
      return {
        ...state,
        entries: {
          ...state.entries,
          [action.payload.id]: action.payload
        }
      };  
    case "UPDATE_PATIENT":
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
