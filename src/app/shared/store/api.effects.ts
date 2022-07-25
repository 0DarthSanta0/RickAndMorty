import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import {
  doSearchCharacterRequest,
  doSearchCharacterRequestFail,
  doSearchCharacterRequestSuccess,
  doSearchEpisodeRequest, doSearchEpisodeRequestFail, doSearchEpisodeRequestSuccess,
  doSearchLocationRequest,
  doSearchLocationRequestFail,
  doSearchLocationRequestSuccess,
  doSearchMultipleCharactersRequest,
  doSearchMultipleCharactersRequestFail, doSearchMultipleCharactersRequestSuccess,
  doSearchRequest,
  doSearchRequestFail,
  doSearchRequestSuccess
} from "./api.actions";
import { HttpService } from "../../services/http/http.service";
import { Character } from "../interfaces/character.interface";
import { Location } from "../interfaces/location.interface";
import { Episode } from "../interfaces/episode.interface";


@Injectable()
export class GeneralEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService) { }

  public searchData$ = createEffect(() => this.actions$.pipe(
      ofType(doSearchRequest),
      mergeMap(action => {
        const charactersTemp = this.httpService.searchCharacter(action.url).pipe(
          catchError(err => of(null))
        );
        const episodesTemp = this.httpService.searchEpisode(action.url).pipe(
          catchError(err => of(null))
        );
        const locationTemp = this.httpService.searchLocation(action.url).pipe(
          catchError(err => of(null))
        );
        return forkJoin([charactersTemp, locationTemp, episodesTemp]);
      }),
      map(([charactersResponse, locationResponse, episodesResponse]) => doSearchRequestSuccess(
          {
            characters: charactersResponse?.results || [],
            locations: locationResponse?.results || [],
            episodes: episodesResponse?.results || [],
          }
        )),
      catchError(err => of(doSearchRequestFail())),
    )
  );

  public searchCharacter$ = createEffect(() => this.actions$.pipe(
      ofType(doSearchCharacterRequest),
      mergeMap(action => this.httpService.searchCharacterById(action.id)),
      map((charactersResponse: Character) => doSearchCharacterRequestSuccess(
          {
            characters: [charactersResponse],
          }
        )),
      catchError(err => of(doSearchCharacterRequestFail))
    )
  );

  public searchLocation$ = createEffect(() => this.actions$.pipe(
      ofType(doSearchLocationRequest),
      mergeMap(action => this.httpService.searchLocationById(action.id)),
      map((locationResponse: Location) => doSearchLocationRequestSuccess(
          {
            locations: [locationResponse],
          }
        )),
      catchError(err => of(doSearchLocationRequestFail))
    )
  );

  public searchEpisode$ = createEffect(() => this.actions$.pipe(
      ofType(doSearchEpisodeRequest),
      mergeMap(action => this.httpService.searchEpisodeById(action.id)),
      map((episodeResponse: Episode) => doSearchEpisodeRequestSuccess(
          {
            episodes: [episodeResponse],
          })
      ),
      catchError(err => of(doSearchEpisodeRequestFail))
    )
  );


  public searchMultipleCharacters$ = createEffect(() => this.actions$.pipe(
      ofType(doSearchMultipleCharactersRequest),
      mergeMap(action => this.httpService.searchMultipleCharacters(action.id)),
      map((charactersResponse: Character[]) => doSearchMultipleCharactersRequestSuccess(
          {
            characters: charactersResponse,
          })
      ),
      catchError(err => of(doSearchMultipleCharactersRequestFail))
    )
  );
}
