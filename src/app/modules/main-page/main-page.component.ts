import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http/http.service";
import { Character } from "../../shared/interfaces/character.interface";
import { Store } from "@ngrx/store";
import { doSearchRequest } from "../../shared/store/api.actions";
import { selectAll } from "../../shared/store/api.selectors";
import { Episode } from "../../shared/interfaces/episode.interface";
import { Location } from "../../shared/interfaces/location.interface";
import { AutocompleteEvent } from "../../shared/interfaces/autocomplete.event";
import { map } from "rxjs";
import { ResultsData } from "../../shared/interfaces/results.data";
import { SearchData } from "../../shared/interfaces/search-data.interface";
import { SearchedEntities } from "../../shared/enums/searched.entities";
import { SEARCHED_ENTITIES_CONFIG } from "../../shared/constants/searched.entities.config";
import { BaseEntity } from "../../shared/interfaces/base.entity";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{

  title = 'RickAndMorty';
  text: string = '';

  results: ResultsData[] = [];

  constructor(
    private httpService: HttpService,
    private store$: Store) { }

  public ngOnInit() { }

  search(event: AutocompleteEvent): void {
    this.store$.dispatch(doSearchRequest({url: event.query}));
    this.store$.select(selectAll)
      .pipe(
        map((data: SearchData) => {
          return [
            this.buildEntity<Character>(SearchedEntities.CHARACTERS, data.characters),
            this.buildEntity<Location>(SearchedEntities.LOCATIONS, data.locations),
            this.buildEntity<Episode>(SearchedEntities.EPISODES, data.episodes),
          ]
        }),
      )
      .subscribe((result: ResultsData[]) => this.results = result);
  }

  private buildEntity<T extends BaseEntity>(key: SearchedEntities, data: T[]): ResultsData {
    return {
      ...SEARCHED_ENTITIES_CONFIG[key],
      items: data.map(item => ({
        value: item.id,
        label: item.name,
      })),
    };
  }

}
