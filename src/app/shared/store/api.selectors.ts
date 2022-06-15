import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GeneralState } from "../interfaces/general.state.interface";
import { Character } from "../interfaces/character.interface";
import { Location } from "../interfaces/location.interface";
import { Episode } from "../interfaces/episode.interface";

export const selectCharacters = createSelector(createFeatureSelector('app'), (state: GeneralState) => {
  return {
    characters: state.characters,
    locations: state.locations,
    episodes: state.episodes,
  };
});
