import { createReducer, on } from "@ngrx/store";
import { doSearchRequestFail, doSearchRequestSuccess } from "./api.actions";
import { GeneralState } from "../interfaces/general.state.interface";

export const initialState: GeneralState = {
  characters: [],
  locations: [],
  episodes: [],
}

export const generalReducer = createReducer(
  initialState,
  on(doSearchRequestSuccess, (state: GeneralState, {characters, locations, episodes,}) => {
    return {
      ...state,
      characters: characters,
      locations: locations,
      episodes: episodes,
    };
  }),
  on(doSearchRequestFail, (state: GeneralState) => ({...state}))
)
