import { createFeatureSelector, createSelector, props } from "@ngrx/store";
import { GeneralState } from "../interfaces/general.state.interface";
import { SearchData } from "../interfaces/search-data.interface";
import { Character } from "../interfaces/character.interface";

export const selectAll = createSelector(createFeatureSelector('app'), (state: GeneralState) : SearchData => {
  return {
    characters: state.characters,
    locations: state.locations,
    episodes: state.episodes,
  };
});

export const selectCharacter = (id: number) => createSelector(createFeatureSelector('app'), (state: GeneralState) : Character | undefined => {
  return state.characters.find(item => item.id === id);
});
