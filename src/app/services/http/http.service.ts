import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Filter } from "../../shared/interfaces/filter.interface";
import { Character } from "../../shared/interfaces/character.interface";
import { Location } from "../../shared/interfaces/location.interface";
import { Episode } from "../../shared/interfaces/episode.interface";

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  constructor(private http: HttpClient) { }

  public searchCharacter(nameFilter: string): Observable<Filter<Character>> {
    return this.http.get<Filter<Character>>(`https://rickandmortyapi.com/api/character/?name=${nameFilter}`);
  }

  public searchLocation(nameFilter: string): Observable<Filter<Location>> {
    return this.http.get<Filter<Location>>(`https://rickandmortyapi.com/api/location/?name=${nameFilter}`);
  }

  public searchEpisode(nameFilter: string): Observable<Filter<Episode>> {
    return this.http.get<Filter<Episode>>(`https://rickandmortyapi.com/api/episode/?name=${nameFilter}`);
  }
}
