import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { Filter } from "../../shared/interfaces/filter.interface";

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  constructor(private http: HttpClient) { }

  public searchCharacter(nameFilter: string): Observable<Filter> {
    return this.http.get<Filter>(`https://rickandmortyapi.com/api/character/?name=${nameFilter}`);
  }

  public searchLocation(nameFilter: string): Observable<Filter> {
    return this.http.get<Filter>(`https://rickandmortyapi.com/api/location/?name=${nameFilter}`);
  }

  public searchEpisode(nameFilter: string): Observable<Filter> {
    return this.http.get<Filter>(`https://rickandmortyapi.com/api/episode/?name=${nameFilter}`);
  }
}
