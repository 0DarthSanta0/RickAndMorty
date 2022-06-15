import { Component, OnInit } from '@angular/core';
import { HttpService } from "../services/http/http.service";
import { Character } from "../shared/interfaces/character.interface";
import { Store } from "@ngrx/store";
import { doSearchRequest, doSearchRequestFail } from "../shared/store/api.actions";
import { selectCharacters } from "../shared/store/api.selectors";
import { Episode } from "../shared/interfaces/episode.interface";
import { Location } from "../shared/interfaces/location.interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [HttpService]
})
export class MainPageComponent implements OnInit{

  title = 'RickAndMorty';
  text: string = '';

  results: string[] = [];

  constructor(private httpService: HttpService, private store$: Store){

  }

  public ngOnInit() {

  }

  search(event: any) {
    this.store$.dispatch(doSearchRequest({url: event.query}));
    this.store$.select(selectCharacters).subscribe(data => {
      const tempResult: string[] = [];
      data.characters.forEach((item: Character) => {
        if (item.name) {
          tempResult.push(item.name);
        }
      });
      data.locations.forEach((item: Location) => {
        if (item.name) {
          tempResult.push(item.name);
        }
      });
      data.episodes.forEach((item: Episode) => {
        if (item.name) {
          tempResult.push(item.name);
        }
      });
      this.results = tempResult;
    });
  }
}
