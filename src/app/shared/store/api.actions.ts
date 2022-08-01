import { createAction, props } from "@ngrx/store";
import { Character } from "../interfaces/character.interface";
import { Episode } from "../interfaces/episode.interface";
import { Location } from "../interfaces/location.interface";

export const doSearchRequest = createAction('[API] search request', props<{url: string}>());

export const doSearchRequestSuccess = createAction('[API] search request success', props<{
  characters: Character[],
  locations: Location[],
  episodes: Episode[],
}>());

export const doSearchRequestFail = createAction('[API] search request fail');

export const doSearchCharacterRequest = createAction('[API] search character request', props<{id: number}>());

export const doSearchCharacterRequestSuccess = createAction('[API] search character request success', props<{
  character: Character,
}>());

export const doSearchCharacterRequestFail = createAction('[API] search character request fail');

export const doSearchMultipleCharactersRequest = createAction('[APi] search multiple character request', props<{id: number[]}>());

export const doSearchMultipleCharactersRequestSuccess = createAction('[APi] search multiple character request success', props<{
  characters: Character[],
}>());

export const doSearchMultipleCharactersRequestFail = createAction('[APi] search multiple character request fail');

export const doSearchEpisodeRequest = createAction('[API] search episode request', props<{id: number}>());

export const doSearchEpisodeRequestSuccess = createAction('[API] search episode request success', props<{
  episode: Episode,
}>());

export const doSearchEpisodeRequestFail = createAction('[API] search episode request fail');

export const doSearchLocationRequest = createAction('[API] search location request', props<{id: number}>());

export const doSearchLocationRequestSuccess = createAction('[API] search location request success', props<{
  location: Location,
}>());

export const doSearchLocationRequestFail = createAction('[API] search location request fail');

export const loadCharacterInfo = createAction('[Store] load character info', props<{id: number | null}>());


export const loadLocationInfo = createAction('[Store] load location info', props<{id: number | null}>());


export const loadEpisodeInfo = createAction('[Store] load episode info', props<{id: number | null}>());

export const loadCarouselCharacterInfo = createAction('[Store] load carousel character info', props<{id: number | null}>());


