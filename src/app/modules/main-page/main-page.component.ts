import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { SearchData } from "../../shared/interfaces/search.data.interface";
import { SearchedEntities } from "../../shared/enums/searched.entities";
import { SEARCHED_ENTITIES_CONFIG } from "../../shared/constants/searched.entities.config";
import { BaseEssence } from "../../shared/interfaces/base.essence";
import { Router } from "@angular/router";
import { SelectEvent } from "../../shared/interfaces/select.event";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent implements OnInit{

  private readonly COUNT_OF_CHARACTERS: number = 826;

  title = 'RickAndMorty';
  text: string = '';

  public results: ResultsData[] = [];

  public charactersIds: number[] = [];

  constructor(
    private httpService: HttpService,
    private store$: Store,
    private route: Router,
    private changeDetector: ChangeDetectorRef,
    ) { }

  public ngOnInit() {
    for (let i = 0; i < 21; ++i) {
      this.charactersIds.push(Math.floor(Math.random() * (this.COUNT_OF_CHARACTERS + 1)));
    }
  }

  public search(event: AutocompleteEvent): void {
    this.store$.dispatch(doSearchRequest({url: event.query}));
    this.store$.select(selectAll)
      .pipe(
        map((data: SearchData) => {
          return [
            this.buildEntity(SearchedEntities.CHARACTERS, data.characters),
            this.buildEntity(SearchedEntities.LOCATIONS, data.locations),
            this.buildEntity(SearchedEntities.EPISODES, data.episodes),
          ]
        }),
      )
      .subscribe((result: ResultsData[]) => {
        this.results = result;
        this.changeDetector.detectChanges();
      });
  }

  public select(event: SelectEvent): void {
    this.route.navigate([`/details/${event.value.type?.toLowerCase()}`, event.value.id]);
  }

  private buildEntity(key: SearchedEntities, data: Character[] | Location[] | Episode[]): ResultsData {
    return {
      ...SEARCHED_ENTITIES_CONFIG[key],
      items: data.map(item => ({
        label: item.name,
        value: {
          id: item.id,
          essence: item,
          type: key,
        },
      })),
    };
  }

}
