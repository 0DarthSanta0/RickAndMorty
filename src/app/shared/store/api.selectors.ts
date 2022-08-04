import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GeneralState } from '../interfaces/general.state.interface';
import { SearchData } from '../interfaces/search.data.interface';
import { Character } from '../interfaces/character.interface';
import { Location } from '../interfaces/location.interface';
import { Episode } from '../interfaces/episode.interface';

export const selectAll = createSelector(createFeatureSelector('app'), (state: GeneralState) : SearchData => {
  return {
    characters: state.characters,
    locations: state.locations,
    episodes: state.episodes,
  };
});

export const selectCharacter = (id: number) => createSelector(createFeatureSelector('app'), (state: GeneralState) : Character | undefined => {
  return state.characters.find(character => character.id === id);
});

export const selectLocation = (id: number) => createSelector(createFeatureSelector('app'), (state: GeneralState) : Location | undefined => {
  return state.locations.find(location => location.id === id);
});

export const selectEpisode = (id: number) => createSelector(createFeatureSelector('app'), (state: GeneralState) : Episode | undefined => {
  return state.episodes.find(episode => episode.id === id);
});

export const selectInfoCharacter = createSelector(createFeatureSelector('app'), (state: GeneralState) : Character | undefined => {
  return state.infoCharacter;
});

export const selectInfoLocation = createSelector(createFeatureSelector('app'), (state: GeneralState) : Location | undefined => {
  return state.infoLocation;
});

export const selectInfoEpisode = createSelector(createFeatureSelector('app'), (state: GeneralState) : Episode | undefined => {
  return state.infoEpisode;
});

export const selectCharactersForCarousel = createSelector(createFeatureSelector('app'), (state: GeneralState) : Character[] => {
  return state.carouselCharacters;
});
