import { createContext } from "react";
import { INITIAL_STATE } from "./constants";
import { reducer } from "./reducer";

export const ListContext = createContext({
  state: INITIAL_STATE,
  dispatch: reducer,
});
