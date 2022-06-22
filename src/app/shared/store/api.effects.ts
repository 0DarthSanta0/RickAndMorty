import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, map, mergeMap, of } from "rxjs";
import { doSearchRequest, doSearchRequestFail, doSearchRequestSuccess } from "./api.actions";
import { HttpService } from "../../services/http/http.service";


@Injectable()
export class GeneralEffects {
  constructor(private actions$: Actions, private httpService: HttpService) {
  }

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
        return forkJoin([charactersTemp, locationTemp, episodesTemp]).pipe(
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
      })
    );
  })
}
