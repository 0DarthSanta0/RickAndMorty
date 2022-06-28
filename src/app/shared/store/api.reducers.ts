import { createReducer, on } from "@ngrx/store";
import {
  doSearchCharacterRequestFail,
  doSearchCharacterRequestSuccess,
  doSearchRequestFail,
  doSearchRequestSuccess
} from "./api.actions";
import { GeneralState } from "../interfaces/general.state.interface";

export const initialState: GeneralState = {
  characters: [],
  locations: [],
  episodes: [],
}

export const generalReducer = createReducer(
  initialState,
  on(doSearchRequestSuccess, (state: GeneralState, {characters, locations, episodes}) => {
    return {
      ...state,
      characters,
      locations,
      episodes,
    };
  }),
  on(doSearchCharacterRequestSuccess, (state: GeneralState, {characters}) => {
    return {
      ...state,
      characters,
    }
  }),
)
