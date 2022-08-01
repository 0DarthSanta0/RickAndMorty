import { createReducer, on } from "@ngrx/store";
import {
  loadCharacterInfo,
  loadEpisodeInfo,
  loadLocationInfo,
  doSearchCharacterRequestSuccess,
  doSearchEpisodeRequestSuccess,
  doSearchLocationRequestSuccess,
  doSearchMultipleCharactersRequestSuccess,
  doSearchRequestSuccess, loadCarouselCharacterInfo
} from "./api.actions";
import { GeneralState } from "../interfaces/general.state.interface";

export const initialState: GeneralState = {
  characters: [],
  locations: [],
  episodes: [],
  carouselCharacters: [],
  infoCharacter: undefined,
  infoEpisode: undefined,
  infoLocation: undefined,
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
  on(doSearchCharacterRequestSuccess, (state: GeneralState, {character}) => {
    return {
      ...state,
      infoCharacter: character,
    }
  }),
  on(doSearchLocationRequestSuccess, (state: GeneralState, {location}) => {
    return {
      ...state,
      infoLocation: location,
    }
  }),
  on(doSearchEpisodeRequestSuccess, (state: GeneralState, {episode}) => {
    return {
      ...state,
      infoEpisode: episode,
    }
  }),
  on(doSearchMultipleCharactersRequestSuccess, (state: GeneralState, {characters}) => {
    return {
      ...state,
      carouselCharacters: characters,
    }
  }),
  on(loadCharacterInfo, (state: GeneralState, {id}) => {
    return {
      ...state,
      infoCharacter: state.characters.find(character => character.id === id),
    }
  }),
  on(loadLocationInfo, (state: GeneralState, {id}) => {
    return {
      ...state,
      infoLocation: state.locations.find(location => location.id === id),
    }
  }),
  on(loadEpisodeInfo, (state: GeneralState, {id}) => {
    return {
      ...state,
      infoEpisode: state.episodes.find(episode => episode.id === id),
    }
  }),
  on(loadCarouselCharacterInfo, (state: GeneralState, {id}) => {
    return {
      ...state,
      infoCharacter: state.carouselCharacters.find(character => character.id === id),
    }
  })
)
