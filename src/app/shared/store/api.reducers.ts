import { createReducer, on } from "@ngrx/store";
import {
  doSearchCharacterRequestFail,
  doSearchCharacterRequestSuccess,
  doSearchEpisodeRequestSuccess,
  doSearchLocationRequestSuccess,
  doSearchMultipleCharactersRequestSuccess,
  doSearchRequestFail,
  doSearchRequestSuccess
} from "./api.actions";
import { GeneralState } from "../interfaces/general.state.interface";

export const initialState: GeneralState = {
  characters: [],
  locations: [],
  episodes: [],
  charactersForCarousel: [],
  essenceForInfo: null,
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
  on(doSearchLocationRequestSuccess, (state: GeneralState, {locations}) => {
    return {
      ...state,
      locations,
    }
  }),
  on(doSearchEpisodeRequestSuccess, (state: GeneralState, {episodes}) => {
    return {
      ...state,
      episodes,
    }
  }),
  on(doSearchMultipleCharactersRequestSuccess, (state: GeneralState, {characters}) => {
    return {
      ...state,
      charactersForCarousel: characters,
    }
  }),
)
