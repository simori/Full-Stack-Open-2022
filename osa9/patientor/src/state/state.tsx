import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis, Entry } from "../types";

import { Action } from "./reducer";

// 9.21 tänne diagnoosit myös
export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
  entries: { [id: string]: Entry };
};

const initialState: State = {
  patients: {},
  diagnoses: {},
  entries: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state:', state);
  
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
