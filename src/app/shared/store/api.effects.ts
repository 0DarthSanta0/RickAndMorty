import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, map, mergeMap, of, switchMap } from "rxjs";
import {
  doSearchCharacterRequest,
  doSearchCharacterRequestFail, doSearchCharacterRequestSuccess,
  doSearchRequest,
  doSearchRequestFail,
  doSearchRequestSuccess
} from "./api.actions";
import { HttpService } from "../../services/http/http.service";
import { Character } from "../interfaces/character.interface";


@Injectable()
export class GeneralEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService) { }

  public searchData$ = createEffect(() => {
    return this.actions$.pipe(
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
      map(([charactersResponse, locationResponse, episodesResponse]) => {
        return doSearchRequestSuccess(
          {
            characters: charactersResponse?.results || [],
            locations: locationResponse?.results || [],
            episodes: episodesResponse?.results || [],
          }
        );
      }),
      catchError(err => {
        return of(doSearchRequestFail());
      })
    );
  });

  public searchCharacter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(doSearchCharacterRequest),
      mergeMap(action => {
        return this.httpService.searchCharacterById(action.id);
      }),
      map((charactersResponse: Character) => {
        return doSearchCharacterRequestSuccess(
          {
            characters: [charactersResponse],
          }
        );
      }),
      catchError(err => {
        return of(doSearchCharacterRequestFail);
      })
    )
  })
}
