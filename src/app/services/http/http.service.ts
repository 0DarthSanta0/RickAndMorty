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

  private readonly BASE_URL: string = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  public searchCharacter(nameFilter: string): Observable<Filter<Character>> {
    return this.http.get<Filter<Character>>(`${this.BASE_URL}character/?name=${nameFilter}`);
  }

  public searchLocation(nameFilter: string): Observable<Filter<Location>> {
    return this.http.get<Filter<Location>>(`${this.BASE_URL}location/?name=${nameFilter}`);
  }

  public searchEpisode(nameFilter: string): Observable<Filter<Episode>> {
    return this.http.get<Filter<Episode>>(`${this.BASE_URL}episode/?name=${nameFilter}`);
  }

  public searchCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.BASE_URL}character/${id}`);
  }

  public searchLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.BASE_URL}location/${id}`);
  }

  public searchEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.BASE_URL}episode/${id}`);
  }
}
