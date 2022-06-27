import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http/http.service";
import { Character } from "../shared/interfaces/character.interface";
import { Store } from "@ngrx/store";
import { doSearchRequest } from "../shared/store/api.actions";
import { selectAll } from "../shared/store/api.selectors";
import { Episode } from "../shared/interfaces/episode.interface";
import { Location } from "../shared/interfaces/location.interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit{

  title = 'RickAndMorty';
  text: string = '';

  results: any = [];

  constructor(private httpService: HttpService, private store$: Store){

  }

  public ngOnInit() {

  }

  search(event: any) {
    let filteredGroups: any[] = [];
    this.store$.dispatch(doSearchRequest({url: event.query}));
    this.store$.select(selectAll).subscribe(data => {
      let tempResult: any[] = [];
      data.characters.forEach((item: Character) => {
        if (item.name && item.id) {
          tempResult.push({label: item.name, value: item.id});
        }
      });
      if (data.characters.length) {
        filteredGroups.push({
          label: 'Characters',
          value: 'ch',
          items: tempResult,
        });
      }
      tempResult = [];
      data.locations.forEach((item: Location) => {
        if (item.name && item.id) {
          tempResult.push({label: item.name, value: item.id});
        }
      });
      if (data.locations.length) {
        filteredGroups.push({
          label: 'Location',
          value: 'loc',
          items: tempResult,
        });
      }
      tempResult = [];
      data.episodes.forEach((item: Episode) => {
        if (item.name && item.id) {
          tempResult.push({label: item.name, value: item.id});
        }
      });
      if (data.episodes.length) {
        filteredGroups.push({
          label: 'Episodes',
          value: 'ep',
          items: tempResult,
        });
      }
    });
    this.results = filteredGroups;
  }
}
